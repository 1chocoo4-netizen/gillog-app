/**
 * PWA 아이콘 생성 스크립트
 * sharp 없이 순수 JS로 BMP → PNG 생성
 * 실행: node scripts/generate-icons.js
 */
const fs = require('fs')
const path = require('path')
const { createCanvas } = (() => {
  // 순수 JS canvas 폴리필 - 간단한 PNG 생성
  // PNG 파일 구조를 직접 생성
  const zlib = require('zlib')

  function createCanvas(width, height) {
    const pixels = Buffer.alloc(width * height * 4) // RGBA

    function fillCircle(cx, cy, r, rCol, gCol, bCol, aCol = 255) {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = x - cx
          const dy = y - cy
          if (dx * dx + dy * dy <= r * r) {
            const idx = (y * width + x) * 4
            pixels[idx] = rCol
            pixels[idx + 1] = gCol
            pixels[idx + 2] = bCol
            pixels[idx + 3] = aCol
          }
        }
      }
    }

    function fillGradientCircle(cx, cy, r) {
      // violet (#8b5cf6) to purple (#7c3aed) gradient
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = x - cx
          const dy = y - cy
          if (dx * dx + dy * dy <= r * r) {
            const t = (y - (cy - r)) / (2 * r) // 0~1 top to bottom
            const rCol = Math.round(139 + (124 - 139) * t) // 8b -> 7c
            const gCol = Math.round(92 + (58 - 92) * t)    // 5c -> 3a
            const bCol = Math.round(246 + (237 - 246) * t)  // f6 -> ed
            const idx = (y * width + x) * 4
            pixels[idx] = rCol
            pixels[idx + 1] = gCol
            pixels[idx + 2] = bCol
            pixels[idx + 3] = 255
          }
        }
      }
    }

    // 간단한 "G" 글자 렌더링 (비트맵 폰트)
    function drawG(cx, cy, size) {
      const r = size * 0.35  // 글자 크기
      const thick = size * 0.08  // 선 두께

      // G 외곽 원호 (C자 형태)
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = x - cx
          const dy = y - cy
          const dist = Math.sqrt(dx * dx + dy * dy)

          // 원호 부분 (C 형태 - 오른쪽 중간~하단 열림)
          if (dist >= r - thick && dist <= r + thick) {
            const angle = Math.atan2(dy, dx)
            // -40도 ~ 270도 사이만 그림 (오른쪽 중단 열림)
            const angleDeg = (angle * 180 / Math.PI + 360) % 360
            if (angleDeg > 40 && angleDeg < 340) {
              const idx = (y * width + x) * 4
              pixels[idx] = 255
              pixels[idx + 1] = 255
              pixels[idx + 2] = 255
              pixels[idx + 3] = 255
            }
          }
        }
      }

      // G의 가로 바 (중간 오른쪽으로 향하는 선)
      const barY = cy
      const barStartX = cx
      const barEndX = cx + r + thick
      for (let y = Math.floor(barY - thick); y <= Math.ceil(barY + thick); y++) {
        for (let x = Math.floor(barStartX); x <= Math.ceil(barEndX); x++) {
          if (x >= 0 && x < width && y >= 0 && y < height) {
            const idx = (y * width + x) * 4
            pixels[idx] = 255
            pixels[idx + 1] = 255
            pixels[idx + 2] = 255
            pixels[idx + 3] = 255
          }
        }
      }

      // G 바 아래 세로선 (오른쪽 끝에서 아래로)
      const vertX = barEndX - thick
      for (let y = Math.floor(barY); y <= Math.ceil(barY + r * 0.5); y++) {
        for (let x = Math.floor(vertX - thick); x <= Math.ceil(vertX + thick); x++) {
          if (x >= 0 && x < width && y >= 0 && y < height) {
            const idx = (y * width + x) * 4
            pixels[idx] = 255
            pixels[idx + 1] = 255
            pixels[idx + 2] = 255
            pixels[idx + 3] = 255
          }
        }
      }
    }

    function toPNG() {
      // PNG 파일 수동 생성
      function crc32(buf) {
        let crc = -1
        for (let i = 0; i < buf.length; i++) {
          crc ^= buf[i]
          for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0)
          }
        }
        return (crc ^ -1) >>> 0
      }

      function chunk(type, data) {
        const len = Buffer.alloc(4)
        len.writeUInt32BE(data.length)
        const typeData = Buffer.concat([Buffer.from(type), data])
        const crc = Buffer.alloc(4)
        crc.writeUInt32BE(crc32(typeData))
        return Buffer.concat([len, typeData, crc])
      }

      // IHDR
      const ihdr = Buffer.alloc(13)
      ihdr.writeUInt32BE(width, 0)
      ihdr.writeUInt32BE(height, 4)
      ihdr[8] = 8  // bit depth
      ihdr[9] = 6  // color type (RGBA)
      ihdr[10] = 0 // compression
      ihdr[11] = 0 // filter
      ihdr[12] = 0 // interlace

      // IDAT - raw pixel data with filter bytes
      const raw = Buffer.alloc(height * (1 + width * 4))
      for (let y = 0; y < height; y++) {
        raw[y * (1 + width * 4)] = 0 // filter: none
        for (let x = 0; x < width; x++) {
          const srcIdx = (y * width + x) * 4
          const dstIdx = y * (1 + width * 4) + 1 + x * 4
          raw[dstIdx] = pixels[srcIdx]
          raw[dstIdx + 1] = pixels[srcIdx + 1]
          raw[dstIdx + 2] = pixels[srcIdx + 2]
          raw[dstIdx + 3] = pixels[srcIdx + 3]
        }
      }
      const compressed = zlib.deflateSync(raw)

      const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      const ihdrChunk = chunk('IHDR', ihdr)
      const idatChunk = chunk('IDAT', compressed)
      const iendChunk = chunk('IEND', Buffer.alloc(0))

      return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
    }

    return { pixels, fillCircle, fillGradientCircle, drawG, toPNG, width, height }
  }

  return { createCanvas }
})()

function generateIcon(size) {
  const canvas = createCanvas(size, size)
  const center = size / 2

  // 배경 그라디언트 원
  canvas.fillGradientCircle(center, center, size / 2)

  // G 글자
  canvas.drawG(center, center, size)

  return canvas.toPNG()
}

// 아이콘 생성
const sizes = [
  { size: 192, name: 'icon-192.png', dir: 'icons' },
  { size: 512, name: 'icon-512.png', dir: 'icons' },
  { size: 180, name: 'apple-touch-icon.png', dir: '' },
]

const publicDir = path.join(__dirname, '..', 'public')

for (const { size, name, dir } of sizes) {
  const png = generateIcon(size)
  const targetDir = dir ? path.join(publicDir, dir) : publicDir
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })
  const filePath = path.join(targetDir, name)
  fs.writeFileSync(filePath, png)
  console.log(`Generated: ${filePath} (${size}x${size}, ${png.length} bytes)`)
}

console.log('Done!')
