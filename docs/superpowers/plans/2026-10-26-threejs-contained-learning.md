# Three.js 자체 완결 학습 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 첫 4개 Three.js 단원을 사이트 안에서 학습·실습·기록할 수 있게 하고, 이후 24개 단원의 학습 목록과 개선 상태를 함께 제공한다.

**Architecture:** 기존 JS/TS mount 실행을 보존하고 단일 HTML 문서 실행을 추가한다. 첫 4개 강의의 단계·힌트·해설·API 자료를 선택적으로 연결하고, 같은 원본에서 화면과 문서를 생성한다. Three.js와 OrbitControls는 설치 버전에 맞춘 사이트 소유 모듈로 공급한다.

**Tech Stack:** React 19.3.1, TypeScript 7.0.2, Monaco 0.55.1, Three.js 0.186.1, Vite 8.3.4, esbuild, Prettier 3.9.10. Node >=22.18.0, 현행 24.16.0, pnpm 10.34.5.

**Spec:** [학습 환경 설계](../specs/2026-10-26-threejs-contained-learning-design.md), [28개 단원 로드맵](../specs/2026-10-26-threejs-learning-roadmap.md).

## Global Constraints

- 첫 4개 기존 ID를 유지한다. 나머지 24개 단원은 학습 목록과 개편 상태를 제공하되 이번에 모두 개편하지 않는다.
- 단원 ID·초안 저장 키·Draft version 1·backup version 1/2/3을 유지한다.
- 과거 language 생략은 JavaScript이며, 빈 문자열은 유효한 사용자 코드다.
- 사용자 코드·필기·완료 상태를 자동 덮어쓰거나 초기화하지 않는다.
- `three@0.186.1`과 같은 설치 버전의 addons를 사용한다. 외부 CDN·npm 실행 환경을 추가하지 않는다.
- iframe은 기존 `allow-scripts`와 CSP의 외부 통신 차단을 유지한다.
- 한국어·영어의 새 강의·안내·오류·API 자료를 함께 제공한다. 원문 해시와 번역 freshness 검사를 약화하지 않는다.
- 공용 `embeddedLanguageFormatting: off`를 유지한다. Svelte는 기존 P01 adapter를 공유한다. 문서 내부 CSS/JS는 명시적 정렬 동작에서만 처리한다.
- 한 번에 한 제품 작성자가 공통 파일을 수정한다. 원격 push·배포는 이 계획 실행에 자동 포함하지 않는다.
- Windows Git Bash 우선. 사용자에게 보이는 한국어 문서는 humanize-korean 관점으로 검토한다.

## Review Focus

- 저장된 빈 JS 코드와 언어 생략 초안에 새 HTML 기본값을 잘못 적용하는 경우: 기존 작업을 유지한다. Task 3 검사.
- full HTML의 head 속성·module script 순서·문자열 안의 태그 표현: 실행·정렬 모두 원문 의미를 보존한다. Task 2·4 검사.
- 단원 전환과 UI 언어 전환 중 늦게 끝난 검사·정렬·iframe 메시지: 현재 코드만 적용하고 언어 전환만으로 iframe을 교체하지 않는다. Task 3·4 검사.
- 힌트·해설·다음 단계·참고 설명을 열다가 사용자 코드가 교체되는 경우: 읽기는 변경하지 않고 명시적 불러오기만 확인·Undo와 함께 적용한다. Task 5 검사.
- 로드맵의 ‘개선 예정’을 사용자 학습 진도로 해석하거나 기존 강의를 숨기는 경우: 구현 상태와 학습 진도를 구별하고 기존 링크를 유지한다. Task 7 검사.

## 시작점과 변경 파일

기존 구현은 중단 상태다. L04와 학습 오류 수정은 완료했으며 재실행하지 않는다. P01은 `7ec59f93..2b6306d5`의 독립 검토만 남아 있다. 이후 문서 커밋을 이 검토 범위에 섞지 않는다. 기존 `tasks/`와 HTML 최소 지원 설계를 보존한다. 이 계획은 기존 HTML/P04에 표준 모듈·문서 내부 정렬·학습 콘텐츠·전체 로드맵을 추가한 후속 계획이다.

