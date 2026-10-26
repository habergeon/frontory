# Frontory 한국어·영어 공통 기능 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 학습 기록을 유지하면서 한국어·영어 화면과 대표 강의 네 개의 공개 문서→실습→필기→백업 흐름을 제공한다.

**Architecture:** 한국어 URL과 학습 ID는 유지하고 영어 경로에 `/en/`을 추가한다. React Context와 순수 메시지 사전을 사용하며 콘텐츠는 안정 ID에 연결된 번역 데이터에서 생성한다. 예제 알고리즘·저장 데이터는 공유하고 실행 중 iframe의 언어는 다음 실행에 적용한다.

**Tech Stack:** 기존 React·TypeScript·Vite·Node 테스트·Cloudflare Pages. 새 runtime dependency 없음. Node `>=22.18.0`, pnpm `10.34.5` 유지.

**Spec:** [승인된 설계](../specs/2026-10-22-ko-en-design.md)

## Global Constraints

- 최종 범위는 23개 시리즈·644개 학습 단위다. 이 계획의 네 강의를 전체 완료로 보고하지 않는다.
- 대표 단위 ID는 `javascript-step-02`, `css-step-04`, `react-step-03`, `gsap-step-02`다.
- 지원 언어는 `ko`, `en`이며 URL이 결정한다. `/`는 한국어, `/en/`은 영어다. 자동 언어 redirect와 별도 locale 저장 key를 만들지 않는다.
- 기존 `web-gl-study:unit:v1:<id>`, `web-gl-study:all:v1`, 백업 v1/v2/v3, code·notes·progress·ISO 시간은 유지한다. `Draft.language`는 JS/TS다.
- 언어 전환으로 Workspace·Monaco·실행 iframe을 재마운트하거나 필기·코드를 저장하지 않는다. 예제 언어는 다음 코드 반영 또는 명시적 재실행에 적용한다.
- 미번역 영어 공개 URL을 한국어 본문으로 채우지 않는다. 없는 영어 주소는 404다. 영어 실습 ID가 미제공이면 영어 안내와 한국어 원문 링크를 제공한다.
- 인코딩 fixture·계산 결과·코드 식별자·URL·타입 검사 지시문·compiler 원문 오류는 보존한다.
- 기존 한국어 광고 경로 네 개만 유지하며 영어 페이지에는 광고 태그를 추가하지 않는다. AdSense는 검토 요청 준비 상태다.
- Git Bash 우선. GitHub 작업은 `habergeon` switch·identity 검증 후 실행한다. 기존 계정·원격·작성자 설정은 바꾸지 않는다.
- 서브에이전트는 `gpt-6.1-sol`, `medium`. 공용 모듈에는 단일 작성자를 배정한다. 관련 없는 리팩터링은 하지 않는다.

## Review Focus

1. 홈이 644개 진도를 먼저 읽은 뒤 영어 단위를 열어도 새 필기 템플릿이 한국어로 고정되지 않아야 한다 — Task 7.
2. 저장 차단·손상 기록·의도적으로 빈 필기가 있어도 언어 전환이 복구나 덮어쓰기를 유발하지 않아야 한다 — Tasks 7, 17.
3. 한국어 문서 요청 뒤 영어 요청이 먼저 끝나도 늦은 한국어 응답이 현재 화면을 덮지 않아야 한다 — Task 5.
4. 입력 중인 TypeScript와 마지막 정상 실행 화면이 언어 전환 후에도 유지되어야 한다 — Tasks 10, 12, 17.
5. 번역 없는 주소·slash 없는 주소·뒤로 가기를 dev 서버와 실제 정적 빌드에서 일관되게 처리해야 한다 — Tasks 14, 15, 17.

## 파일과 공통 계약

