import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'

function getEncryptionKey(): Buffer {
  const key = process.env.SURVEY_ENCRYPTION_KEY
  if (!key) {
    throw new Error('SURVEY_ENCRYPTION_KEY 환경변수가 설정되지 않았습니다')
  }
  // 32바이트 키로 변환 (SHA-256 해시)
  return crypto.createHash('sha256').update(key).digest()
}

export function hashUserId(userId: string): string {
  return crypto.createHash('sha256').update(userId).digest('hex')
}

export function encryptData(data: object): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  const json = JSON.stringify(data)
  let encrypted = cipher.update(json, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag().toString('hex')

  // iv:authTag:encryptedData 형태로 저장
  return `${iv.toString('hex')}:${authTag}:${encrypted}`
}

export function decryptData(encryptedString: string): object | null {
  try {
    const key = getEncryptionKey()
    const [ivHex, authTagHex, encrypted] = encryptedString.split(':')

    const iv = Buffer.from(ivHex, 'hex')
    const authTag = Buffer.from(authTagHex, 'hex')
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(authTag)

    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return JSON.parse(decrypted)
  } catch {
    return null
  }
}