| 영역      | 주요 파일과 책임                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 생성·정렬 | `scripts/format-generated.mjs`, `scripts/example-presentation.mjs`, 다섯 `generate-*-examples.mjs`, `build-curricula.mjs`, `companion-guidance.mjs`: 최종 형식 생성과 의미·원본 보존 |
| HTML 처리 | 새 `src/shared/htmlSource.ts`: 실행을 일으키지 않는 HTML 파싱과 source span. 새 `src/preview/html-document.ts`: 안전한 문서 조립                                                     |
| 모듈      | 새 `scripts/build-three-preview.mjs`, `src/preview/three-core-entry.ts`, `three-controls-entry.ts`: core·addon 빌드. 새 `src/preview/html-runtime.ts`: bootstrap·상태·콘솔           |
| 편집·저장 | `src/editor/CodeEditor.tsx`, `monaco.ts`, 새 `formatCode.ts`, `src/shared/drafts.ts`, `backup.ts`, `src/app/Workspace.tsx`: 언어·정렬·기존 초안 호환                                 |
| 실행 UI   | `src/preview/Preview.tsx`, 새 `ConsoleOutput.tsx`: 실행 종류·오류·출력과 수명 관리                                                                                                   |
| 학습 자료 | 새 `content/learning/threejs.json`, `content/locales/en/learning/threejs.json`, `content/learning/threejs-roadmap.json`: 단계·API·전체 목록 원본                                     |
| 학습 화면 | 새 `src/app/learningContent.ts`, `LessonLearning.tsx`, `SeriesRoadmap.tsx`; 기존 `PracticeGuide.tsx`, `LearningNavigator.tsx`, `curriculum.ts`: 선택적 학습 자료 연결                |
| 검증      | 기존 `tests/*.test.mjs`와 `tests/browser` 패턴을 사용. 새 전용 Node 검사와 실제 브라우저 검증 추가                                                                                   |

## Task 1: 포맷 기반의 미완료 작업 마무리

이 단계는 기존 계획을 재사용하는 선행 묶음이다. P01 검토, P02 생성기 통합, P03 전체 정렬을 각각 독립 변경·검토 단위로 수행한다. 한 작업으로 합쳐 검토하지 않는다.

**Files:** P01의 7개 변경 파일 검토. Modify: `scripts/example-presentation.mjs`, `scripts/companion-guidance.mjs`, `scripts/build-example-readings.mjs`, `scripts/build-curricula.mjs`, `scripts/generate-foundations-examples.mjs`, `generate-framework-examples.mjs`, `generate-graphics-examples.mjs`, `generate-gpu-examples.mjs`, `generate-engineering-examples.mjs`. Create: `scripts/format-generated.mjs`, `.gitattributes`. Test: `tests/formatter-config.test.mjs`, `example-presentation-helper.test.mjs`, `companions.test.mjs` 및 관련 presentation 검사.

**Interfaces:** `formatGeneratedText(file: string, text: string): Promise<string>`. `writeGeneratedFile`, `localizeExampleSource`, `writeEnglishReadingSource`, `writeCompanionGuidance`를 async로 전환한다. Buffer는 writer에서 원문 보존한다.

핵심 helper 검사는 다음 조건을 포함한다. 지원하지 않는 입력은 byte 변경 없이 보존하고, 지원 입력은 정렬 후 다시 정렬해도 같다.

```js
assert.equal(await formatGeneratedText('sample.wat', '(module)\r\n'), '(module)\r\n')
const once = await formatGeneratedText('sample.js', 'const count=1;')
assert.equal(await formatGeneratedText('sample.js', once), once)
await assert.rejects(() => formatGeneratedText('broken.js', 'const ='), /broken\.js/)
```