| 파일                                           | 책임                                                                              |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `src/i18n/locale.ts`                           | `Locale`, 언어 판별과 공개·실습 경로 생성                                         |
| `src/i18n/messages.ts`                         | ko/en UI·문서 heading 메시지와 인자형                                             |
| `src/i18n/LocaleProvider.tsx`                  | 현재 URL 언어와 전환, popstate 동기화                                             |
| `scripts/locale-content.mjs`                   | 영어 번역 원본의 필드·hash·ID 검증과 결합                                         |
| `content/locales/en/manifest.json`             | `publishedUnitIds: string[]`; 검증된 영어 공개 단위 집합                          |
| `content/locales/en/series.json`               | 안정 시리즈 ID별 제목·선수 지식·단계 번역                                         |
| `content/locales/en/curricula/<seriesId>.json` | 시리즈 산문·단위 산문 번역; 알고리즘·경로 복제 금지                               |
| `src/app/catalog.en.json`                      | 생성된 영어 표시 카탈로그. 직접 편집 금지                                         |
| `docs/en/…`                                    | 원래 `/docs/` 뒤 경로를 유지하는 영어 Markdown. 생성·수동 관리 여부를 원문과 맞춤 |
| `src/app/documents.ts`                         | locale·docPath별 비동기 로딩. 앱의 문서 창과 가이드가 공유                        |

`localeFromPath(pathname: string): Locale | null`은 `/en`, `/en/`, `/en/…`에서 `en`, 기존 한국어 앱·공개 경로에서 `ko`, 지원하지 않는 경로에서 `null`을 반환한다. 경로의 유효한 문서 존재 여부는 공개 생성물 맵에서 따로 확인한다. `localizePath(locale: Locale, koPath: string): string`은 한국어 절대 경로에 언어 접두어를 붙인다. 이미 영어인 경로를 중복 처리하지 않도록 호출부는 한국어 정규 경로를 전달한다. `practicePath(locale: Locale, id: string): string`은 `/#id` 또는 `/en/#id`다.

메시지는 문장 단위 key를 사용한다. `MessageParams`는 key마다 필요한 인자를 정의하고 `message<K extends keyof MessageParams>(locale: Locale, key: K, params: MessageParams[K]): string`으로 호출한다. 인자가 없는 문장은 `{}`다. `headings[locale]`는 가이드 세 영역과 빈 기록 서식의 제목을 포함한다. Node 생성기는 `.ts` 확장자로 순수 모듈을 가져오고 React 모듈은 가져오지 않는다.

번역 레코드는 `{ sourceHash: string, values: Record<string, string> }`다. `values`의 key는 `title`, `concepts.0.explanation`처럼 검증된 산문 필드 경로다. ID·day·URL·파일·mode는 허용하지 않는다. 단위 레코드는 안정 ID로 묶고 시리즈 레코드는 `series` key로 둔다. `sourceHash`는 원본 객체의 key를 정렬한 JSON의 SHA-256으로 계산한다. 배열의 순서는 유지한다. 문자열 내부 코드·숫자는 번역 검토 시 대조한다.

`readEnglishContent({ complete: boolean }): { catalog, documents, publishedUnitIds }`는 승인된 ID·필드·hash·배열 길이를 검사하고 영어 데이터를 결합한다. `complete: false`에서는 manifest에 포함된 단위만 요구하고 `true`에서는 23개 시리즈와 644개 단위 전체를 요구한다. 알 수 없는 key나 오래된 hash를 한국어 fallback으로 덮지 않고 실패한다. WebGL은 확장 계획의 수동 문서 계약을 따른다.

## 실행 순서

Task 1 → 2 → 3 → 4를 먼저 완료한다. Task 5~8은 파일 소유권을 나눠 조사·테스트를 준비할 수 있지만 공용 인터페이스 변경은 순차 통합한다. Task 16의 안내 원고는 Task 3 뒤에 병렬 작성해 Task 14 전에 완료한다. Task 9~15는 UI·runtime·정적 공개 경로를 연결하고 Task 17~18에서 전체 경로를 검증한다. 브라우저 harness 파일은 Task 9의 첫 실패 검사를 작성할 때 만들고 Task 17에서 전체 검증을 마친다. 생성 파일 변경량은 작업 크기와 구분한다. 번역은 원본 소수 단위씩, 공용 생성기는 한 작성자가 다룬다.

### Task 1: 언어 경로와 메시지 계약

