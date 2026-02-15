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

    // 픽셀에 색 쓰기 (안티앨리어싱용 알파 블렌딩)
    function setPixel(x, y, r, g, b, a = 255) {
      const ix = Math.round(x), iy = Math.round(y)
      if (ix < 0 || ix >= width || iy < 0 || iy >= height) return
      const idx = (iy * width + ix) * 4
      if (a >= 255) {
        pixels[idx] = r; pixels[idx+1] = g; pixels[idx+2] = b; pixels[idx+3] = 255
      } else {
        const sa = a / 255, da = 1 - sa
        pixels[idx]   = Math.round(r * sa + pixels[idx]   * da)
        pixels[idx+1] = Math.round(g * sa + pixels[idx+1] * da)
        pixels[idx+2] = Math.round(b * sa + pixels[idx+2] * da)
        pixels[idx+3] = Math.min(255, pixels[idx+3] + a)
      }
    }

    // "G" 글자 렌더링 - 작게 + ㄱ자에 파란색
    function drawG(cx, cy, size) {
      const r = size * 0.24       // G 크기 (줄임)
      const thick = size * 0.065  // 선 두께 (줄임)

      // 흰색: C자 원호 부분
      // 파란색: ㄱ자 (가로바 + 세로선)
      const WHITE = [255, 255, 255]
      const BLUE  = [96, 165, 250]  // #60a5fa - blue-400

      // 1) C자 원호 (흰색)
      for (let py = 0; py < height; py++) {
        for (let px = 0; px < width; px++) {
          const dx = px - cx
          const dy = py - cy
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist >= r - thick && dist <= r + thick) {
            const angle = Math.atan2(dy, dx)
            const angleDeg = (angle * 180 / Math.PI + 360) % 360
            // C 형태: 오른쪽 위 열림 (30~330도)
            if (angleDeg > 35 && angleDeg < 330) {
              // 엣지 부분 안티앨리어싱
              const outerDist = Math.abs(dist - (r + thick))
              const innerDist = Math.abs(dist - (r - thick))
              const edgeDist = Math.min(outerDist, innerDist)
              const alpha = edgeDist < 1.5 ? Math.min(255, Math.round(edgeDist / 1.5 * 255)) : 255
              setPixel(px, py, ...WHITE, alpha)
            }
          }
        }
      }

      // 2) ㄱ자 가로바 (파란색) - 중앙에서 오른쪽으로
      const barY = cy + thick * 0.3
      const barStartX = cx - thick * 0.5
      const barEndX = cx + r
      for (let py = Math.floor(barY - thick); py <= Math.ceil(barY + thick); py++) {
        for (let px = Math.floor(barStartX); px <= Math.ceil(barEndX); px++) {
          if (px >= 0 && px < width && py >= 0 && py < height) {
            // 가로바 끝에서 파란색→흰색 그라디언트
            const t = (px - barStartX) / (barEndX - barStartX)
            const rr = Math.round(BLUE[0] * (1-t*0.3) + WHITE[0] * t * 0.3)
            const gg = Math.round(BLUE[1] * (1-t*0.3) + WHITE[1] * t * 0.3)
            const bb = Math.round(BLUE[2] * (1-t*0.15) + WHITE[2] * t * 0.15)
            setPixel(px, py, rr, gg, bb)
          }
        }
      }

      // 3) ㄱ자 세로선 (파란색) - 오른쪽 끝에서 아래로
      const vertX = barEndX - thick * 0.5
      const vertEndY = cy + r * 0.55
      for (let py = Math.floor(barY - thick); py <= Math.ceil(vertEndY); py++) {
        for (let px = Math.floor(vertX - thick); px <= Math.ceil(vertX + thick); px++) {
          if (px >= 0 && px < width && py >= 0 && py < height) {
            const t = (py - barY) / (vertEndY - barY)
            const rr = Math.round(BLUE[0] + (WHITE[0] - BLUE[0]) * t * 0.4)
            const gg = Math.round(BLUE[1] + (WHITE[1] - BLUE[1]) * t * 0.3)
            const bb = Math.round(BLUE[2] + (WHITE[2] - BLUE[2]) * t * 0.15)
            setPixel(px, py, rr, gg, bb)
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