- [ ] P01의 기존 보고서·검증 증거와 고정 범위를 독립 검토하고 실제 결함만 수정한다. 완료한 설치·양 Node 대표 검사를 이유 없이 반복하지 않는다.
- [ ] helper 검사에 CLI와 같은 결과, 멱등, 비지원 WAT 원문 보존, 파싱 오류의 파일명 포함, Svelte tagged literal 보존을 추가하고 실패를 확인한다.
- [ ] 공통 옵션과 Svelte adapter를 helper에 연결하고 모든 호출자에 await를 전파한다. 영어 주석 위치 번역은 정렬 전에 수행한다. engineering의 files object는 먼저 정렬하고 같은 문자열을 디스크와 preview에 쓴다.
- [ ] companion의 originalSha256/originalByteSha256와 과거 sourceChange 증거를 보존한다. 변경 전 source와 해시, 변경 후 해시, 의미 비교 결과를 migration record로 남긴다. shallow checkout에서도 원본 검증이 가능하게 하고 locator·clock 검사를 AST/API·순서 계약으로 유지한다.
- [ ] foundations→framework→graphics→gpu→engineering→수동 reading 순서로 생성한다. JS/TS AST·리터럴·주석과 Svelte/HTML 공백 의미를 비교하고 두 번째 생성 hash가 같은지 확인한다. 지원 파일 전체 정렬은 이 검증 뒤 별도 커밋으로 수행한다.
- [ ] `.gitattributes`는 지원 확장자에만 `text eol=lf`를 지정한다. 전체 `* text=auto`나 사용자 Git config 변경은 하지 않는다. sourceHash는 실제 원문 기준으로 갱신하고 알고리즘을 바꾸지 않는다.
- [ ] `pnpm format:check`, `pnpm test`, `pnpm build`, `pnpm check:deploy`와 관련 생성·번역 검사를 통과시킨다. 포맷·생성기·migration 변경을 검토 가능한 커밋으로 나눈다.

## Task 2: HTML 문서와 표준 Three.js 모듈 실행

**Files:** Create: `src/shared/htmlSource.ts`, `src/preview/html-document.ts`, `html-runtime.ts`, `three-core-entry.ts`, `three-controls-entry.ts`, `scripts/build-three-preview.mjs`, `tests/html-source.test.mjs`, `tests/html-preview.test.mjs`. Modify: `scripts/build-preview.mjs`, `package.json`, `pnpm-lock.yaml` 및 generated runtime 산출 경로의 ignore. 기존 JS runtime은 유지한다.

**Interfaces:** `RuntimeProfile = 'legacy' | 'html' | 'threejs'`; `PreviewInput = { code: string; kind: 'javascript' | 'html'; profile: RuntimeProfile }`. `parseHtmlSource(source: string): HtmlSourceInfo`는 head 삽입 위치와 inline script/style의 content span·type·src 유무를 반환한다. `createHtmlPreviewDocument(source, token, locale, modules): string`은 완전한 srcdoc을 만든다. `modules`는 core와 OrbitControls의 사이트 소유 소스 문자열이다.

`HtmlSourceInfo`는 `{ headInsertOffset: number | null; blocks: { tag: 'script' | 'style'; start: number; end: number; type: string | null; src: string | null }[] }`로 정한다. start/end는 본문의 문자열 offset이며 tag 경계를 포함하지 않는다. 실제 head가 없으면 null을 반환하고 조립기가 fragment를 처리한다. `PreviewInput`과 `RuntimeProfile`은 새 `src/preview/types.ts`에서 공유한다.

```js
const html = '<html><head data-head="keep"><script type="module">const n=1;</script></head><body></body></html>'
const parsed = parseHtmlSource(html)
assert.equal(html.slice(parsed.blocks[0].start, parsed.blocks[0].end), 'const n=1;')
assert.equal(parsed.headInsertOffset, html.indexOf('><script') + 1)
```