**Files:** Create `src/i18n/locale.ts`, `src/i18n/messages.ts`, `tests/locale.test.mjs`.
**Interfaces:** 위의 `Locale`, `localeFromPath`, `localizePath`, `practicePath`, `message`, `headings`를 제공한다.

- [ ] 경로·메시지 테스트 작성: `assert.equal(practicePath('en','react-step-03'), '/en/#react-step-03')`; 한국어 경로 불변, `/fr/` 거부, 두 사전 key·placeholder 동등성, 0/1/2 개수 문장 검사.
- [ ] `node --test tests/locale.test.mjs` 실행 → 새 모듈 부재로 실패 확인.
- [ ] 순수 함수와 ko/en 메시지 사전 구현. 초기 사전은 현재 UI의 실제 문구만 포함하고 과제 데이터는 넣지 않는다.
- [ ] 같은 테스트와 `pnpm typecheck` → 통과. 범위 파일만 커밋: `feat: define Korean and English locale contracts`.

### Task 2: 번역 원본 검증

**Files:** Create `scripts/locale-content.mjs`, `tests/locale-content.test.mjs`.
**Interfaces:** `readEnglishContent`와 테스트 가능한 `mergeTranslation(source, record): object`, `sourceHash(source): string` 제공. runtime에 `node:fs`를 가져오지 않는다.

- [ ] 테스트 작성: 잘못된 hash·unit ID·`references.0.url` 번역 key·누락된 concept 문자열은 throw, 영어 제목 결합 뒤 원본 `id/day/references.url` 동일, 원본 객체 불변을 검사.
- [ ] `node --test tests/locale-content.test.mjs` → 실패 확인.
- [ ] 허용 산문 필드를 원본 구조에서 열거하고 전체 입력 복사 후 검증된 문자열만 결합. 참조 title은 허용하고 URL은 보존한다. variables의 코드 리터럴은 값을 동일하게 유지할 수 있다.
- [ ] 같은 테스트 → 통과. 커밋: `feat: validate localized learning content`.

### Task 3: 대표 강의 네 개 영어 원고

**Files:** Create `content/locales/en/manifest.json`, `content/locales/en/series.json`, `content/locales/en/curricula/{javascript,css,react,gsap}.json`, `content/locales/en/examples/{javascript,css,react,gsap}.json`. 네 시리즈 원고 작업은 파일별로 나누어 수행한다. examples 파일에는 우선 대표 ID의 영어 `note`를 넣고 Task 13에서 표시 메시지·주석을 보탠다.
**Interfaces:** Tasks 1~2의 번역 레코드; manifest에는 대표 네 ID만 넣는다. 시리즈 소개는 완성하고 미제공 단위를 영어 공개 링크로 만들지 않는다.

- [ ] `node --test tests/locale-content.test.mjs`의 실제 콘텐츠 검증을 추가해 네 ID 누락 상태에서 실패 확인.
- [ ] 네 강의의 모든 산문·변수 설명·실행 범위와 네 시리즈 소개를 번역한다. JavaScript 변환 조건, CSS `244/200/156`, React `1/3`, GSAP 시작·종료 조건을 원문과 대조한다. 코드 블록·URL·실험 입력을 보존한다.
- [ ] 독립 번역 검토에서 예상값과 관찰값, 부정문·지원 범위를 대조하고 지적 반영.
- [ ] 검증 통과 후 시리즈별 원고만 커밋: `docs: translate representative <seriesId> lesson`.

### Task 4: 영어 커리큘럼 생성

**Files:** Modify `scripts/build-curricula.mjs`, `src/app/curriculum.ts`, `tests/curricula.test.mjs`; Create generated `src/app/catalog.en.json`, `docs/en/labs/...`, `docs/en/examples-expanded.md`.
**Interfaces:** Task 2 결과를 기존 생성기에 전달한다. 한국어 catalog 644개와 기존 640개 생성 계약은 유지한다. 영어 catalog에는 번역 공개된 단위와 해당 시리즈·영어 exampleNote를 넣는다. `curriculum.ts`는 `getCatalog(locale: Locale): { series, units: Unit[] }`와 `getLocalizedUnit(locale: Locale, id: string): Unit | null`을 제공한다. source·mode·files는 기존 공통 원본에 연결하며 기존 `units` export는 전체 ID·백업용으로 유지한다.

