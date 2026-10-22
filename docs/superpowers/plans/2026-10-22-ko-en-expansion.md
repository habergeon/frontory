# Frontory 전체 644개 한국어·영어 지원 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공통 기능과 대표 강의 네 개에서 검증한 다국어 경로를 전체 23개 시리즈·644개 학습 단위 및 관련 안내·예제로 확장한다.

**Architecture:** 기존 생성기와 안정 ID별 영어 번역 레코드를 사용한다. 시리즈별 독립 원고를 소수 단위씩 검토하고, 생성기·runtime은 단일 작성자가 관리한다. 원문·번역 구조와 실제 실행 결과를 대조한 뒤 전체 영어 공개 집합을 확정한다.

**Tech Stack:** 기존 React·TypeScript·Vite·Node·Cloudflare Pages. 새 runtime dependency 없음. Node `>=22.18.0`, pnpm `10.34.5`.

**Spec:** [승인된 설계](../specs/2026-10-22-ko-en-design.md)

## Global Constraints

- 먼저 [공통 기능 계획](2026-10-22-ko-en-foundation.md)의 Tasks 1~18을 완료한다. 그 계획의 경로·저장·광고·GitHub·모델 계약을 그대로 적용한다.
- 최종 23개 시리즈·644개 단위, 기존 94개 ID·경로를 유지한다. 확장 JSON은 22개 시리즈·616개 단위이며 WebGL은 28개 단위와 소개 1개를 수동 관리한다.
- 추가 예제 메타데이터는 550개다. 전체 644개 실행 안내는 추가 메타데이터와 기존 설명을 합쳐 검증한다.
- code·notes·progress는 두 언어에서 공유한다. 새 영어 원본·주석·제목을 제공해도 사용자 초안을 자동 교체하지 않는다.
- 번역은 산문·표시 문구만 변경한다. 숫자·ID·API·경로·reference URL·실험 fixture·타입 지시문·실제 결과는 보존한다.
- 실행 환경을 확보하지 못한 GPU·외부 도구 검사는 미검증으로 보고한다. 검증하지 못한 상호작용을 통과로 집계하지 않는다.
- 영어 페이지에 광고 스크립트를 추가하지 않는다. 기존 한국어 네 경로는 그대로다.
- 최종 정상 canonical 페이지 수는 1,342개다. 404·hash·다운로드 파일은 사이트맵에서 제외한다.
- 번역·검토 서브에이전트는 `gpt-6.1-sol`·`medium`, 공용 파일 단일 작성자. 한국어 새 문서는 `humanize-korean` 관점으로 검토한다.

## Review Focus

1. 배열 중간에 새 concept가 삽입되면 기존 영어 문장이 다른 개념에 연결되지 않고 hash 오류로 검출되어야 한다 — Task 1.
2. 한글·café·日本語·문자열 길이 fixture를 영어로 바꿔 실험 결과가 변하지 않아야 한다 — Tasks 2, 4.
3. WebGL의 기존 Markdown·공개 주소·옛 백업 ID가 확장 JSON 규칙 때문에 바뀌지 않아야 한다 — Task 3.
4. Playwright 텍스트 locator, HTML lang/srclang, WAT·Node 출력 key는 단순 표시 번역과 분리되어야 한다 — Task 5.
5. 실제 공개되지 않은 번역이나 오래된 영어 페이지가 사이트맵·이전/다음·영어 원본 링크에 남지 않아야 한다 — Tasks 6, 8.

## 작업 파일과 인터페이스

공통 기능 계획에서 정의한 `Locale`, `readEnglishContent({complete})`, `mergeTranslation`, `sourceHash`, `loadDocument`, `practiceGuide`, runtime `start(..., locale)`를 그대로 사용한다. 새 이름으로 같은 기능을 중복 구현하지 않는다.

- 시리즈 번역 원본: `content/locales/en/curricula/<seriesId>.json`.
- 시리즈 metadata: `content/locales/en/series.json`. 한 작성자만 갱신한다.
- 영어 공개 집합: `content/locales/en/manifest.json`의 `publishedUnitIds`. 번역·실행 안내 검토 완료 ID만 추가한다.
- 수동 문서 freshness: `content/locales/en/documents.json`의 원본 경로·hash·번역 경로.
- 기존 WebGL 표시 metadata: `content/locales/en/webgl.json`에 동일 번역 레코드 형식 사용. 원본은 `content/catalog-v2.json`의 WebGL 단위다.
- 예제 표시·설명 번역: `content/locales/en/examples/<seriesId>.json`에 ID별 `note`, 메시지, 설명 주석 데이터를 둔다. metadata의 mode/files는 원본에서 가져온다.
- 생성 문서: `/docs/` 뒤 경로가 같은 `docs/en/…`; 영어 표시 catalog는 `src/app/catalog.en.json`.
- 영어 읽기용 예제: `public/examples-en/<unitId>/example.js`. 새 알고리즘 원본으로 삼지 않는다.

