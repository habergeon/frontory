import catalog from './catalog.json'
import previousCatalog from '../../content/catalog-v2.json'

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
  exampleMode?: 'browser' | 'external'
  exampleFiles?: string[]
}
type ExampleDetails = { mode: 'browser' | 'external'; note: string; files?: string[] }
const detailModules = import.meta.glob<Record<string, ExampleDetails>>('../../content/examples/*.json', { eager: true, import: 'default' })
const exampleDetails: Record<string, ExampleDetails> = Object.assign({}, ...Object.values(detailModules))
export const series = catalog.series
const examples = import.meta.glob<string>('../labs/*/example.js', {
  query: '?raw', import: 'default', eager: true,
})
export const units: Unit[] = catalog.units.map(unit => ({
  ...unit, source: examples['../labs/' + unit.id + '/example.js'],
  exampleMode: exampleDetails[unit.id]?.mode,
  exampleFiles: exampleDetails[unit.id]?.files,
  exampleNote: exampleDetails[unit.id]?.note ?? ({
  "15-nerf-gs": "해석적 밀도장의 ray 적분과 splat 합성 비교입니다. NeRF 학습이나 추론 모델을 실행하지 않습니다.",
  "16-gaussian": "CPU 기반 Gaussian 투영·합성 원리 시각화입니다. SH는 합성한 1차 계수를 사용하며 학습된 GS 모델의 품질 측정이 아닙니다.",
  "17-sh": "CPU 기반 Gaussian 투영·합성 원리 시각화입니다. SH는 합성한 1차 계수를 사용하며 학습된 GS 모델의 품질 측정이 아닙니다.",
  "18-gs-projection": "CPU 기반 Gaussian 투영·합성 원리 시각화입니다. SH는 합성한 1차 계수를 사용하며 학습된 GS 모델의 품질 측정이 아닙니다.",
  "19-gs-loading": "소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다.",
  "20-gs-interaction": "소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다.",
  "21-gs-review": "소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다.",
  "23-loading-ui": "지연과 진행률을 제어한 모의 로더입니다. 실제 네트워크 전송량을 측정하지 않습니다.",
  "react-03": "실제 React 상태·memo 실험입니다. Profiler 시간은 개발용 React에서 관찰하세요. 프로덕션 빌드에서는 콜백이 제공되지 않을 수 있습니다.",
  "svelte-01": "미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다.",
  "svelte-02": "미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다. 같은 예제 폴더의 .svelte 파일을 별도 Svelte 프로젝트에서 실행하여 컴포넌트 수명주기도 비교하세요.",
  "svelte-03": "미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다. 같은 예제 폴더의 .svelte 파일을 별도 Svelte 프로젝트에서 실행하여 컴포넌트 수명주기도 비교하세요.",
  "gaussian-splatting-01": "2D Gaussian 밀도 원리 시각화입니다. 3DGS 데이터 로더가 아닙니다.",
  "gaussian-splatting-02": "소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다.",
  "gaussian-splatting-03": "소형 .splat 및 ASCII GS PLY를 읽는 CPU Canvas 교육용 뷰어입니다. 최대 1 MiB·512 splat이며 binary PLY와 일반 mesh PLY는 지원하지 않습니다. Spark, GPU tile 렌더링, 고차 SH, GS picking은 구현 범위 밖입니다. 기본 장면은 직접 생성한 데이터이며 측정값은 이 CPU 예제에만 해당합니다.",
  "webgpu-01": "실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다.",
  "webgpu-02": "실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다.",
  "webgpu-03": "실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다.",
  "pixijs-02": "직접 생성한 atlas와 모의 로딩 실패를 사용합니다. 외부 Assets 서버 요청은 하지 않습니다.",
  "wgsl-01": "실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다.",
  "wgsl-02": "실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다.",
  "wgsl-03": "실제 WebGPU 파이프라인을 사용하며 지원 GPU·브라우저가 필요합니다. 미지원 환경에서는 안내를 표시합니다. WGSL 오류는 GPU 컴파일러에서 확인합니다.",
  "gsap-02": "기본 scroll 이벤트를 GSAP timeline에 연결합니다. ScrollTrigger 플러그인은 사용하지 않습니다.",
  "webassembly-01": "미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다.",
  "webassembly-02": "미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다. 같은 폴더의 kernel.wat, kernel.wasm, benchmark.mjs로 실제 WASM 계산과 JS 결과를 비교하세요.",
  "webassembly-03": "미리보기는 WebAssembly.Memory 및 JS 경계 비용 실험입니다. CSP를 유지하므로 WASM 모듈 컴파일은 iframe 밖에서 실행합니다. 같은 폴더의 kernel.wat, kernel.wasm, benchmark.mjs로 실제 WASM 계산과 JS 결과를 비교하세요.",
  "playwright-01": "화면은 별도 실행용 Playwright 테스트 소스를 생성합니다. Node 환경에서 실행해야 하며 미리보기 표시가 E2E 테스트 통과를 뜻하지 않습니다.",
  "playwright-02": "화면은 별도 실행용 Playwright 테스트 소스를 생성합니다. Node 환경에서 실행해야 하며 미리보기 표시가 E2E 테스트 통과를 뜻하지 않습니다.",
  "playwright-03": "화면은 별도 실행용 Playwright 테스트 소스를 생성합니다. Node 환경에서 실행해야 하며 미리보기 표시가 E2E 테스트 통과를 뜻하지 않습니다."
} as Record<string, string>)[unit.id],
}))
export const legacyUnitIds = units.filter(unit => unit.seriesId === 'webgl').map(unit => unit.id)
export const v2UnitIds = previousCatalog.units.map(unit => unit.id)
export const categories: Record<string, string> = {
  fundamentals: '언어와 웹 기초', frameworks: 'UI 프레임워크', graphics: '그래픽스',
  shader: '셰이더', animation: '애니메이션', engineering: '엔지니어링', testing: '테스트',
}
export const documents = import.meta.glob<string>('/docs/**/*.md', {
  query: '?raw', import: 'default', eager: true,
})
