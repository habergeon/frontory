# Three.js 전체 단원 자체 완결 학습 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 현재 검증된 상태를 운영 배포한 뒤 Three.js 05~28을 사이트 안에서 학습·실습·기록할 수 있게 한다.

**Architecture:** 기존 학습 데이터와 독립 HTML 예제 구조를 확장한다. GLTFLoader와 로컬 자산 읽기를 기존 격리 실행에 추가하고, 5개 단원 묶음을 순차 구현·검토한다. 한국어·영어와 생성 문서는 같은 원본 계약을 따른다.

**Tech Stack:** React 19.3.1, TypeScript 7.0.2, Monaco 0.55.1, Three.js 0.186.1, Vite 8.3.4, esbuild, Prettier 3.9.10, Node 24.16.0, pnpm 10.34.5.

**Spec:** [전체 단원 확장 설계](../specs/2026-10-27-threejs-complete-learning-design.md), [단원별 로드맵](../specs/2026-10-26-threejs-learning-roadmap.md). 기존 첫 과정의 구현과 증거는 재작성하지 않는다.

## Global Constraints

- 단원 ID·초안 저장 키·Draft version 1·backup version 1/2/3을 유지한다.
- 과거 language 생략은 JavaScript이며, 빈 문자열은 유효한 사용자 코드다.
- 사용자 코드·필기·완료 상태를 자동 덮어쓰거나 초기화하지 않는다.
- 기존 28개 순서를 유지한다. 14번 ID는 `threejs-02`, 28번은 `threejs-03`이다.
- `three@0.186.1`과 같은 설치 버전의 addons를 사용한다. 외부 CDN·npm 실행 환경을 추가하지 않는다.
- iframe은 `allow-scripts`를 유지한다. Three.js module을 공급하는 HTML 실행에서만 `connect-src blob: data:`를 허용한다. HTTP(S)·self 통신과 다른 profile의 정책은 열지 않는다.
- 한국어·영어의 새 강의·안내·오류·API 자료를 함께 제공한다. 원문 해시와 번역 freshness 검사를 약화하지 않는다.
- 공용 `embeddedLanguageFormatting: off`와 Svelte P01 adapter를 유지한다.
- 한 번에 한 제품 작성자만 작업한다. 공통 JSON과 generator 출력은 병렬로 수정하지 않는다.
- Windows Git Bash 우선. 한국어 문서는 humanize-korean 룰북으로 최종 검토한다.
- 사용자 untracked `tasks/`와 `docs/superpowers/specs/2026-10-26-html-practice-design.md`를 보존한다.
- 샘플은 자체 제작한 작은 PNG/GLB를 HTML에 포함한다. 로컬 파일은 실행 중에만 사용하며 백업에 넣지 않는다. 파일 선택 옆에 KO/EN으로 이 제한을 알린다.
- 새 단원마다 최소 3개 단계와 핵심 API 설명을 작성한다. 시작 코드·완성 코드·설명·관찰값은 실제로 연결돼야 한다. 로드맵과 확장 설계의 단원별 최소 실험을 모두 포함한다.
- 모든 새 starter·solution을 KO/EN 실제 preview에서 실행한다. 단원별 최소 한 조건 변경은 실제 editor 편집→컴파일→iframe으로 검증한다. 1440/390에서 주요 조작이 가능해야 한다.
- 각 묶음은 독립 내용 검토와 단원별 실행 검증을 마친 뒤 완료한다. 작성자가 실제 검증 후 readiness를 변경할 수 있지만 독립 검토 전에는 묶음 완료나 배포를 선언하지 않는다. 구현 상태와 사용자 학습 진도를 섞지 않는다.
- 확장 구현의 원격 push·배포는 현재 상태의 선행 운영 배포와 구별한다. 완료 보고에서 실제 배포 커밋을 명시한다.

## Review Focus