## Task 1: 완전성·번역 변경 감지 검사

**Files:** Modify `scripts/locale-content.mjs`, `tests/locale-content.test.mjs`, `package.json`.
**Interfaces:** `pnpm check:translations`는 기본 부분 manifest 검사, `pnpm check:translations --complete`는 전체 23/644·수동 문서·예제 안내 완전성 검사다. Node 진입 스크립트는 `scripts/check-translations.mjs`로 만든다.

- [ ] 테스트 작성: 원본 concepts 배열 삽입/재배열/문구 수정 시 기존 hash 거부; reference URL 변경 시 검토 요구; unknown ID·누락 field·누락 영어 원고 실패; 영어 레코드가 원문 객체를 바꾸지 않음.
- [ ] `node --test tests/locale-content.test.mjs` → 해당 검사가 없는 상태에서 실패 확인.
- [ ] 기존 validator에 전체 모드와 수동 문서·예제 안내 연결 검사를 추가한다. 숫자·코드 변경은 자동 추출 대조의 검토 목록으로 남기며 hash만 같다고 의미 보존을 판정하지 않는다.
- [ ] 테스트와 부분 모드 통과. 전체 모드는 이 시점에 미번역 ID를 정확히 보고해야 한다. 커밋: `test: enforce translation completeness and freshness`.

## Task 2: 22개 커리큘럼 번역 확장

**Files:** 시리즈당 `content/locales/en/curricula/<seriesId>.json` 1개와 해당 생성 Markdown. `series.json`·manifest는 통합 담당자가 갱신한다.
**Interfaces:** sourceHash·field path 레코드를 사용한다. 한국어 `content/curricula`는 번역 때문에 고치지 않는다. 이미 번역한 네 단위는 다시 번역하지 않는다.

아래 각 행은 독립 작업이다. 한 행을 1~3개 학습 단위 묶음으로 실행하고 검토·생성 검사 후 커밋한다. 원고 파일은 시리즈 작성자 한 명이 소유한다. 공용 파일에 동시 쓰기하지 않는다.

| 묶음 | 시리즈 | 목표 단위 수 | 추가 확인 |
| --- | --- | ---: | --- |
| C01 | `javascript` | 28 | 값 변환·문자열·비동기 결과 |
| C02 | `css` | 28 | px·박스 크기·계산 조건 |
| C03 | `react` | 28 | snapshot·updater·effect 설명 |
| C04 | `gsap` | 28 | 시작값·시간·즉시 렌더링 |
| C05 | `html` | 28 | 언어·인코딩·접근성 실험 fixture |
| C06 | `typescript` | 28 | 타입 검사 지시문·오류 기대값 |
| C07 | `vue` | 28 | 반응성·watch·cleanup |
| C08 | `svelte` | 28 | 내장 preview와 실제 compiler 실행 차이 |
| C09 | `canvas-2d` | 28 | 좌표·크기·픽셀 관찰 |
| C10 | `svg` | 28 | viewBox·좌표·DOM 속성 |
| C11 | `threejs` | 28 | 카메라·좌표·자원 정리 |
| C12 | `react-three-fiber` | 28 | React 수명주기와 Three 객체 관계 |
| C13 | `pixijs` | 28 | 합성 자료·모의 실패·정리 |
| C14 | `webgpu` | 28 | adapter 미지원·GPU 검증 범위 |
| C15 | `wgsl` | 28 | 언어 문법·layout·compiler 원문 |
| C16 | `glsl` | 28 | 셰이더 수식·정밀도·오류 |
| C17 | `gaussian-splatting` | 28 | CPU 교육 예제와 실제 학습·추론 구분 |
| C18 | `motion` | 28 | 시간·spring·상태 변화 |
| C19 | `web-workers` | 28 | 복사·전송·취소·경계 |
| C20 | `offscreen-canvas` | 28 | 지원 여부·worker/화면 관계 |
| C21 | `webassembly` | 28 | iframe CSP와 외부 WAT/Node 구분 |
| C22 | `playwright` | 28 | preview와 실제 E2E 실행 구분 |