- [ ] 구현 시작 시 격리된 브라우저에서 두 ESM을 blob/import map으로 공급하는 최소 fixture를 만든다. core와 addon이 같은 인스턴스를 쓰고 외부 네트워크 없이 표준 import가 실행되는지 확인한다. 실패하면 이 작업의 대안을 기록한 뒤 다음 작업을 시작한다.
- [ ] HTML parser는 DOM이나 네트워크를 실행하지 않고 source 위치를 제공하는 패키지를 선택·고정한다. `parseHtmlSource`의 full document·fragment·malformed·head 속성·script 안의 태그 문자열 검사부터 작성한다. 단순 prefix의 알려진 head 속성 유실을 회귀 fixture로 사용한다.
- [ ] bootstrap과 import map을 사용자 module script보다 먼저 설치하되 html/head/body 속성·lang·title·meta·사용자 script 순서·CSS 의미를 보존한다. 부모 DOMParser와 정규식 경계 판정은 쓰지 않는다.
- [ ] 오류 후 ready 억제, DOMContentLoaded 기반 상태, dispose ACK, blob 해제, 제한된 콘솔 메시지를 구현한다. 부모/source/token 계약과 CSP를 유지한다. 콘솔은 200개·항목당 4,000자이며 순환 객체를 안전하게 요약한다.
- [ ] `node --test tests/html-source.test.mjs tests/html-preview.test.mjs tests/preview-document.test.mjs tests/runtime.test.mjs`를 통과시키고 실제 Chromium에서 정상 import·미지원 import·사용자 import map 충돌·error/rejection·통신 차단·재실행을 검증한다. 통신 차단 실패를 잡기 위해 frame 코드가 외부 URL을 요청하는 fixture도 실행한다.
- [ ] 검증한 모듈/파서 선택과 문서 보존 근거를 기록하고 이 실행 기반만 커밋한다.

## Task 3: HTML 편집·저장·기존 초안 호환

**Files:** Modify: `src/shared/drafts.ts`, `backup.ts`, `src/app/curriculum.ts`, `Workspace.tsx`, `src/editor/monaco.ts`, `CodeEditor.tsx`, `src/preview/Preview.tsx`, `src/i18n/messages.ts`. Create: `src/preview/ConsoleOutput.tsx`, `tests/browser/threejs-learning.js`, `threejs-learning.html`, `scripts/check-threejs-browser.mjs`. Test: `tests/drafts.test.mjs`, `backup.test.mjs`, `tests/browser/workspace.js`.

**Interfaces:** `CodeLanguage = 'javascript' | 'typescript' | 'html'`. `Unit.sourceLanguage?: CodeLanguage`, `Unit.runtimeProfile?: RuntimeProfile`; 생략하면 기존 JS/legacy로 해석한다. `load(id, original, language = 'javascript')`, `begin(id, original, locale, language = 'javascript')`, `restoreCode(draft, original, language = 'javascript')`로 기존 호출과 호환을 유지한다. `Preview`는 Task 2의 `PreviewInput`을 받는다.

```js
assert.equal(isDraft({ version: 1, code: '', notes: '기록', updatedAt: '', language: 'html' }), true)
assert.equal(isDraft({ version: 1, code: '', notes: '기록', updatedAt: '' }), true)
const restored = restoreCode({ version: 1, code: 'old', notes: 'keep', updatedAt: '', progress: 'completed' }, '<h1>Hi</h1>', 'html')
assert.equal(restored.language, 'html')
assert.equal(restored.notes, 'keep')
assert.equal(restored.progress, 'completed')
```