- 내장 이미지 GLB의 ImageBitmapLoader가 CSP에 막히거나 외부 URL까지 열리는 경우: Task 1에서 두 경로를 실제 브라우저로 검사한다.
- 파일 선택 후 재실행·새로고침·백업 복원: 파일은 다시 선택하되 코드·필기·샘플은 정상 복원한다. Tasks 3·4·7에서 검사한다.
- 공유 재질 강조, 인스턴스 위치 변경 뒤 bounds, 카메라 fit이 오래된 값을 쓰는 경우: Tasks 4·5의 실제 조작·raycast로 확인한다.
- 느린 요청·정리·다중 패스 통계가 겹칠 때 stale 결과가 현재 장면을 덮거나 자원을 중복 해제하는 경우: Task 6에서 순서 역전과 반복 수명 검사를 수행한다.
- 단원 수 확대가 초기 번들·생성 문서·KO/EN 해시·모바일 목록을 깨뜨리는 경우: 각 묶음의 생성 검사와 Task 7 전체 빌드·28개 진입 검사로 확인한다.

## 파일 책임

| 영역      | 경로와 책임                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 실행 모듈 | `src/preview/three-gltf-entry.ts`, `types.ts`, `html-document.ts`, `html-runtime.ts`, `Preview.tsx`, `scripts/build-three-preview.mjs`                           |
| 학습 원본 | `content/learning/threejs.json`, `content/locales/en/learning/threejs.json`: 설명·단계·API·번역 해시                                                             |
| 단원 연결 | KO/EN `content/**/curricula/threejs.json`, `content/**/examples/threejs.json`, `content/**/learning/threejs-roadmap.json`                                        |
| 독립 코드 | `src/labs/<unitId>/example{,.en}.html`, `steps/<name>{,.en}.html`, `solutions/<name>{,.en}.html`; legacy JS 보존                                                 |
| 생성물    | 기존 `scripts/build-curricula.mjs`, `generate-graphics-examples.mjs`의 출력 catalog·docs·examples. 생성 파일은 직접 고치지 않는다                                |
| 검증      | 기존 학습/schema/HTML 검사, 새 `tests/threejs-complete-learning.test.mjs`, `tests/browser/threejs-remaining-*.js`, `scripts/check-threejs-remaining-browser.mjs` |

브라우저 검사 코드는 묶음별로 나눈다. 공유 조작은 실제로 중복되는 코드만 `tests/browser/threejs-remaining-helpers.js`로 모은다. 새 runner는 기존 runner의 유한 deadline·소유한 browser/server 종료 원칙을 유지한다. 모든 단계 inventory와 성공 결과를 JSON에 남겨 일부 단계 누락을 찾을 수 있게 한다.

## 선행 운영 배포

`0338dbe857265441d76d12b073170e24ac794cb5`의 로컬 전체 테스트 918/918과 배포 파일 검사가 통과했다. GitHub CI 40481226264도 성공했다. 첫 Cloudflare 배포는 내부 오류로 실패했고 코드 변경 없는 재시도 `a8d93312-af7a-40e1-8832-f8d7b90c8113`는 성공했다. 운영 UI 검증 결과는 별도 보고서와 ledger에 남긴다. 이것이 Tasks 1~7의 구현 완료를 의미하지 않는다.

### Task 1: GLTFLoader와 로컬 자산 실행

**Files:** 위 실행 모듈 6개와 신규 `src/preview/three-gltf-entry.ts`; `tests/html-preview.test.mjs`, `tests/browser/html-runtime.{html,js}`; `src/app/learningSchema.ts`, `scripts/learning-content.mjs`, `tests/learning-roadmap.test.mjs`. 필요할 때만 한 쌍의 기존 runtime 안내 문서를 수정한다.

**Interfaces:** `HtmlPreviewModules.gltf?: string`. import key는 정확히 `three/addons/loaders/GLTFLoader.js`. core를 공급할 때만 로컬 connect scheme을 허용한다. GLTFLoader는 core를 외부 `three` import로 참조한다. `validateLearningRoadmap(data, ids)`는 순서·ID·enum·선수 검사를 보존하고 첫4/후속24라는 ordinal 제한을 제거한다. `readLearningContent()`에서 verified 단원의 실제 lesson 연결을 검사한다.

