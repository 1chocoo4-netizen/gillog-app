// 인증 관리 유틸리티

export interface User {
  name: string
  gender: 'male' | 'female' | 'other'
  age: number
  email: string
  phone: string
}

// 로그인 상태 확인
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  const user = localStorage.getItem('gillog-user')
  return !!user
}

// 현재 사용자 정보 가져오기
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('gillog-user')
  if (!user) return null
  try {
    return JSON.parse(user)
  } catch {
    return null
  }
}

// 로그인 (회원가입 후 자동 로그인)
export function login(user: User): void {
  localStorage.setItem('gillog-user', JSON.stringify(user))
  // 신규 사용자면 초기 에너지 설정
  const energyKey = `gillog-energy-${user.email}`
  if (!localStorage.getItem(energyKey)) {
    localStorage.setItem(energyKey, '50')
  }
}

// 로그아웃
export function logout(): void {
  localStorage.removeItem('gillog-user')
}

// 사용자별 에너지 키 생성
function getEnergyKey(): string | null {
  const user = getCurrentUser()
  if (!user) return null
  return `gillog-energy-${user.email}`
}

// 현재 사용자의 에너지 가져오기
export function getUserEnergy(): number {
  if (typeof window === 'undefined') return 50
  const key = getEnergyKey()
  if (!key) return 50
  const saved = localStorage.getItem(key)
  return saved ? parseInt(saved, 10) : 50
}

// 현재 사용자의 에너지 설정
export function setUserEnergy(energy: number): void {
  if (typeof window === 'undefined') return
  const key = getEnergyKey()
  if (!key) return
  localStorage.setItem(key, String(Math.max(0, Math.min(100, energy))))
}

// 현재 사용자의 에너지 추가
export function addUserEnergy(amount: number): number {
  const current = getUserEnergy()
  const newEnergy = Math.min(100, current + amount)
  setUserEnergy(newEnergy)
  return newEnergy
}

// 현재 사용자의 에너지 사용
export function useUserEnergy(amount: number): boolean {
  const current = getUserEnergy()
  if (current < amount) return false
  setUserEnergy(current - amount)
  return true
}

// 사용자별 진행도 키 생성
export function getUserProgressKey(type: string): string | null {
  const user = getCurrentUser()
  if (!user) return null
  return `gillog-${type}-${user.email}`
}