각 묶음의 반복 절차:

- [ ] 해당 원본 ID·필드가 미번역 검사에 나타나는지 확인한다. fixture·숫자·API·reference URL 보존 목록을 기록한다.
- [ ] title·prerequisites·environment·concepts·outcomes·steps·variables 설명·criteria·questions·reference title을 번역한다. 시리즈 goal·capstone·단계명도 완료한다.
- [ ] 별도 검토자가 원문과 대조한다. 가설을 관찰 결과로, 제한된 예제를 완성 구현으로 바꾼 문장을 수정한다.
- [ ] `pnpm build:curricula && pnpm check:curricula && pnpm check:translations` → 해당 공개 집합 통과. 영어 가이드 세 영역과 링크 검사를 실행한다.
- [ ] 통합 담당자가 검토된 ID만 manifest에 추가하고 생성물과 함께 커밋: `docs: translate <seriesId> lessons <first>-<last>`.

## Task 3: WebGL 28개 단위와 시리즈 소개

**Files:** Create `content/locales/en/webgl.json`, `docs/en/labs/graphics/webgl/.../README.md`; Modify `content/locales/en/documents.json`, `tests/curricula.test.mjs`. 실제 29개 문서 경로는 현재 WebGL catalog와 intro에서 가져온다.
**Interfaces:** WebGL의 한국어 원본 경로·legacy ID는 그대로이며 영어 docPath만 `/docs/en/`으로 대응한다. 기존 WebGL을 확장 curriculum JSON으로 이관하지 않는다.

- [ ] 테스트 작성: WebGL ID 28개와 원본 docPath 목록이 baseline과 같음; 영어 대응 문서 29개 실존; 백업 v1의 28개 ID가 영어 상태에서도 동일.
- [ ] 영어 WebGL 미완성 상태에서 누락 ID·문서를 확인한다.
- [ ] 문서 1~3개씩 번역하고 수식·코드 블록·측정 조건·참고 문헌 링크를 대조한다. 표시 title·goal·단계 metadata를 연결하고 원문 hash를 기록한다.
- [ ] curriculum·practice-guide·backup 테스트 통과. 소수 문서별 커밋: `docs: translate WebGL lessons <first>-<last>`.

## Task 4: 브라우저 예제 전체의 표시 언어

**Files:** `scripts/generate-foundations-examples.mjs`, `scripts/generate-framework-examples.mjs`, `scripts/generate-graphics-examples.mjs`, `scripts/generate-gpu-examples.mjs`, `scripts/generate-engineering-examples.mjs`는 한 번에 하나씩 수정한다. 각 시리즈 `content/locales/en/examples/<seriesId>.json`과 해당 생성 예제를 연결한다. 기존 94개 원본은 별도 소유 목록으로 관리한다.
**Interfaces:** mount의 locale·예제 최소 사전·영어 읽기용 원본 계약은 공통 계획 Task 13과 같다. 전체 한글을 정규식으로 치환하지 않는다.

- [ ] 대표 fixture 테스트 추가: HTML 인코딩의 한글·café·日本語 보존, JSON key·수치 결과 동일, 영문 버튼·aria·도움말 존재. 기존 한국어도 필요한 안내가 남아야 한다.
- [ ] 각 생성기 담당자가 표시 문구·설명 주석만 분리하고 테스트를 통과시킨다. 재생성 전후 비주석 코드 차이는 locale 선택·표시 문자열에 한정되는지 검토한다.
- [ ] 550개 추가 예제뿐 아니라 기존 94개 원본과 기존 실행 제한 설명까지 대조한다. 생성기가 원래 만들지 않는 원본을 새 생성기로 강제 이관하지 않는다.
- [ ] `pnpm check:examples`와 해당 예제 브라우저 검사 통과. generator별·시리즈별 작은 커밋: `feat: localize <seriesId> experiment presentation`.

## Task 5: 외부 실행 파일·README·자막