- [ ] 기존 CSP의 실패를 actual GLTFLoader와 내장 PNG GLB로 재현한다. plain HTML의 connect 차단과 Three.js의 외부 fetch 차단을 각각 assertion으로 남긴다.
- [ ] addon 번들·import map·충돌 진단·module URL 정리를 최소 변경으로 연결한다. 기존 core/controls identity를 유지한다.
- [ ] static·animated·empty·textured GLB의 실제 parsing, core의 Group/Mesh identity, 이미지 decode, 잘못된 GLB 후 샘플 복구를 실제 sandbox에서 검사한다. fixture는 자체 제작하고 생성 근거를 보존한다.
- [ ] readiness의 순서별 제한만 풀고 unknown status·unknown ID·duplicate·self prerequisite·verified-without-lesson은 계속 거부한다. 현재 첫4 verified/24 planned 데이터는 바꾸지 않는다.
- [ ] `node --test tests/html-preview.test.mjs tests/learning-roadmap.test.mjs tests/learning-content.test.mjs`, `pnpm prepare:preview`, `pnpm typecheck`, 관련 runtime browser case를 통과시킨다. 관련 파일 format 검사 후 커밋한다.

### Task 2: 05~09 도형·공유·조명

**Files:** 파일 책임 표의 05~09 단원 경로와 공통 원본·생성물; `tests/threejs-complete-learning.test.mjs`; 신규 `tests/browser/threejs-remaining-05-09.js`, 공통 helper와 runner.

**Interfaces:** 기존 `LessonLearningData`/`LearningStep`/`ApiReference` 구조를 그대로 사용한다. runner CLI는 `--group 05-09|10-13|14-18|19-22|23-28|all`, 선택적 `--unit <existing-unit-id>`를 받는다. `all`은 좁은 선택을 무시하고 전체 등록 inventory를 실행한다. 후속 묶음은 `runGroup(page, base, unitId?)`를 export한다. 결과에 실행한 unit/step/locale/source 종류와 actual observation을 기록한다.

- [ ] 05 attributes/index/update, 06 winding/normals/flat-smooth, 07 shared/clone/independent-edit, 08 ambient/directional-target/point, 09 roughness/metalness/environment 실험과 완료 조건을 단계로 작성한다.
- [ ] 먼저 05~09 HTML lesson 누락을 검출하는 검사와 브라우저 관찰 assertion을 추가해 실패를 확인한다. 문구 복제만 검사하는 테스트는 쓰지 않는다.
- [ ] KO/EN 독립 starter·solution과 기본 HTML, API·설명·해시를 작성한다. 09 환경 조명은 자체 생성 환경이나 현재 core 기능으로 고정 조건을 만들고 외부 HDR을 필수로 요구하지 않는다.
- [ ] 실제 정점/인덱스 수, 법선·면 방향, 공유 참조 변경 전파, 광원 target, PBR 변수 비교를 모든 단계에서 확인한다. 표시 숫자의 계산 근거와 시각 결과를 함께 대조한다. 최소 단원별 코드 편집 1회와 KO/EN·1440/390 확인을 포함한다.
- [ ] generator로 원본과 문서를 갱신한다. `pnpm check:curricula`, `pnpm check:translations --complete`, `node --test tests/learning-content.test.mjs tests/learning-roadmap.test.mjs tests/threejs-complete-learning.test.mjs`, 해당 browser group, 대상 format 검사를 수행하고 커밋한다.
- [ ] 보고서에는 단계 inventory, 공식 자료 대조, 실제 결과와 예외를 기록한다. 실제 검증 후 05~09를 verified로 표시하고 PM의 독립 검토를 받는다.

### Task 3: 10~13 이미지·색 공간·그림자·선택

**Files:** 10~13 단원 경로와 공통 원본·생성물, completeness 검사, 신규 `tests/browser/threejs-remaining-10-13.js`, runner 등록.

**Interfaces:** Task 1의 local data/blob 자산 지원과 Task 2의 `runGroup(page, base, unitId?)`/inventory 계약을 사용한다. 로컬 이미지 입력은 lesson HTML 안에서 관리하고 app의 저장 schema를 바꾸지 않는다.