- [ ] 테스트 작성: 영어 단위 ID 집합이 manifest와 같음, 영어 docPath가 `/docs/en/` 시작, ko 94개 legacy ID·경로 동일, 영어 goal이 번역 outcomes 결합과 같음, 영어 페이지에서 미번역 다음 강의 링크 없음.
- [ ] `node --test tests/curricula.test.mjs` → 영어 생성물 부재로 실패 확인.
- [ ] locale별 문서 템플릿과 표시 카탈로그 생성. `--check`가 양언어 생성물을 검사하도록 확장한다. 한국어 legacy title 검사는 그대로 둔다.
- [ ] `pnpm build:curricula && pnpm check:curricula && node --test tests/curricula.test.mjs` → 통과. 커밋: `feat: generate English learning documents`.

### Task 5: 문서 비동기 로딩

**Files:** Create `src/app/documents.ts`, `src/app/documentLoader.ts`, `tests/documents.test.mjs`; Modify `src/app/curriculum.ts`, `src/app/DocumentDialog.tsx`.
**Interfaces:** 순수 `createDocumentLoader(loaders: Record<string, () => Promise<string>>)`는 `loadDocument(locale: Locale, koDocPath: string): Promise<string>`를 반환한다. `documents.ts`는 Vite lazy glob을 이 factory에 전달하며 Node 테스트는 factory만 import한다. `localizedDocPath(locale, koDocPath): string`은 실제 문서 경로를 반환한다. 호출부는 원래 한국어 정규 경로를 유지한다. cache key는 locale+경로다.

- [ ] 지연 Promise 테스트 작성: ko/en cache와 동시 요청이 섞이지 않음; 같은 요청은 재사용; 실패 후 재시도 가능. 늦은 ko 응답이 en 화면을 덮지 않는 실제 dialog 검사는 Task 17에 둔다.
- [ ] `node --test tests/documents.test.mjs` → 실패 확인.
- [ ] lazy glob과 문서 로더 구현. dialog는 요청별 취소 표식으로 늦은 결과를 무시하고 로딩·실패 안내를 표시한다. 모듈의 모든 Markdown eager import를 제거하되 다음 Task에서 가이드를 연결할 때까지 타입 검사가 깨지지 않도록 함께 통합한다.
- [ ] 테스트와 Task 6 통합 후 `pnpm typecheck` → 통과. 커밋: `feat: load documents by locale on demand`.

### Task 6: 영어 가이드와 문서 링크

**Files:** Modify `src/app/guideContent.ts`, `src/app/PracticeGuide.tsx`, `src/shared/MarkdownView.tsx`, `tests/practice-guide.test.mjs`.
**Interfaces:** `practiceGuide(markdown: string, locale: Locale = 'ko')`가 `headings[locale]`를 사용한다. 가이드도 Task 5 로더를 사용한다.

- [ ] 영어 대표 네 문서에서 `steps/variables/criteria` 비어 있지 않음, headings가 다음 영역에 섞이지 않음, 한국어 644개 기존 검사 통과를 테스트.
- [ ] `node --test tests/practice-guide.test.mjs` → 영어 heading 실패 확인.
- [ ] 언어별 가이드·로딩·없음 안내와 Markdown 상대 링크 해석을 연결한다. 한국어 정규 docPath와 실제 표시 문서 경로를 혼동하지 않는다. 파일 다운로드·외부 링크는 그대로 둔다.
- [ ] 가이드·문서 테스트와 `pnpm typecheck` → 통과. 커밋: `feat: localize practice guides and document navigation`.

### Task 7: 최초 필기와 기존 기록 보존

**Files:** Modify `src/shared/drafts.ts`, `tests/drafts.test.mjs`, `tests/draft-snapshot-scale.test.mjs`; Create `src/i18n/notes.ts`.
**Interfaces:** `notesTemplateFor(locale: Locale): string`; `createDraftStore().begin(id, original, locale): DraftResult`는 실제 학습 시작 때 새 템플릿을 정한다. 기존 `load(id, original)`는 진도 읽기에 계속 사용한다.

