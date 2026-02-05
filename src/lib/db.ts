import Database from 'better-sqlite3'
import path from 'path'

// 전역 데이터베이스 인스턴스
declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined
}

function getDb(): Database.Database {
  if (!global.__db) {
    const dbPath = path.resolve(process.cwd(), 'dev.db')
    global.__db = new Database(dbPath)
    global.__db.pragma('journal_mode = WAL')
  }
  return global.__db
}

export const db = getDb()

// 헬퍼 함수들
export function findFirst<T>(sql: string, params?: unknown[]): T | null {
  const stmt = db.prepare(sql)
  return (params ? stmt.get(...params) : stmt.get()) as T | null
}

export function findMany<T>(sql: string, params?: unknown[]): T[] {
  const stmt = db.prepare(sql)
  return (params ? stmt.all(...params) : stmt.all()) as T[]
}

export function run(sql: string, params?: unknown[]) {
  const stmt = db.prepare(sql)
  return params ? stmt.run(...params) : stmt.run()
}

export function insert(table: string, data: Record<string, unknown>) {
  const keys = Object.keys(data)
  const values = Object.values(data)
  const placeholders = keys.map(() => '?').join(', ')
  const sql = `INSERT INTO ${table} (${keys.map(k => `"${k}"`).join(', ')}) VALUES (${placeholders})`
  return run(sql, values)
}

export function update(table: string, data: Record<string, unknown>, where: string, whereParams: unknown[]) {
  const sets = Object.keys(data).map(k => `"${k}" = ?`).join(', ')
  const sql = `UPDATE ${table} SET ${sets} WHERE ${where}`
  return run(sql, [...Object.values(data), ...whereParams])
}
