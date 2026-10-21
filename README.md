# Frontory

**Learn · Experiment · Archive** — 프론트엔드 기술을 배우고, 코드를 실험하고, 경험을 기록하는 웹 학습 공간입니다. Frontend + Story + Repository라는 의미를 담았습니다.

[사용법](docs/learning-workspace.md) · [기술 지도](docs/labs/README.md) · [학습 로드맵](docs/roadmap.md) · [배포 가이드](docs/deployment.md) · [기여 안내](CONTRIBUTING.md)

## 무엇을 할 수 있나요?

- 23개 기술 시리즈와 94개 학습 단위를 분야·단계별로 탐색합니다.
- 학습 목표와 과제를 읽고, 진행 상태를 직접 표시하고, Markdown으로 필기합니다.
- WebGL 첫 장면에서 Monaco Editor로 JavaScript/TypeScript를 수정하고 실행 결과를 확인합니다.
- 전체 학습 내용을 JSON 파일로 내보내고 다른 브라우저에서 가져옵니다.

현재 **23개 시리즈의 대표 예제와 WebGL 기초를 포함한 29개 예제**를 제공합니다. WebGPU는 지원 환경이 필요하며 Gaussian·Svelte·WebAssembly 예제의 범위와 Playwright 별도 실행 조건은 [실행 예제 안내](docs/examples.md)에 구분했습니다. 나머지 65개 단위의 실행 예제는 준비 중입니다.

| 분야 | 시리즈 |
| --- | --- |
| Fundamentals | JavaScript, TypeScript, HTML, CSS |
| Frameworks | React, Vue, Svelte |
| Graphics | WebGL, Canvas 2D, SVG, Three.js, Gaussian Splatting, WebGPU, React Three Fiber, PixiJS |
| Shader | GLSL, WGSL |
| Animation | GSAP, Motion |
| Engineering | Web Workers, OffscreenCanvas, WebAssembly |
| Testing | Playwright |

## 저장과 개인정보

로그인 없이 사용합니다. 코드·필기·진행 상태는 현재 브라우저의 localStorage에 저장되며 계정이나 서버로 동기화하지 않습니다. 브라우저 데이터 삭제 시 유실될 수 있으므로 **학습 아카이브 → JSON 내보내기**로 백업하세요. JSON은 암호화되지 않은 파일입니다.

브라우저·프로필·주소(프로토콜/호스트/포트)가 달라지면 저장소도 달라집니다. 로컬 개발 주소에서 공개 사이트로 이동하거나 도메인을 바꿀 때는 기존 주소에서 내보낸 뒤 새 주소에서 가져오세요. [저장 및 개인정보 안내](docs/privacy.md)

## 로컬 개발

Node.js 24와 pnpm 10.34.5를 사용합니다. 검증 환경은 Node 24.16.0입니다.

```sh
git clone https://github.com/habergeon/frontory.git
cd frontory
pnpm install --frozen-lockfile
pnpm dev
```

기본 주소는 http://127.0.0.1:5173 입니다. 이 명령은 개발 서버를 로컬 컴퓨터에만 엽니다.

```sh
pnpm test
pnpm build
pnpm check:deploy
pnpm preview
```

build에는 타입 검사와 미리보기 런타임 생성이 포함됩니다. 정적 산출물은 dist/에 생성됩니다. Monaco·TypeScript worker·Three.js 때문에 큰 번들 경고가 발생할 수 있습니다. Cloudflare Pages 배포 방법은 [배포 가이드](docs/deployment.md)를 참고하세요.

## 프로젝트 구조

- src/app: 기술 탐색, 학습 화면, 진행 상태, JSON 백업
- src/editor: Monaco JS/TS 검사와 변환
- src/preview: sandbox 미리보기와 오류 처리
- src/shared: 저장, 백업 검증, 안전한 Markdown 렌더링
- src/labs/01-scene: 첫 실행 예제
- docs/labs/분야/기술/학습단위/README.md: 학습 문서
- content/series.json, src/app/catalog.json: 콘텐츠와 탐색 메타데이터
- tests: 저장·백업·문서·미리보기 회귀 검사

기존 저장 키와 WebGL 단위 ID는 백업 호환성을 위해 유지합니다. 새 단위를 추가할 때는 백업 마이그레이션 정책도 함께 검토해야 합니다.

## 공개 저장소 원칙

개인 필기, 비밀 키, 대형 GS 데이터, 사용 권한이 없는 자산은 커밋하지 않습니다. 일반 PLY가 항상 GS 데이터인 것은 아니며 GS picking은 mesh raycasting과 다를 수 있습니다. renderer.info는 총 GPU VRAM 측정값이 아닙니다. Spark는 향후 GS 실행기 후보이며 아직 설치되지 않았습니다.

의존성 버전은 pnpm-lock.yaml로 고정합니다. 코드 라이선스는 [ISC](LICENSE)이며 외부 라이브러리와 데이터의 라이선스는 별도입니다.