- [ ] 테스트 작성: `load`로 홈 진도를 모두 읽은 뒤 `begin(...,'en')`은 영어 새 템플릿; 저장된 빈 notes·한국어 notes·storage 차단 때 memory 초안은 그대로; 언어 전환 전후 storage 문자열과 `updatedAt` 동일.
- [ ] `node --test tests/drafts.test.mjs tests/draft-snapshot-scale.test.mjs` → 새 계약 실패 확인.
- [ ] store 내부에서 미작성 default와 실제 사용자 기록을 구분하고 `begin`이 template을 한 번만 확정하도록 구현. 사용자 수정·실패한 save도 실제 기록으로 본다. 백업 포맷에 locale·초기화 플래그를 넣지 않는다.
- [ ] 기존 손상 데이터 보존·snapshot·빈 값 검사까지 통과. 커밋: `feat: preserve drafts across interface languages`.

### Task 8: 저장·백업 오류의 표시 분리

**Files:** Modify `src/shared/drafts.ts`, `src/shared/backup.ts`, `tests/backup.test.mjs`, `tests/drafts.test.mjs`.
**Interfaces:** `DraftResult.warning`은 `'read-failed' | 'write-failed' | null`. `BackupValidationError`는 `code: 'too-large' | 'invalid-format' | 'invalid-units' | 'invalid-time'`를 가진다. 원문 JSON parse 오류는 유지한다.

- [ ] 테스트 작성: 저장 실패 code와 memory 기록 유지, 10 MiB 초과·중복 ID·잘못된 시간 각각 code 검사, v1/v2/v3 import 결과 동일.
- [ ] 관련 두 테스트 실행 → code 계약 실패 확인.
- [ ] 오류 code를 반환하고 UI에서 번역하도록 변경한다. 예외 원문 details를 버리거나 문자열을 학습 데이터에 저장하지 않는다.
- [ ] `node --test tests/drafts.test.mjs tests/backup.test.mjs tests/archive-expansion.test.mjs` → 통과. Task 10 UI와 통합 커밋: `feat: render storage and backup notices by locale`.

### Task 9: 앱 언어 전환과 홈·탐색

**Files:** Create `src/i18n/LocaleProvider.tsx`; Modify `src/main.tsx`, `src/app/App.tsx`, `src/app/Home.tsx`, `src/app/LearningNavigator.tsx`. 공통 Provider/App과 Home/Navigator 표시 연결은 두 작은 커밋으로 나눈다.
**Interfaces:** `useLocale(): { locale: Locale, setLocale(locale: Locale): void }`. 동일 hash를 유지해 history를 바꾸고 state도 즉시 갱신한다. popstate를 구독한다. 영어 표시 목록은 `catalog.en.json`, 저장 ID는 한국어 전체 catalog를 사용한다.

- [ ] Task 17 브라우저 harness에 전환 검사 추가: 영어 경로·현재 단위 유지, 뒤로 가기, 미제공 영어 단위의 영어 안내·명시적 ko 링크, 영어 0/1/복수 검색 결과.
- [ ] 브라우저에서 현재 언어 control 부재로 실패 기록.
- [ ] Provider와 언어 링크, 홈·탐색 문구·검색·접근성 이름을 연결한다. `Workspace` key에 locale을 넣지 않는다. 기술 ID와 두 언어 분야명을 검색 별칭으로 사용하되 본문 검색은 추가하지 않는다.
- [ ] `pnpm typecheck`와 해당 브라우저 검사 → 통과. 커밋: `feat: switch interface language without resetting study state`.

### Task 10: 편집·필기·백업 UI

**Files:** Modify `src/app/Workspace.tsx`, `src/app/BackupControls.tsx`, `src/editor/CodeEditor.tsx`.
**Interfaces:** Tasks 7~9 사용. editor 상태는 `loading/waiting/invalid/valid/failed`와 count/details로 보관한다. `Compilation`의 code·language·output 의미는 유지한다.

