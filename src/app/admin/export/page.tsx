'use client'

import { useState } from 'react'

interface Question {
  id: string
  text: string
  areaKey: string
}

interface RawResponse {
  userHash: string
  milestone: number
  careerScore: number
  communityScore: number
  nonCognitiveScore: number
  totalScore: number
  createdAt: string
  answers: Record<string, number> | null
}

interface RawData {
  responses: RawResponse[]
  questions: Question[]
  questionIds: string[]
  totalCount: number
}

const AREA_LABELS: Record<string, string> = {
  career: '진로',
  community: '공동체',
  nonCognitive: '인성',
}

const AREA_COLORS: Record<string, string> = {
  career: 'text-blue-400',
  community: 'text-green-400',
  nonCognitive: 'text-yellow-400',
}

function downloadBlob(url: string, filename: string) {
  return fetch(url)
    .then((res) => { if (!res.ok) throw new Error('다운로드 실패'); return res.blob() })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    })
}

export default function ExportPage() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [rawData, setRawData] = useState<RawData | null>(null)
  const [loadingRaw, setLoadingRaw] = useState(false)
  const [showRaw, setShowRaw] = useState(false)
  const [filterMilestone, setFilterMilestone] = useState<number | null>(null)

  const handleDownload = async (includeRaw: boolean) => {
    const key = includeRaw ? 'full' : 'summary'
    setDownloading(key)
    try {
      const url = includeRaw ? '/api/admin/export?raw=true' : '/api/admin/export'
      const date = new Date().toISOString().split('T')[0]
      const filename = includeRaw ? `gillog-survey-full-${date}.csv` : `gillog-survey-summary-${date}.csv`
      await downloadBlob(url, filename)
    } catch (e) {
      alert(e instanceof Error ? e.message : '다운로드 실패')
    } finally {
      setDownloading(null)
    }
  }

  const loadRawData = () => {
    if (rawData) { setShowRaw(true); return }
    setLoadingRaw(true)
    fetch('/api/admin/survey-raw')
      .then((res) => { if (!res.ok) throw new Error('Failed'); return res.json() })
      .then((data) => { setRawData(data); setShowRaw(true) })
      .catch(() => alert('원본 데이터 로드 실패'))
      .finally(() => setLoadingRaw(false))
  }

  const filteredResponses = rawData?.responses.filter(
    (r) => filterMilestone === null || r.milestone === filterMilestone
  ) ?? []

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">데이터 내보내기</h2>
        <p className="text-sm text-gray-400 mt-1">연구용 설문 데이터를 열람하고 CSV로 내보냅니다</p>
      </div>

      {/* 다운로드 영역 - 2가지 옵션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 요약 CSV */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-2">요약 CSV</h3>
          <p className="text-xs text-gray-400 mb-3">영역별 점수만 포함 (7컬럼)</p>
          <div className="text-xs text-gray-500 mb-4 space-y-0.5">
            <div>userHash, milestone, careerScore, communityScore,</div>
            <div>nonCognitiveScore, totalScore, createdAt</div>
          </div>
          <button
            onClick={() => handleDownload(false)}
            disabled={downloading !== null}
            className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {downloading === 'summary' ? '다운로드 중...' : '요약 CSV 다운로드'}
          </button>
        </div>

        {/* 전체 CSV (원본 문항 포함) */}
        <div className="bg-gray-900 border border-blue-800/50 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-blue-300 mb-2">전체 CSV (원본 문항 포함)</h3>
          <p className="text-xs text-gray-400 mb-3">개별 30문항 응답(1~5점) 포함 (37컬럼)</p>
          <div className="text-xs text-gray-500 mb-4 space-y-0.5">
            <div>...기본 7컬럼 + c1~c10, m1~m10, n1~n10</div>
            <div>각 문항: 1(전혀 그렇지 않다) ~ 5(매우 그렇다)</div>
          </div>
          <button
            onClick={() => handleDownload(true)}
            disabled={downloading !== null}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {downloading === 'full' ? '다운로드 중...' : '전체 CSV 다운로드 (연구용)'}
          </button>
        </div>
      </div>

      {/* 문항 코드 안내 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">문항 코드표 (CSV 컬럼 → 문항 내용)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-1.5 px-2 text-gray-400 w-16">코드</th>
                <th className="text-left py-1.5 px-2 text-gray-400 w-16">영역</th>
                <th className="text-left py-1.5 px-2 text-gray-400">문항 내용</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {/* 하드코딩 대신 질문 목록 정적 표시 */}
              {[
                { id: 'c1', area: '진로', color: 'text-blue-400', text: '나는 내가 좋아하는 일이 무엇인지 알고 있다.' },
                { id: 'c2', area: '진로', color: 'text-blue-400', text: '나는 나의 강점과 약점을 파악하고 있다.' },
                { id: 'c3', area: '진로', color: 'text-blue-400', text: '나는 관심 있는 직업이나 분야가 있다.' },
                { id: 'c4', area: '진로', color: 'text-blue-400', text: '나는 진로를 위해 필요한 정보를 찾아본 적이 있다.' },
                { id: 'c5', area: '진로', color: 'text-blue-400', text: '나는 미래의 나의 모습을 상상해 본 적이 있다.' },
                { id: 'c6', area: '진로', color: 'text-blue-400', text: '나는 진로와 관련된 경험(체험, 봉사 등)을 해본 적이 있다.' },
                { id: 'c7', area: '진로', color: 'text-blue-400', text: '나는 나의 진로 목표를 세우고 있다.' },
                { id: 'c8', area: '진로', color: 'text-blue-400', text: '나는 진로 목표를 이루기 위해 노력하고 있다.' },
                { id: 'c9', area: '진로', color: 'text-blue-400', text: '나는 다양한 직업의 세계에 관심이 있다.' },
                { id: 'c10', area: '진로', color: 'text-blue-400', text: '나는 나의 진로에 대해 자신감을 가지고 있다.' },
                { id: 'm1', area: '공동체', color: 'text-green-400', text: '나는 친구들과 잘 어울린다.' },
                { id: 'm2', area: '공동체', color: 'text-green-400', text: '나는 다른 사람의 입장에서 생각해 보려고 노력한다.' },
                { id: 'm3', area: '공동체', color: 'text-green-400', text: '나는 우리 반(학교)의 일에 적극적으로 참여한다.' },
                { id: 'm4', area: '공동체', color: 'text-green-400', text: '나는 도움이 필요한 친구를 도와준다.' },
                { id: 'm5', area: '공동체', color: 'text-green-400', text: '나는 규칙과 약속을 잘 지킨다.' },
                { id: 'm6', area: '공동체', color: 'text-green-400', text: '나는 다른 사람의 의견을 존중한다.' },
                { id: 'm7', area: '공동체', color: 'text-green-400', text: '나는 갈등이 생기면 대화로 해결하려고 한다.' },
                { id: 'm8', area: '공동체', color: 'text-green-400', text: '나는 우리 지역사회에 관심이 있다.' },
                { id: 'm9', area: '공동체', color: 'text-green-400', text: '나는 함께 협력하면 더 좋은 결과를 낼 수 있다고 생각한다.' },
                { id: 'm10', area: '공동체', color: 'text-green-400', text: '나는 공정하고 정의로운 것이 중요하다고 생각한다.' },
                { id: 'n1', area: '인성', color: 'text-yellow-400', text: '나는 어려운 일이 있어도 포기하지 않는다.' },
                { id: 'n2', area: '인성', color: 'text-yellow-400', text: '나는 스스로 계획을 세우고 실천할 수 있다.' },
                { id: 'n3', area: '인성', color: 'text-yellow-400', text: '나는 감정을 잘 조절할 수 있다.' },
                { id: 'n4', area: '인성', color: 'text-yellow-400', text: '나는 새로운 것에 도전하는 것을 좋아한다.' },
                { id: 'n5', area: '인성', color: 'text-yellow-400', text: '나는 실패해도 다시 시도할 수 있다.' },
                { id: 'n6', area: '인성', color: 'text-yellow-400', text: '나는 하기 싫은 일도 해야 할 때 할 수 있다.' },
                { id: 'n7', area: '인성', color: 'text-yellow-400', text: '나는 나 자신을 소중하게 생각한다.' },
                { id: 'n8', area: '인성', color: 'text-yellow-400', text: '나는 스트레스를 받을 때 나만의 해소법이 있다.' },
                { id: 'n9', area: '인성', color: 'text-yellow-400', text: '나는 목표를 위해 꾸준히 노력하는 편이다.' },
                { id: 'n10', area: '인성', color: 'text-yellow-400', text: '나는 나의 성장 가능성을 믿는다.' },
              ].map((q) => (
                <tr key={q.id} className="border-b border-gray-800/30">
                  <td className="py-1.5 px-2 font-mono text-white">{q.id}</td>
                  <td className={`py-1.5 px-2 ${q.color}`}>{q.area}</td>
                  <td className="py-1.5 px-2">{q.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 원본 데이터 열람 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">설문 원본 데이터 열람</h3>
            <p className="text-xs text-gray-500 mt-0.5">복호화된 개별 문항 응답을 테이블로 확인합니다</p>
          </div>
          <button
            onClick={() => showRaw ? setShowRaw(false) : loadRawData()}
            disabled={loadingRaw}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-sm text-gray-200 rounded-lg transition-colors"
          >
            {loadingRaw ? '로딩 중...' : showRaw ? '접기' : '원본 데이터 보기'}
          </button>
        </div>

        {showRaw && rawData && (
          <>
            {/* 필터 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-400">마일스톤:</span>
              {[null, 5, 100, 500].map((ms) => (
                <button
                  key={String(ms)}
                  onClick={() => setFilterMilestone(ms)}
                  className={`px-3 py-1 rounded-md text-xs transition-colors ${
                    filterMilestone === ms
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-600/50'
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  {ms === null ? '전체' : `${ms}회`}
                </button>
              ))}
              <span className="text-xs text-gray-500 ml-2">{filteredResponses.length}건</span>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="text-[11px] font-mono w-max">
                <thead className="sticky top-0 bg-gray-900 z-10">
                  <tr className="border-b border-gray-700">
                    <th className="py-1.5 px-1.5 text-gray-400 text-left whitespace-nowrap">hash(앞8자)</th>
                    <th className="py-1.5 px-1.5 text-gray-400 text-center">MS</th>
                    {rawData.questions.map((q) => (
                      <th key={q.id} className={`py-1.5 px-1 text-center ${AREA_COLORS[q.areaKey] || 'text-gray-400'}`} title={q.text}>
                        {q.id}
                      </th>
                    ))}
                    <th className="py-1.5 px-1.5 text-blue-400 text-center">진로</th>
                    <th className="py-1.5 px-1.5 text-green-400 text-center">공동체</th>
                    <th className="py-1.5 px-1.5 text-yellow-400 text-center">인성</th>
                    <th className="py-1.5 px-1.5 text-purple-400 text-center">총점</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResponses.map((r, idx) => (
                    <tr key={idx} className="border-b border-gray-800/20 hover:bg-gray-800/30">
                      <td className="py-1 px-1.5 text-gray-500">{r.userHash.slice(0, 8)}</td>
                      <td className="py-1 px-1.5 text-center text-white">{r.milestone}</td>
                      {rawData.questions.map((q) => {
                        const val = r.answers?.[q.id]
                        let color = 'text-gray-600'
                        if (val === 5) color = 'text-green-400'
                        else if (val === 4) color = 'text-green-300/70'
                        else if (val === 3) color = 'text-gray-300'
                        else if (val === 2) color = 'text-red-300/70'
                        else if (val === 1) color = 'text-red-400'
                        return (
                          <td key={q.id} className={`py-1 px-1 text-center ${color}`}>
                            {val ?? '-'}
                          </td>
                        )
                      })}
                      <td className="py-1 px-1.5 text-center text-blue-300">{r.careerScore}</td>
                      <td className="py-1 px-1.5 text-center text-green-300">{r.communityScore}</td>
                      <td className="py-1 px-1.5 text-center text-yellow-300">{r.nonCognitiveScore}</td>
                      <td className="py-1 px-1.5 text-center text-purple-300 font-semibold">{r.totalScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredResponses.length === 0 && (
              <div className="text-center text-gray-500 py-8 text-sm">데이터가 없습니다</div>
            )}
          </>
        )}
      </div>

      {/* 개인정보 보호 안내 */}
      <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-6 space-y-3">
        <h3 className="text-sm font-medium text-blue-300">개인정보 보호 안내</h3>
        <ul className="text-sm text-blue-200/70 space-y-1.5">
          <li>- 사용자 ID는 SHA-256 해시로 비가역 익명화됩니다</li>
          <li>- 원본 문항 응답은 서버에서 복호화되며, 사용자 식별 정보와 연결 불가합니다</li>
          <li>- 실행 원문(executionText)은 어디에도 노출되지 않습니다</li>
          <li>- 내보낸 데이터는 연구 목적으로만 사용해야 합니다</li>
        </ul>
      </div>
    </div>
  )
}
