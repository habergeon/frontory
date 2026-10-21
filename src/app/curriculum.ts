import catalog from './catalog.json'

export interface Unit {
  id: string
  day: number
  week: number
  title: string
  goal: string
  docPath: string
  seriesId: string
  source?: string
  exampleNote?: string
}
export const series = catalog.series
const examples = import.meta.glob<string>('../labs/*/example.js', {
  query: '?raw', import: 'default', eager: true,
})
export const units: Unit[] = catalog.units.map(unit => ({
  ...unit, source: examples['../labs/' + unit.id + '/example.js'],
  exampleNote: ({
    'gaussian-splatting-01': '2D Gaussian 밀도 원리 시각화입니다. 실제 3DGS 데이터 로더가 아닙니다.',
    'svelte-01': 'Svelte store API 실험입니다. .svelte 컴포넌트 컴파일은 아직 지원하지 않습니다.',
    'webassembly-01': 'WebAssembly 선형 메모리 실험입니다. 모듈 컴파일은 수행하지 않습니다.',
    'playwright-01': '테스트 소스 관찰 예제입니다. Playwright 실행은 별도 Node 환경이 필요합니다.',
    'webgpu-01': 'WebGPU 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다.',
    'wgsl-01': 'WGSL은 실제 WebGPU 파이프라인에서 컴파일됩니다. WebGPU 지원 환경이 필요합니다.',
  } as Record<string, string>)[unit.id],
}))
export const legacyUnitIds = units.filter(unit => unit.seriesId === 'webgl').map(unit => unit.id)
export const categories: Record<string, string> = {
  fundamentals: '언어와 웹 기초', frameworks: 'UI 프레임워크', graphics: '그래픽스',
  shader: '셰이더', animation: '애니메이션', engineering: '엔지니어링', testing: '테스트',
}
export const documents = import.meta.glob<string>('/docs/**/*.md', {
  query: '?raw', import: 'default', eager: true,
})