- [ ] 브라우저 검사 추가: TypeScript 입력·선택 탭·notes 미리보기·검사 오류·백업 경고가 열린 채 전환해도 사용자 내용·Monaco 모델·마지막 정상 화면 유지. 날짜는 선택 언어, ISO 저장값은 동일.
- [ ] 현재 한국어 고정 UI에서 검사 실패 확인.
- [ ] 렌더 시 message를 사용하고 Monaco 접근성 이름은 `updateOptions`로 바꾼다. locale을 editor 생성 effect dependency에 넣지 않는다. 최초 workspace에서는 `begin`, 저장·복원은 기존 의미를 유지한다.
- [ ] 타입 검사·저장/백업 테스트·브라우저 검사 → 통과. 커밋: `feat: localize editor notes and backup controls`.

### Task 11: runtime의 예제 언어 계약

**Files:** Modify `src/preview/runtime-entry.ts`, `src/preview/document.ts`, `tests/runtime.test.mjs`, `tests/preview-document.test.mjs`.
**Interfaces:** `start(source: string, token: string, locale: Locale = 'ko')`; `createPreviewDocument(source, token, runtime, locale: Locale = 'ko')`. mount context에 `locale` 추가. 기존 sandbox·CSP·token·dispose 계약 유지.

- [ ] 테스트 작성: 기존 인자 호출은 ko, en 문서의 lang은 en, `</script>` 입력 escape 유지, 구형 mount 실행·cleanup 유지, locale context가 정확히 전달됨.
- [ ] runtime·preview-document 테스트 → 새 locale 계약 실패 확인.
- [ ] locale 값과 앱 소유 mount 오류 문구를 연결한다. 앱 전체 콘텐츠 사전은 iframe에 넣지 않는다. `runtime.generated.js`는 `pnpm prepare:preview`로만 재생성한다.
- [ ] `pnpm prepare:preview && node --test tests/runtime.test.mjs tests/preview-document.test.mjs` → 통과. 커밋: `feat: pass locale to sandbox examples`.

### Task 12: 실행 중 iframe 보존

**Files:** Modify `src/preview/Preview.tsx`, `src/app/Workspace.tsx`.
**Interfaces:** Preview에 `locale` prop을 추가하되 실행 effect dependency는 code·revision을 유지한다. 새 frame 생성 시점의 locale을 캡처하고 현재 frame 언어와 구분한다.

- [ ] 브라우저 검사 작성: iframe `contentWindow`와 예제 입력값이 언어 전환만으로 바뀌지 않음; 다시 실행하면 새 locale 반영; 전환 후 첫 코드 반영도 최신 locale 사용.
- [ ] 기존 locale 없는 preview에서 실패 확인.
- [ ] 바깥 상태·title·오류 안내는 즉시 번역하고 frame 본문의 `lang`은 실제 실행 언어를 유지한다. 언어가 다르면 다음 실행 때 적용된다는 짧은 안내를 표시한다.
- [ ] preview 회귀와 브라우저 검사 통과. 커밋: `feat: preserve running experiments on language switch`.

### Task 13: 대표 예제 안쪽과 영어 읽기용 코드

**Files:** Modify `scripts/generate-foundations-examples.mjs`의 JavaScript·CSS, `scripts/generate-framework-examples.mjs`의 React, `scripts/generate-engineering-examples.mjs`의 GSAP 및 각 대표 `src/labs/<id>/example.js`. 네 예제의 번역 파일은 Task 3의 `content/locales/en/examples/<seriesId>.json`을 사용한다. 각 생성기는 담당자가 순차 수정한다.
**Interfaces:** mount의 `locale` 기본값은 ko. 표시 문구는 해당 예제 안에 ko/en 최소 사전을 두어 다운로드 코드도 독립 실행 가능하게 한다. 영어 주석의 읽기용 원본은 `public/examples-en/<id>/example.js`로 생성하고 편집 원본과 구분한다.

