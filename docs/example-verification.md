# 예제 검증 기록

2026-10-21부터 진행한 개발 검증 기록입니다. 각 절의 날짜와 범위를 구분하며 학습자의 과제 완료나 일반적인 성능 우위를 의미하지 않습니다.

## 94개 연결 검증

- 23개 시리즈 · 94개 단위의 원본 JS 모듈과 학습 문서를 연결했습니다.
- `pnpm test`: 27개 통과. 전체 예제 구문, 문서 링크, JSON 백업·복원·실패 보존, 필기 분리, 진행 상태, iframe 오류·비동기 정리, GS 파서 경계 조건을 검사합니다.
- `pnpm build`: 앱 타입 검사, 94개 예제 checkJs 검사, preview 번들, 프로덕션 빌드 통과.
- `pnpm check:deploy`: 정적 파일 크기 검사 통과. 실제 배포는 하지 않았습니다.
- 사용자 학습 기록과 다른 로컬 오리진의 in-app browser에서 94개 단위를 순회하고 각 미리보기의 초기화 완료(실행 중)를 확인했습니다. 모든 조작·완료 조건의 E2E 검증을 의미하지 않습니다. Playwright 예제에서는 테스트 소스 표시까지입니다.

## 추가 동작 검증

- WebGPU compute: 배열 길이 1003 및 1025에서 CPU 기준과 최대 절대 오차 0. workgroup 경계를 벗어난 invocation을 방어하며 마지막 값도 일치했습니다.
- GLSL 03: 의도한 구문 오류를 표시하면서 이전 program을 유지하고 Restore로 정상 compile/link 상태로 복구했습니다.
- Worker 02: copy 후 송신 buffer 유지, transfer 후 byteLength 0, 합계 일치, 의도한 오류 후 새 요청 성공을 확인했습니다.
- WebAssembly 02·03: 실제 작은 WASM 모듈을 Node에서 실행하여 scalar/batch/transform 결과와 JS 기준값 일치, Memory.grow 뒤 이전 view 분리 등을 검증했습니다. 화면의 Memory 실험과 별도 모듈 실행을 구분합니다.
- Svelte 추가 컴포넌트 3개는 Svelte 컴파일러 검사에서 경고 없이 컴파일됐습니다. 별도 Svelte 앱에서 상호작용을 검증하지 않았습니다.
- GS 파서: 소형 binary splat, ASCII GS PLY 변환, 일반 PLY 거부, 잘못된 길이·개수·비유한 값 거부를 자동 테스트했습니다. 기본 생성 데이터의 CPU 투영 화면 초기화를 확인했습니다.
- 검증 중 예상하지 않은 브라우저 콘솔 error는 수집되지 않았습니다. 백그라운드 탭의 rAF 중지로 초기화 표시가 지연되던 문제를 수정하고 회귀 테스트를 추가했습니다.

## 이전 대표 예제 검증 유지

기존 29개 대표 예제 단계에서 React/Vue 버튼, 실행 코드 수정 반영, 구문 오류 후 이전 화면 유지와 복구, 단위별 필기 분리·새로고침 복원, 원본 복원 시 필기 보존을 확인했습니다. 이번 확장에서도 기존 백업·저장 자동 테스트를 통과했습니다.

## 제한 및 미검증

- iframe 파일 선택은 자동화 도구가 filechooser 이벤트를 받지 못해 실제 사용자 파일 선택부터 화면 반영까지 검증하지 못했습니다. 파서 자동 테스트 통과와 이 제한을 구분합니다.
- Playwright 별도 테스트 파일은 문법만 검사했으며 브라우저 테스트 러너로 실행하지 않았습니다. 시각 기준 이미지도 생성하지 않았습니다.
- 모든 예제의 모든 변수 조합, 다른 브라우저·GPU, 장시간 메모리 안정성은 미검증입니다. 숨겨진 탭에서 관찰한 FPS는 성능 비교값으로 사용하지 않습니다.
- GS는 교육용 CPU renderer이며 Spark, 대형 데이터, GPU tile/LOD, 고차 SH, GS picking 검증이 아닙니다.
- 프레임워크 런타임을 함께 번들하므로 초기 다운로드와 iframe 교체 비용은 후속 최적화 대상입니다.
- 공개 배포·원격 push는 진행하지 않았습니다.