- [ ] 새 HTML 기본값, 저장된 언어 생략 JS, 빈 문자열, Unicode, 기존 backup v1/2/3, snapshot 읽기·쓰기 실패를 기존 storage fake로 검사한다. 코드·notes·progress가 입력대로 남는지 assert한다.
- [ ] HTML worker와 .html URI, 미저장 상태의 기본 언어, HTML 원문 compile 경로를 구현한다. HTML을 타입 검사 완료로 표시하지 않는다. 언어 선택은 문자열을 바꾸지 않는다.
- [ ] Workspace 실행 입력을 `PreviewInput`으로 바꾸고 source/language가 현재 값과 일치하는 compile만 적용한다. JS/TS는 기존 mount, HTML은 단원의 profile에 맞춰 실행한다. Preview 재생성 조건에 kind/profile을 넣고 locale만으로는 재생성하지 않는다.
- [ ] 오류·console을 텍스트로 표시한다. 위조 메시지·이전 frame·과도한 출력을 걸러낸다. WebGL2 미지원 시 본문·코드는 읽을 수 있게 두고 실행 제한을 안내한다.
- [ ] 전용 브라우저 runner는 자신이 시작한 server/browser만 관리하고 유한 timeout과 finally로 종료한다. `node scripts/check-threejs-browser.mjs --case storage`로 저장·reload·backup 왕복·언어 전환·기존 JS/TS를 확인한다. `--case runtime`은 Task 2의 브라우저 fixture도 실행한다.
- [ ] 기존 Monaco Canceled의 dispose stack을 재현해 원인을 수정한다. global rejection 무시는 금지한다. `node --test tests/drafts.test.mjs tests/backup.test.mjs`와 `pnpm typecheck`를 통과시키고 호환 변경을 커밋한다.

## Task 4: HTML 내부까지 명시적으로 정렬

**Files:** Create: `src/editor/formatCode.ts`, `tests/editor-format.test.mjs`. Modify: `CodeEditor.tsx`, `monaco.ts`, `messages.ts`, `tests/browser/threejs-learning.js`.

**Interfaces:** `formatCode(code: string, language: CodeLanguage): Promise<string>`. Task 2의 `parseHtmlSource`를 공유하고 standalone parser만 브라우저에 포함한다. JS는 babel, TS는 typescript, HTML은 html, style은 css, importmap은 json을 쓴다. Svelte plugin은 브라우저에 포함하지 않는다.

```js
const input = '<script type="module">const label=html`<b  id="x">Keep  spaces</b>`;</script><style>.a{color:red;}</style>'
const output = await formatCode(input, 'html')
assert.ok(output.includes('html`<b  id="x">Keep  spaces</b>`'))
assert.ok(output.includes('color: red'))
assert.equal(await formatCode(output, 'html'), output)
await assert.rejects(() => formatCode('<script>const =</script>', 'html'))
```

- [ ] HTML 내부 module JS/style, tagged HTML/CSS/GLSL 문자열, pre/textarea, 알 수 없는 script MIME, script src와 inline 본문 판정, 한 블록의 parse 실패를 fixture로 만든다. 성공 시 의미 보존·멱등, 실패 시 원문 유지를 검사한다.
- [ ] content span을 뒤에서부터 치환하고 마지막에 HTML 바깥 구조를 공통 off 설정으로 정렬한다. 전체가 성공하기 전에는 편집기에 적용하지 않는다. JS/TS 단독 편집에도 같은 공통 옵션을 쓴다.
- [ ] 버튼과 Monaco provider를 같은 함수에 연결한다. HTML 기본 provider 중복을 막는다. model URI/version/unit/language를 대조해 늦은 응답을 버린다. `executeEdits`와 undo stop으로 한 번 Undo를 보장한다.
- [ ] `node --test tests/editor-format.test.mjs tests/formatter-config.test.mjs`, `node scripts/check-threejs-browser.mjs --case format`으로 정렬·실패·Undo·도중 입력·전환·같은 결과의 저장 억제를 확인한다.
- [ ] `pnpm typecheck`와 변경 파일의 format check 후 커밋한다.

## Task 5: 학습 자료와 단계·힌트·API 표시