**Files:** `src/labs` 추가 파일 233개를 분류한 명세 `content/locales/en/companions.json` 작성. 실제 번역 파일은 해당 예제 폴더와 영어 읽기용 사본이며 생성 원본이 있으면 생성기에서 수정한다.
**Interfaces:** 각 파일에 `kind: 'display' | 'fixture' | 'code' | 'binary'`, 원본 경로, 영어 제공 방식, 확인 상태를 기록한다. binary는 번역하지 않는다. 이는 누락 검사용 명세이며 새로운 runtime 설정 시스템이 아니다.

- [ ] 전체 추가 파일 목록과 명세의 경로 집합 일치 테스트 작성. wasm/mp4 binary 불변, VTT timestamp 불변, WAT import/export·Node assertion key 불변 검사.
- [ ] 현재 미분류 파일을 검사로 확인한 뒤 실제 사용 기준으로 분류한다. README 5개·사용법·대본·자막 산문은 번역한다.
- [ ] Playwright UI 문구를 바꾸면 locator·기대값을 같은 변경에서 맞춘다. locale 자체를 실험하는 HTML lang/srclang은 유지한다. Svelte·TS·HTML standalone 실행 방법을 영어로 제공한다.
- [ ] 해당 fixture의 실제 Node/WAT/Playwright/Svelte 검사를 실행하고 실행 환경이 없는 항목을 따로 남긴다. 파일 종류별 소수 묶음 커밋: `docs: localize <unitId> companion guidance`.

## Task 6: 전체 안내·저장소 문서 연결

**Files:** Create `README.en.md`, `CONTRIBUTING.en.md`; Modify `README.md`, `CONTRIBUTING.md`; 완성된 `docs/en/roadmap.md`, `docs/en/labs/README.md`, `docs/en/examples.md`, 생성 `docs/en/examples-expanded.md` 및 각 freshness 레코드.
**Interfaces:** 기존 README·기여 안내에 언어 링크를 추가한다. 영어 앱에서 연결되는 학습 문서는 영어 대응이 있어야 한다. 내부 설계·작업 이력은 전체 번역 대상이 아니다.

- [ ] 영어 사용자 경로의 모든 Markdown 링크를 검사하고 미존재/의도치 않은 한국어 복귀 링크를 실패로 처리한다. 외부 공식 문서는 원래 URL을 유지한다.
- [ ] README·기여 안내를 번역하고 로드맵·기술 지도를 실제 전체 23/644 목록으로 갱신한다. 자료·원본 코드·문서 다운로드 언어를 구분한다.
- [ ] `pnpm check:translations --complete`와 문서 링크 테스트 통과. 안내 묶음별 커밋: `docs: complete English project and study navigation`.

## Task 7: 완전성 검사를 CI에 연결

**Files:** Modify `package.json`, `.github/workflows/ci.yml`, `tests/locale-content.test.mjs`.
**Interfaces:** 전체 번역 완료 시 `pnpm build` 또는 CI에서 `pnpm check:translations --complete`가 반드시 실행되어야 한다. 부분 공개 모드는 개발 중 검사 용도로만 남긴다.

- [ ] 영어 원고 하나를 임시 fixture에서 빼거나 hash를 바꾸면 CI 명령이 실패하는 테스트 작성. 실제 사용자 파일을 삭제해 시험하지 않는다.
- [ ] 전체 검증 명령을 기존 test/build/check:deploy 흐름에 연결한다. 생성물 직접 수정과 stale 번역을 실패로 잡는다.
- [ ] 전체 23/644·legacy 94·가이드·예제 안내·수동 문서 freshness 검사 통과. 커밋: `ci: require complete and current English translations`.

## Task 8: 양언어 링크·검색·크기 전수 검사

**Files:** Modify `tests/search-pages.test.mjs`; Create `tests/localized-links.test.mjs`; 필요시 Modify `scripts/check-deploy.mjs`의 출력 정보만.
**Interfaces:** 최종 catalog와 manifest에서 기대 URL 집합을 만들고 실제 생성 맵을 대조한다. 단순 총개수만으로 성공 판정하지 않는다.

- [ ] 테스트 작성: ko 671개 기존 집합 포함, en 671개 대응, 총1,342개 고유 canonical; 양쪽 self canonical과 reciprocal hreflang; 없는 문서·404·hash·source 다운로드 제외.
- [ ] 영어 이전/다음·시리즈·footer·실습·읽기용 원본 링크를 전수 확인한다. ko/en lang·JSON-LD·OG·본문 연결 일치, 영어 광고 태그0개, 기존 ko4개만1개 확인.
- [ ] `pnpm test && pnpm build && pnpm check:deploy` → 통과. 최초 JS에 양언어 Markdown 전체가 들어가지 않는지 번들 목록·크기를 확인한다. 새 문서 로더가 만들어 낸 asset 수도 확인한다.
- [ ] 검사 커밋: `test: verify all bilingual public routes and assets`.