- [ ] 대표 ID별 DOM label·aria·결과 검사를 추가하고 현재 영어 문구 누락으로 실패 확인. JavaScript invalid JSON 복구, CSS `244→200`와 content `156`, React snapshot `1`/updater `3`, GSAP 시작·종료 조건을 검증한다.
- [ ] 알고리즘·fixture·selector를 유지하며 표시 문구를 분리한다. 영어 읽기용 코드 생성은 공통 코드에서 주석만 교체하고 비교 검사로 비주석 토큰이 같은지 확인한다. 생성 대상은 원본 생성기에 적용하며 생성물을 단독 수정하지 않는다.
- [ ] 영어 읽기용 다운로드가 현재 편집값을 바꾸지 않는지 확인한다. 예제별 focused 브라우저 검사·`pnpm check:examples` 통과 후 한 예제씩 커밋: `feat: localize <id> example presentation`.

### Task 14: 양언어 공개 페이지

**Files:** Modify `scripts/search-pages.mjs`, `scripts/social-meta.mjs`, `scripts/search-pages.d.mts`, `tests/search-pages.test.mjs`.
**Interfaces:** 기존 `generateSearchPages(): Map<string,string>` 유지. 내부 page 함수는 locale·대응 번역 존재 여부를 받는다. `homeFallback(locale: Locale = 'ko'): string`, `renderDocument(markdown, docPath, locale: Locale = 'ko'): string`.

- [ ] 테스트 작성: ko 671개 canonical 유지; en 대표 네 경로·안내·목차만 실제 존재; self canonical·상호 hreflang·lang·OG 일치; 없는 영어 문서 미생성; 영어 빈 worksheet만 제거하고 작성 기록 보존; 영어 광고 script 0개.
- [ ] `node --test tests/search-pages.test.mjs` → 영어 생성물 부재로 실패 확인.
- [ ] 초기 HTML·navigation·footer·문서 링크를 locale에 맞춘다. sitemap 수는 실제 공개 집합으로 계산한다. 공유 `/examples/`와 `/examples-en/` 다운로드는 noindex이며 canonical 페이지로 세지 않는다.
- [ ] 검색 테스트·`pnpm build:search` 통과. 커밋: `feat: generate localized public learning pages`.

### Task 15: 영어 홈·개발 서버·404

**Files:** Modify `scripts/build-search.mjs`, `vite.config.ts`, `public/_headers`, `tests/search-pages.test.mjs`.
**Interfaces:** `dist/en/index.html`은 Vite 홈의 해시 자산을 재사용하고 영어 fallback·head를 삽입한다. `dist/en/404.html`은 영어 오류 페이지다. 두 홈은 별도 초기 HTML을 갖는다.

- [ ] 빌드 결과 검사 추가: en HTML의 JS/CSS 자산 실존, en title/description/canonical/JSON-LD, 영어 head에 ko canonical 없음. dev의 `/en/learn/missing/`와 `/en/not-found/`가 404인지 검사.
- [ ] 현재 빌드에서 영어 홈 부재로 실패 확인.
- [ ] 빌드·Vite 경로를 구현하고 docs·locale 원본 변경 시 dev 생성물 cache를 비운다. `/en`은 slash 경로로 영구 redirect한다. 포괄 SPA rewrite는 만들지 않는다. 읽기용 코드 다운로드에 noindex 헤더를 추가한다.
- [ ] `pnpm build && pnpm check:deploy` 및 dev/정적 preview HTTP 검사 → 정상 200, 없는 경로 404, slash 정규화 확인. 커밋: `feat: serve English app entry and localized errors`.

### Task 16: 공통 안내 영어 문서

**Files:** Create `docs/en/about.md`, `docs/en/privacy.md`, `docs/en/learning-workspace.md`, `docs/en/roadmap.md`, `docs/en/examples.md`, `docs/en/labs/README.md`, `content/locales/en/documents.json`; Modify `scripts/locale-content.mjs`. 원고 파일은 두 묶음으로 나누고 validator 변경은 통합 담당자가 맡는다.
**Interfaces:** 원래 문서와 동일한 상대 경로 규칙. 수동 번역 freshness는 `content/locales/en/documents.json`의 `{ [koDocPath]: { sourceHash, translatedPath } }`로 검사하고 Task 2 검증기에 연결한다.