## 2026-10-22 대표 강의 보강 검증

React 상태 스냅샷, GSAP 시작값과 목표값, JavaScript 숫자 변환, CSS 박스 모델의 설명을 보강하며 Windows의 HeadlessChrome 151.0.7922.34에서 기존 예제를 실행했습니다. 아래 값은 해당 입력에 대한 확인 기록이며 전체 커리큘럼의 상호작용 검증을 뜻하지 않습니다.

| 예제 | 확인한 내용 |
| --- | --- |
| React 3단위 | 초기 0, Snapshot 한 클릭 뒤 1, Reset 뒤 0, Updater 한 클릭 뒤 3, 한 번 더 클릭하면 6. 본문 교체 코드에서는 별도 Snapshot 세 클릭의 1 → 2 → 3과 Reset 뒤 Updater의 3도 확인 |
| JavaScript 2단위 | 기본 문자열 네 개와 공백·0·Infinity·16진수·지수 표기의 판정. 잘못된 JSON의 오류 표시 후 정상 입력으로 복구 |
| CSS 4단위 | content-box의 테두리 너비 244px와 border-box의 200px. 계산 스타일의 너비에서 padding과 border를 빼면 콘텐츠 너비 156px |
| GSAP 2단위 | 첫 실행과 다음 실행의 종료 x가 각각 0과 240. 본문 세 카드 비교 코드의 생성 직후·진행도 0.5·진행도 1 결과 및 immediateRender: false 변형 |

재현하려면 `pnpm dev`를 실행한 뒤 `http://127.0.0.1:5173/tests/browser/representative-lessons.html`을 엽니다. [검사 코드](../tests/browser/representative-lessons.js)는 실제 예제의 mount를 호출하고 본문에 포함된 React·GSAP 코드도 추출해 실행합니다. 모든 판정이 맞으면 PASS와 관찰값을 표시합니다. 생성되는 학습 문서는 `pnpm build:curricula`로 갱신합니다.

이 검사는 로컬 검증 페이지에서 mount를 직접 실행합니다. 실제 학습 앱의 sandbox 통합, 자연 재생 소요 시간, 깜박임, 모든 기기와 브라우저의 결과까지 입증하지 않습니다. GSAP의 진행도는 코드로 이동했으며 CSS의 콘텐츠 너비 156px는 테두리 실측값과 계산 스타일로 구한 값입니다.

같은 날 프로덕션 빌드를 로컬 미리보기 서버에서 열어 실제 React 실습의 sandbox 안에서 Updater 버튼 결과 3을 확인했습니다. Markdown 필기를 입력한 뒤 새로고침해 보존되는지 확인하고 검사에 사용한 필기는 원래 양식으로 돌려놓았습니다. 해당 실습 문서에는 AdSense 실행 태그와 광고 네트워크 요청이 없었고 새로고침 후 콘솔 오류도 없었습니다. 소개·개인정보 안내는 모바일 너비에서 본문과 링크가 보이고 페이지 전체의 가로 넘침이 없었습니다. 승인 후 실제 광고의 배치나 CMP 동작을 확인한 결과는 아닙니다.

## 2026-10-22 ko/en 첫 묶음 통합 검증

영어 공개 강의는 `javascript-step-02`, `css-step-04`, `react-step-03`, `gsap-step-02` 네 개입니다. 한국어 23개 시리즈·644개 단위 전체의 영어 번역이나 모든 예제의 상호작용 검증을 마친 것은 아닙니다.

| 검사 | 확인 결과 |
| --- | --- |
| `pnpm test` | 115/115 통과 |
| `pnpm check:curricula` | 생성 파일 650개 최신 상태, 한국어 644개·영어 4개 단위 |
| `pnpm build` | curricula·preview·타입·예제 검사·Vite·검색 생성 통과. 검색 assets 686개, sitemap canonical URL 683개 |
| `pnpm check:deploy` | 2364 files, largest 6904626 bytes. 로컬 파일 한도 검사 |
| 첫 묶음 생성기 재실행 | foundations·framework·engineering 예제, curricula·preview·search 여섯 생성기의 tracked 파일 byte 변화 없음 |
| 실제 Chromium 브라우저 | 격리한 context에서 298/298 판정 통과. 실제 built entry 15개 포함 |
| 로컬 preview HTTP | 영어 정상 페이지 12개, entry JS/CSS 자산 3개, 404 경로 3개, 한국어 광고 경로 4개, source 다운로드 8개 확인 |