사용자 실행 지시에 따라 본문·코드·실행 결과를 같은 작업 화면에 통합한다. 기존 inline DocumentDialog와 Workspace 중첩 분할을 점검하고 화면 구조를 먼저 정한다. 데스크톱은 세 영역을 함께 참조하고 좁은 화면은 model·iframe·필기 상태를 보존하는 화면 내 전환을 제공한다. `src/app/App.tsx`, `DocumentDialog.tsx`, `Workspace.tsx`, `styles.css`를 이 작업 범위에 포함한다. 큰 컴포넌트에 책임을 더 쌓지 말고 필요하면 `LearningWorkspace.tsx`로 배치 책임만 분리한다. 독립 브라우저 검증으로 320/768/1024/1440 너비, 키보드 이동, 읽는 동안의 코드·실행 상태 보존을 확인한다.

**Files:** Create: `src/app/learningContent.ts`, `LessonLearning.tsx`, `content/learning/threejs.json`, `content/locales/en/learning/threejs.json`, `tests/learning-content.test.mjs`. Modify: `PracticeGuide.tsx`, `Workspace.tsx`, `styles.css`, `scripts/build-curricula.mjs`, `scripts/check-translations.mjs`, 기존 번역 hash helper와 호출 지점.

**Interfaces:** `LessonLearningData = { unitId, prerequisiteIds: string[], introduction: string, steps: LearningStep[], apiIds: string[] }`. `LearningStep = { id, title, explanation, starterPath, expected, hints: string[], solutionPath, questions: string[] }`. `ApiReference = { id, symbol, description, parameters: {name, type, description, defaultValue?}[], result, cautions: string[], example, sourceUrl, packageVersion, checkedAt }`. `getLessonLearning(unitId, locale)`은 자료가 없는 단원에 null을 반환한다. `onLoadExample({ code, language: 'html' })`만 명시적 코드 교체의 진입점으로 사용한다.

위에서 타입을 생략한 scalar 필드는 모두 string이고 defaultValue만 선택 사항이다. `getLessonLearning(unitId: string, locale: Locale): LessonLearningData | null`, `getApiReference(id: string, locale: Locale): ApiReference | null`을 제공한다. 저장 형식은 `{ lessons: LessonLearningData[], apis: ApiReference[] }`이며 영어 overlay에 기존 방식의 sourceHash를 추가한다. 코드 path를 읽는 부분은 브라우저 raw glob과 Node 파일 읽기 어댑터로 나누고 자료 검증 규칙은 공유한다.

```js
assert.equal(getLessonLearning('html-step-02', 'ko'), null)
assert.equal(getApiReference('missing-api', 'ko'), null)
assert.equal(getLessonLearning('threejs-01', 'ko').unitId, 'threejs-01')
```

- [ ] 중복 step/API ID, 알 수 없는 API·선수 단원·코드 경로, 번역 누락·sourceHash 불일치를 거부하는 작은 fixture 검사를 만든다. 기존 단원은 null을 받아 기존 guide를 사용하는지 확인한다.
- [ ] 새 필드는 선택 사항으로 읽고 같은 자료에서 화면과 Markdown을 생성한다. 기존 수동 예제와 companion provenance를 유지한다. 원문을 복제해 이중 관리하지 않는다.
- [ ] 단계·힌트·해설·API를 읽는 동작은 코드를 바꾸지 않는다. 명시적 예제 불러오기는 확인 후 반영하며 한 번 Undo와 notes/progress 유지를 보장한다. 편집 이력을 통해 변경하고 단순 setValue로 이력을 지우지 않는다.
- [ ] `node --test tests/learning-content.test.mjs tests/practice-guide.test.mjs tests/curricula.test.mjs`, `node scripts/check-threejs-browser.mjs --case learning`으로 읽기 중 코드 보존·불러오기 취소/확인/Undo·내부 선수 링크·키보드 조작을 확인한다.
- [ ] `pnpm check:translations --complete`를 통과시키고 학습 화면과 검증용 최소 자료를 커밋한다. 실제 강의 완성은 Task 6에서 다룬다.

## Task 6: 첫 4개 단원 순차 완성