- [ ] 10 UV/repeat/load-recovery, 11 color-map/data-map/output, 12 flags/shadow-frustum/map-size, 13 canvas-NDC/intersections/selection 단계를 만든다. 최소 실험의 검증을 먼저 추가해 누락 실패를 확인한다.
- [ ] PNG/JPEG 실제 TextureLoader 성공, 손상 이미지 실패·샘플 복구, object URL 수명과 texture 교체 정리를 구현한다. 색/수치 texture의 colorSpace와 outputColorSpace의 역할을 설명한다.
- [ ] canvas 위치·크기가 변해도 가장 가까운 객체가 선택되는지 클릭 좌표로 검사한다. shadow camera 잘림과 map 해상도 저하를 다른 조건으로 구분한다.
- [ ] 모든 starter·solution KO/EN 실행과 단원별 editor 수정·1440/390 조작을 확인한다. 파일 내용은 백업에 없다는 안내와 다시 실행한 샘플 복구를 확인한다.
- [ ] Task 2와 같은 생성·freshness·학습 검사, 해당 browser group, 대상 format을 통과시키고 커밋한다. 실제 검증 후 10~13를 verified로 표시하고 PM의 독립 검토를 받는다.

### Task 4: 14~18 모델·카메라·움직임

**Files:** `threejs-02`, `threejs-step-15`~`threejs-step-18` 단원 경로와 공통 원본·생성물, completeness 검사, 신규 `tests/browser/threejs-remaining-14-18.js`, runner 등록.

**Interfaces:** Task 1의 GLTFLoader와 내장 자산 parsing을 사용한다. built-in GLB는 같은 단원 코드 안에 포함한다. 로컬 파일은 `file.arrayBuffer()`와 `loader.parseAsync(buffer, '')`로 읽는다.

- [ ] 14 loading/selection/highlight-recovery, 15 bounds/fit/empty, 16 target/damping/demand, 17 clips/mixer-time/actions, 18 opacity/depthWrite/sorting 단계를 만든다. 목표 동작의 검사부터 추가한다.
- [ ] static/animated/empty/textured/invalid 모델, 원점에서 먼 크기 변형을 제공한다. 파일 입력 제한과 미지원 외부 URI·압축 모델의 복구 안내를 KO/EN으로 적는다.
- [ ] 공유 material을 가진 모델에서 선택한 객체만 강조되는지, offset 모델의 fit과 empty 처리, frame counter가 정지 후 멈추되 controls 조작 중 갱신되는지 확인한다.
- [ ] clip 없는 모델도 UI가 살아 있어야 한다. 초 단위 delta·재생·정지·속도 조작과 mixer cleanup을 확인한다. 투명도 정렬 한계를 완전 해결로 설명하지 않는다.
- [ ] 모든 starter·solution KO/EN 실행과 단원별 editor 수정·1440/390 조작을 확인한다. 기존 생성·freshness·학습 검사, 해당 browser group, 대상 format을 통과시키고 커밋한다. 실제 검증 후 14~18를 verified로 표시하고 PM의 독립 검토를 받는다.

### Task 5: 19~22 인스턴스·경계·여러 화면

**Files:** 19~22 단원 경로와 공통 원본·생성물, completeness 검사, 신규 `tests/browser/threejs-remaining-19-22.js`, runner 등록.

**Interfaces:** 기존 core API와 앞선 조작 helper를 사용한다. 통계는 실제 `renderer.info`, 선택은 실제 Raycaster, bounds는 실제 geometry/InstancedMesh API로 측정한다.

- [ ] 19 mesh/instances/stats, 20 instanceId/update/bounds, 21 bounds/culling/LOD, 22 target/minimap/restore 단계를 만든다. 같은 배치와 실제 선택 좌표를 사용하는 실패 검사부터 추가한다.
- [ ] 개별 Mesh와 인스턴스의 배치·재질을 같게 유지하고 calls/triangles 의미를 설명한다. 선택한 instance의 위치·색과 needsUpdate를 바꾸고 새 위치에서 다시 raycast한다.
- [ ] 낡은 bounds로 발생한 컬링 문제를 고치고 LOD 거리별 상태와 삼각형 수를 비교한다. render target·viewport·scissor 등 예제가 바꾼 상태를 올바르게 복원한다.
- [ ] 모든 starter·solution KO/EN 실행과 단원별 editor 수정·1440/390 조작을 확인한다. 기존 생성·freshness·학습 검사, 해당 browser group, 대상 format을 통과시키고 커밋한다. 실제 검증 후 19~22를 verified로 표시하고 PM의 독립 검토를 받는다.