브라우저 검사는 `http://127.0.0.1:4185`의 전용 harness와 `http://127.0.0.1:4186`의 실제 built preview를 사용했습니다. Browser plugin이 없어 Playwright MCP를 사용했으며 Windows Chromium 155에서 실행했습니다. `tests/browser/i18n-suite.js`는 각 묶음에 새 context를 만들고 종료합니다. 영어 홈 직접 진입·reload, 공개 문서→실습→언어 전환→뒤로 이동→문서 복귀, 필기 저장·reload, JS/TS 코드·progress·ISO 시간의 backup v1/v2/v3 왕복을 검사합니다. 저장 실패·손상 fixture도 정상 기록과 분리합니다. 320·375·768·1280px 문서 폭과 keyboard focus 검사는 roundtrip 묶음에 포함됩니다.

실제 built entry는 미번역 `/en/learn/vue/` 요청에서 발생한 정확한 URL·문구의 404 resource error 한 개만 허용합니다. 나머지 console warning/error와 uncaught pageerror는 실패합니다. warning·error·다른 출처의 같은 404 문구를 주입해 모두 거부되는지도 확인했습니다. 전체 assertion 목록은 [`f18-browser-results.json`](../_workspace/i18n/verification/f18-browser-results.json)에 있습니다. 의도한 sandbox 원문 오류와 storage 오류 fixture는 각 전용 검사의 범위입니다.

언어 전환은 Workspace·Monaco·실행 iframe을 유지하고 저장을 유발하지 않습니다. 기존 `web-gl-study:unit:v1:<id>`와 `web-gl-study:all:v1`, backup v1/v2/v3를 유지하며 `Draft.language`는 JS/TS를 뜻합니다. 예제 실행 언어는 다음 코드 반영 또는 명시적 재실행에 적용합니다. `createPreviewDocument(source, token, runtime, locale='ko')`와 `StudyRuntime.start(source, token, locale='ko')`가 locale을 전달하고 예제는 `mount({ locale, ... })`로 받습니다. 공통 실행 원본과 `/examples-en/<id>/example.js` 영어 주석 읽기용 원본의 역할을 구분합니다. fixture·계산값·코드 식별자·URL·타입 검사 지시문·compiler 원문 오류는 번역 대상이 아닙니다.

추가로 전체 예제 생성기를 재실행했을 때 기존 graphics/GPU 생성물에 CRLF→LF와 빈 줄 공백·끝 빈 줄 차이가 나타났습니다. 첫 묶음에서 바꾸지 않은 생성기와 파일이며 알고리즘 변경은 확인되지 않았습니다. 이 검사에서 만든 변경은 복원했습니다. 위의 여섯 생성기 통과를 모든 생성기의 무차이로 확대하지 않습니다. 전체 생성 재현성은 확장 E04에서 다시 검증해야 합니다. 기존 Vite 500 kB chunk 경고는 남아 있으며 번들 검토는 E08, 실제 CDN header·언어별 404 검증은 E10 범위입니다.

F17의 첫 legacy harness는 사전 snapshot 없이 기본 MCP context에서 실행돼 `http://127.0.0.1:4185`의 `javascript-step-02` 필기와 `updatedAt`를 변경했습니다. 사전 상태의 완전 복구를 입증할 수 없으며 추측 복원하지 않았습니다. 현재 값의 비공개 보존과 사용자 안내는 F17에 기록돼 있습니다. 이후 F17 검증과 이번 298개 판정은 새 context에서 실행했습니다. 이 결과를 최초 기본 context의 원상복구 증거로 사용하지 않습니다.

영어 광고 부재와 한국어 광고 네 경로는 생성물 및 로컬 HTTP 검사 범위입니다. AdSense 승인·실제 노출·동의 동작·운영 배포는 검증하지 않았습니다. Firefox·WebKit, 모든 GPU·장시간 안정성도 미검증입니다.