**Files:** Modify: `content/curricula/threejs.json`, `content/examples/threejs.json`, `content/learning/threejs.json`, 대응하는 `content/locales/en`, `scripts/generate-graphics-examples.mjs`, `src/app/curriculum.ts`. Create: 각 대상 `src/labs/<id>/example.html`과 `steps/<step-id>.html`, `solutions/<step-id>.html`. 기존 `example.js`는 저장된 JS와 기존 예제 참조용으로 남긴다. Test: `tests/learning-content.test.mjs`, `graphics-presentation.test.mjs`, `tests/browser/threejs-learning.js`.

**Interfaces:** 대상 ID는 `threejs-01`, `threejs-step-02`, `threejs-step-03`, `threejs-step-04`다. HTML source는 raw glob으로 읽고 metadata의 sourceLanguage/runtimeProfile로 기본값을 정한다. Task 5의 자료 구조를 사용하며 별도 schema를 만들지 않는다.

- [ ] `threejs-01`의 모든 필수 과제를 설계 표에 대조한다. 학습 API·개념·오류 복구에 내부 설명이 있는지 검사하고 현재 부족한 내용을 기록한다.
- [ ] 첫 강의에 canvas→cube→animation→local/world 단계, 실행 가능한 시작 코드, 힌트·해설·API·내부 기초 링크를 양언어로 작성한다. HTML output과 input은 HTML에 직접 쓰고 외부 프로젝트 요구를 제거한다.
- [ ] `node scripts/check-threejs-browser.mjs --case lesson-01`로 각 단계와 부모 Y축 회전 0/PI÷2를 실행한다. 부모 원점·자식 (2,0,0)의 고정 fixture에서는 world가 (2,0,0)→(0,0,-2)이며 허용 오차는 1e-6이다. 다른 배치의 교재 예제와 혼동하지 않고 기대값을 명시한다. 화면·값·설명을 검토한 뒤 첫 강의를 커밋한다.
- [ ] 같은 계약으로 02→03→04를 한 강의씩 만든다. 02는 CSS 너비/높이와 aspect·buffer, 03은 FOV/거리와 clipping, 04는 회전 중심과 world 좌표를 검증한다. 기기 의존 pixel 비율을 고정값으로 가정하지 않고 교재에서 설정한 DPR을 쓴다.
- [ ] `node scripts/check-threejs-browser.mjs --case lessons-02-04`로 ko/en을 확인한다. 수치 조건과 화면을 함께 확인하고 외부 도구 없이 과제를 수행한 과정을 기록한다. 초기 예제를 보는 것만으로 검증을 끝내지 않는다.
- [ ] `pnpm build:curricula`, 대상 generator 재실행, `pnpm check:curricula`, `pnpm check:translations --complete`, 관련 presentation 검사를 실행한다. 두 번째 생성에 차이가 없는지 확인하고 강의별로 커밋한다.

## Task 7: 사이트에 후속 24개 단원 목록 표시

**Files:** Create: `content/learning/threejs-roadmap.json`, `src/app/SeriesRoadmap.tsx`, `tests/learning-roadmap.test.mjs`. Modify: `LearningNavigator.tsx`, `LessonLearning.tsx`, `learningContent.ts`, `messages.ts`, 양언어 학습 자료, `scripts/build-curricula.mjs`.

**Interfaces:** `RoadmapEntry = { unitId: string, prerequisiteIds: string[], topics: string[], outcome: string, requiredCapabilities: string[], readiness: 'planned' | 'verified' }`. readiness는 제품의 실습 지원 상태이며 Draft.progress로 계산하지 않는다. 번역문은 기존 locale overlay 방식으로 관리한다.

```js
assert.equal(entries.length, 28)
assert.equal(new Set(entries.map(entry => entry.unitId)).size, 28)
assert.equal(entries[13].unitId, 'threejs-02')
assert.equal(entries[27].unitId, 'threejs-03')
assert.equal(entries.slice(4).every(entry => entry.readiness === 'planned'), true)
```