### Task 6: 23~28 수명·비동기·접근성·통합

**Files:** 23~27 및 `threejs-03` 단원 경로와 공통 원본·생성물, completeness 검사, 신규 `tests/browser/threejs-remaining-23-28.js`, runner 등록.

**Interfaces:** 앞선 GLB·UI·선택·카메라·mixer·render target 결과를 독립 HTML 안에서 연결한다. stale 처리는 generation token으로 현재 요청과 구분하고 실제 소유 자원을 정리한다. 프레임 통계는 `renderer.info.autoReset = false`와 frame 단위 reset의 범위를 설명한다.

- [ ] 23 remove/dispose/shared, 24 race/stale/failure, 25 list/keyboard/status, 26 single-pass/multi-pass/baseline, 27 load/select-camera/animation/minimap/recovery, 28 baseline/quality-cost/cycles/report 단계를 만든다. 수명·비동기·키보드·통계 조건을 실패 검사로 먼저 표현한다.
- [ ] remove와 dispose를 구별하고 공유 소유권 장부로 중복 해제를 방지한다. 늦게 완료된 파싱 결과의 자원을 버리고 현재 UI·장면을 유지한다. timer·mixer·texture·geometry·material·target 정리를 실제 횟수로 확인한다.
- [ ] 객체 목록 선택·키보드 카메라 조작·상태 알림을 마우스 없이 검사한다. DOM 접근성 이름과 오류 복구 흐름을 확인한다.
- [ ] 27은 기능을 함께 조작할 수 있는 검사기로 만든다. 28은 사용자가 실제 비교값과 측정 조건을 필기에 남기게 하며 임의 성능 개선율이나 GPU 시간 정확도를 주장하지 않는다.
- [ ] 모든 starter·solution KO/EN 실행과 단원별 editor 수정·1440/390 조작을 확인한다. 같은 자산 생성/종료 반복과 request 순서 역전 결과를 보고서에 남긴다.
- [ ] 기존 생성·freshness·학습 검사, 해당 browser group, 대상 format을 통과시키고 커밋한다. 실제 검증 후 23~28를 verified로 표시하고 PM의 독립 검토를 받는다.

### Task 7: 전체 과정 검증과 공개 상태

**Files:** 전체 학습 completeness/roadmap 검사, browser runner·관련 fixture, 공개 로드맵과 실행 안내 KO/EN, 이번 계획의 검증 기록. 필요한 정정만 제품 코드에 적용한다.

**Interfaces:** 최종 inventory는 기존 28개 ID 순서와 정확히 일치한다. `--group all`은 5개 새 묶음 전체를 실행하며 단원 선택으로 축소되지 않는다. 기존 `check-threejs-browser.mjs --case all`은 첫4/공통계약 회귀로 별도 보존한다.

- [ ] 28개 lesson과 HTML 기본값, KO/EN parity, 모든 단계 source 경로·hash·완료 상태를 검사한다. 실제 검증과 독립 검토가 끝난 단원만 모두 verified인지 확인한다.
- [ ] 한국어·영어의 28개 단원과 생성 공개 문서를 열 수 있는지 확인한다. 새 후속 단원에서 언어 전환·문서 왕복·예제 로딩 Undo·필기·초안·JSON 백업 복원을 검사한다.
- [ ] `pnpm format:check`, `pnpm test`, `pnpm build`, `pnpm check:deploy`를 실행한다. build에 포함된 검사는 별도로 반복하지 않는다.
- [ ] 기존 첫4/공통 브라우저 all과 새 remaining all을 실행한다. timeout·실패·console·cleanup·스크린샷을 숨기지 않고 고유 artifact 경로로 기록한다.
- [ ] 로드맵의 현재 상태와 새 운영/로컬 검증 경계를 갱신한다. 이전 검증 기록은 과거 기록으로 보존한다. 한국어 문체와 영어 의미를 최종 대조하고 커밋한다.
- [ ] 전체 변경 독립 검토와 필요한 수정 후 재검증을 마친다. 최종 보고에서 선행 운영 배포 커밋과 확장 구현 커밋, 통과한 검사·남은 한계를 구별한다.