## Task 9: 전체 예제·대표 상호작용 검증

**Files:** Modify `tests/browser/examples.ts`, `tests/browser/i18n.js`, `docs/example-verification.md`.
**Interfaces:** 644개 기본 mount/dispose와 심층 상호작용 검사는 구분해 기록한다. ko/en에서 동일 입력으로 결과 비교가 가능한 예제를 우선 사용한다.

- [ ] 가능한 환경에서 644개 mount/dispose를 ko/en으로 실행한다. 미지원 GPU는 지원 여부 안내와 실패 복구를 검사하고 GPU 실행 통과로 세지 않는다.
- [ ] 각 기술군에서 입력·출력·오류 복구·cleanup·언어 전환 대표 상호작용을 검사한다. 외부 Playwright/WASM 실행은 실제 별도 runner 결과로만 기록한다.
- [ ] 백업 v1/v2/v3와 storage 차단, 의도적 빈 필기, 언어 왕복, TypeScript 마지막 정상 실행 보존을 다시 확인한다. 모바일 네 너비·keyboard·focus·aria 검증을 마친다.
- [ ] 실패 원인만 수정하고 영향받는 검사를 재실행한다. 환경·통과/미검증 범위와 증거 경로를 문서화해 커밋: `test: validate bilingual examples and saved work`.

## Task 10: 최종 검토·운영 배포

**Files:** Modify `docs/search-indexing.md`, `docs/deployment.md`, `docs/example-verification.md`, `docs/adsense.md`의 실제 결과만.
**Interfaces:** GitHub→Cloudflare 기존 배포를 사용한다. 새 호스트나 서버를 만들지 않는다.

- [ ] 독립 검토자가 데이터 손실, 번역 누락·과장, fixture 변경, 공개 주소·광고 범위, generated source 일치 여부를 확인한다. 필수 지적 수정 후 관련 검사와 최종 test/build/deploy 검사를 통과시킨다.
- [ ] GitHub 계정 `habergeon` 재검증 후 완료 커밋만 push한다. CI와 Cloudflare 배포 결과를 각각 확인한다. 실패 시 원인을 확인해 필요한 변경만 한다.
- [ ] 운영 홈 ko/en, 대표 네 강의 ko/en, WebGL ko/en, 각 시리즈 목차, about/privacy, sitemap, ads.txt, 없는 ko/en 경로를 검증한다. 정규화·초기 HTML·자산200·404·광고 태그 범위를 확인한다.
- [ ] 운영 브라우저에서 영어 직접 진입·한국어 전환·필기 보존·공개 문서 왕복을 확인한다. 완료 범위와 GPU/외부 실행 등 남은 제한을 구분해 보고한다. Search Console 등록·AdSense 계정 설정 완료는 별도 확인 없이 주장하지 않는다.

## 담당과 체크포인트

주 에이전트는 validator·manifest·생성기·runtime·전체 통합을 소유한다. 영어 원고 작업자는 시리즈 파일을 분할해 맡고 예제 담당자는 공용 생성기 잠금을 지킨다. 동시에 실행할 수 있는 총 agent 수를 넘기지 않는다. 번역 검토자는 작성자와 분리한다.

체크포인트는 공통 기능 완료, 각 시리즈 원고·예제 연결 완료, 전체 644개 완전성 통과, 운영 배포 완료다. 각 지점에 실제 통과한 검사와 미검증 항목을 남긴다. 번역량을 줄이기 위해 한국어 fallback으로 빈 영어 레코드를 채우지 않는다.

## 자체 검토 기록

22×28=616과 WebGL28을 합친644개, source644개와 companion233개의 분류, metadata550개와 기존 설명을 구분했다. 설계의 저장소 안내·자막·설명 주석·예제 독립 다운로드 범위도 Tasks 4~6에 포함했다. 영어 전체 공개·CI freshness·1,342개 URL·운영 확인은 Tasks 7~10에 연결했다. 다섯 Review Focus는 소유 작업의 검사로 구체화했으며 기존 한국어 주소 이전이나 새 번역 서비스는 도입하지 않는다.