- [ ] 안내 페이지·모달·footer 필수 링크 존재와 원문 hash 검사를 먼저 추가하고 문서 누락 실패 확인.
- [ ] 실제 기능·제한·문의 이메일·AdSense 승인 전 상태를 정확히 번역한다. 설명과 스크립트 범위가 다르지 않게 검토한다. 원문에 없는 법률·승인·성능 주장을 추가하지 않는다.
- [ ] `node --test tests/locale-content.test.mjs tests/frontory.test.mjs tests/search-pages.test.mjs` → 통과. 두 묶음으로 커밋: `docs: add English service and learning guides`.

### Task 17: 실제 브라우저·데이터 왕복 검증

**Files:** Create `tests/browser/i18n.html`, `tests/browser/i18n.js`; 필요시 Modify `tests/browser/vite.config.ts`. 이미 있는 대표 강의 harness의 assertion을 재사용한다.
**Interfaces:** 새로운 UI에서 실제 언어 링크·편집·필기·백업을 조작한다. 앱 내부 함수를 호출해 사용자 흐름을 건너뛰지 않는다.

- [ ] Tasks 9~12의 실패 사례를 재현할 harness를 먼저 작성한다. 저장 성공·차단·손상 JSON·의도적 빈 필기, v1/v2/v3 가져오기, TS 입력 중 전환, code/notes/progress byte 비교를 포함한다.
- [ ] ko→en→ko, 새로고침·뒤로 가기, 공개 문서→실습→공개 문서, 빠른 문서 전환을 실행하고 assertion 전체 통과 확인.
- [ ] 320/375/768/1280px에서 header·긴 버튼·footer·table/code 가로 넘침을 확인한다. keyboard·focus·dialog·aria 이름을 확인하고 필요한 CSS 줄만 수정한다.
- [ ] 결과·환경·스크린샷을 `_workspace/i18n/verification/`에 남긴다. 커밋: `test: cover bilingual study and archive flows`.

### Task 18: 첫 묶음 통합 검토와 인계

**Files:** Modify `docs/search-indexing.md`, `docs/example-verification.md`, `docs/adsense.md`; 검증 코드 지적은 해당 소유 파일에서 수정한다.
**Interfaces:** 다음 확장 계획이 사용할 번역 schema·generator·runtime 계약을 동결한다.

- [ ] 독립 검토자가 spec 준수, 기록 보존, 미번역 fallback, 영어 광고 유입, fixture 변화를 확인하고 필수 지적을 반영한다.
- [ ] `pnpm test && pnpm check:curricula && pnpm build && pnpm check:deploy` → 모두 통과. 생성기 재실행 후 의도하지 않은 diff 없음 확인.
- [ ] 로컬 preview의 영어 네 강의·안내·미존재 경로와 실제 자산을 확인한다. 이 계획만으로 644개 완료·운영 배포 완료를 보고하지 않는다.
- [ ] 변경을 검토 가능한 커밋으로 정리하고 다음 [전체 확장 계획](2026-10-22-ko-en-expansion.md)으로 이어간다. 운영 push는 전체 완료 검증 뒤 수행하며 중간 공개는 별도 요청이 있을 때만 한다.

## 담당과 병렬 실행

주 에이전트가 locale·콘텐츠·저장·runtime·생성기의 계약과 통합을 맡는다. 서브에이전트는 영어 원고, 독립 UI 연결, 공통 모듈을 건드리지 않는 예제 묶음을 맡을 수 있다. 작업자가 같은 파일을 동시에 수정하지 않는다. 각 구현 뒤 별도 검토를 거치고 공용 계약을 바꾸면 영향을 받는 작업자에게 전달한다.

## 자체 검토 기록

설계의 URL·UI·콘텐츠·예제·저장·SEO 요구를 Tasks 1~18에 연결했다. 다섯 Review Focus에는 담당 테스트를 지정했다. `Locale`, message 인자, 번역 record, 문서 경로, draft begin, runtime locale의 이름을 통일했다. Task 5~6은 eager import 제거의 타입 의존성 때문에 함께 통합하며 번역 원고·생성물 검증은 부분 공개 manifest를 기준으로 한다. 전체 공개 수 1,342는 확장 완료 전에는 기대값으로 사용하지 않는다.