- [ ] 설계에 첨부한 24개 항목을 모두 기존 ID와 연결한다. 선수 참조에서 자기 자신과 알 수 없는 ID를 거부하고 순서와 28개 ID의 유일성을 검사한다. `threejs-02`는 14번, `threejs-03`은 28번임을 명시적으로 assert한다.
- [ ] 01~04는 Task 6 검증 완료 후에만 verified로 바꾸고 05~28은 planned로 유지한다. 학습자의 완료 상태를 바꿔도 readiness가 달라지지 않는지 검사한다.
- [ ] 기존 시리즈 학습 계획과 04번 단원 말미에 목록을 연결한다. 각 행에서 기존 강의로 이동할 수 있고 개선 예정이라는 이유로 링크를 막지 않는다. ‘개선 예정’의 뜻을 양언어로 설명한다.
- [ ] `node --test tests/learning-roadmap.test.mjs tests/curricula.test.mjs`, `node scripts/check-threejs-browser.mjs --case roadmap`으로 전체 28행·후속 24개·14/28의 기존 ID·기존 강의 이동·돌아온 후 draft 보존을 확인한다.
- [ ] 생성 문서와 사이트 목록의 일치, 번역 freshness, 키보드 조작을 확인하고 커밋한다.

## Task 8: 통합·CI·완료 판정

**Files:** Modify: `.github/workflows/ci.yml`, `tests/browser/threejs-learning.js`, 필요한 공개 안내 문서. 별개의 새 기능은 추가하지 않는다.

**Interfaces:** `node scripts/check-threejs-browser.mjs --case all`은 Task 3~7의 대표 계약을 한 번씩 실행하고 유한 timeout·소유 process 종료·결과 artifact를 기록한다. 같은 코드의 기존 증거는 재사용한다.

- [ ] CI에 `pnpm format:check`를 추가한다. 생성물을 일괄 ignore해 검사를 통과시키지 않는다.
- [ ] 최종 코드에서 `pnpm format:check`, `pnpm test`, `pnpm build`, `pnpm check:deploy`를 확인한다. build에 포함된 typecheck/examples/curricula/translations를 같은 HEAD에서 중복 실행하지 않는다.
- [ ] `node scripts/check-threejs-browser.mjs --case all`로 ko/en·너비 390/1440·기존 JS/TS·HTML 실행·정렬 Undo·저장/backup·locale 보존·후속 목록을 확인한다. Chromium 이외 브라우저를 검증하지 않았다면 범위를 명시한다.
- [ ] 학습 검토에서 지정한 기초 지식을 가진 사람이 외부 문서 없이 4개 단원의 과제와 설명 질문을 마칠 수 있는지 확인한다. 대리 교재 검토와 실제 학습자 평가를 구별해 보고한다.
- [ ] 최종 차이를 독립 검토해 저장 호환·CSP·정렬의 의미 보존·재생성·학습 내용을 확인한다. 구현한 4개 단원, 목록을 준비한 24개 단원, 장래 후보를 구분해 보고한다. 커밋 후 자동 push/deploy는 하지 않는다.

## 계획 자체 점검

설계의 HTML·모듈·격리는 Task 2, 저장 호환과 console은 Task 3, 정렬은 Task 4, 교재 계약과 참고는 Task 5, 4개 강의는 Task 6, 추가 요청한 전체 목록은 Task 7, CI와 통합은 Task 8에 배정했다. 기존 P01~P03의 남은 작업은 Task 1로 이어받았다. 후속 24개 단원 본문 개편·자산 업로드·다중 파일 기능은 이번 구현 범위에 섞지 않았다.

공개 범위와 입력 계약을 정한 계획이며 실행하지 않은 검사를 통과한 것으로 취급하지 않는다. 모듈 공급의 선행 검증이 실패하면 Task 2에서 설계를 수정하고 그 결과를 받는 Task 3 이후 작업도 갱신한다.
