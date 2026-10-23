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

## 2026-10-23 전체 ko/en 확장 검증

최종 공개 범위는 23개 시리즈·644개 단위다. 아래 기록은 앞의 네 강의 부분 공개 결과와 구분한다. Windows, Node 24.16.0, Playwright 1.64.1, Chromium 156.0.8078.4에서 실행했다. Browser plugin이 없어 설치된 Playwright를 사용했고 모든 검사는 새 context에서 수행했다. 사용자 persistent profile이나 기존 저장소는 열지 않았다. 전용 Vite harness는 4185, 실제 built preview는 4186을 사용했다.

전체 sandbox 검사는 한국어 644행·영어 644행, `(ID, locale)` 중복 없이 **1,288행 모두 mount-ready / dispose-ack를 확인**했다. 각 행의 SHA-256은 현재 실행 원본 644개와 일치한다. 이 응답은 개별 계산·렌더링 완료나 자원 누수 부재를 보증하지 않는다. 전체 sweep의 준비 응답을 심층 상호작용이나 외부 runner 통과로 집계하지 않았다.

대표 상호작용은 기존 네 예제를 재사용하고 새 19개 기술군 대표와 정정 계약을 더했다. 최신 focused harness는 42개 서로 다른 ID를 두 언어에서 실행했다. 아래 합계에는 기존 React·JavaScript·CSS·GSAP 대표의 46+46개 판정이 포함돼 있다.

| 검사 묶음 | 최종 assertion 통과 수 |
| --- | ---: |
| backup v1/v2/v3·빈 필기·320/375/768/1280px·keyboard/focus | 52 |
| storage 차단·손상·재시도 | 18 |
| 실제 built entry·없는 영어 URL의 404 | 15 |
| Workspace·JS/TS 마지막 정상 실행·compiler 원문 | 25 |
| 실행 locale 적용 시점·iframe/contentWindow 보존 | 23 |
| 영어 원본 다운로드·기존 draft 보존, legacy ID 포함 | 34 |
| 전체 공개 catalog·검색·언어 왕복 | 75 |
| 기존 대표 네 예제 한국어 | 46 |
| 기존 대표 네 예제 영어 | 46 |
| 확장 focused 42개 ID 한국어 | 831 |
| 확장 focused 42개 ID 영어 | 831 |
| **11묶음 합계** | **1,996** |

최초 전체 suite는 1,792개를 통과했다. 이후 focused 계측만 보강해 한국어·영어를 각각 재실행했고, 변경 없는 나머지 9묶음의 334개 결과를 재사용했다. 따라서 1,792와 1,996을 더하지 않는다. 기존 네 대표의 92개도 334와 1,996에 이미 포함돼 있다. 양언어 focused 결과 중 표시 번역과 검사 페이지의 locale URL을 제외한 같은 관찰 789쌍은 실제 값이 모두 같았다. 별도 보충 검사에서는 HTML20의 599/600/601px 경계 6개, 실제 Enter 키와 exit 후 focus 복구 2개, 미지원 adapter 안내·재실행 2개를 확인했다. 이 10개 시나리오의 168개 판정은 위 합계에 더하지 않았다.

### 실제 GPU와 정리 관찰

하드웨어 검사는 `chromium.launch({channel:'chromium',headless:true,args:['--enable-gpu']})`를 사용했다. 실제 WebGL renderer는 NVIDIA GeForce RTX 3060 Ti / D3D11이며 WebGPU adapter는 nvidia/ampere, `isFallbackAdapter:false`였다. `webgpu-step-04`의 1회·2회 submit과 queue 완료, `wgsl-step-04`의 SCALE 1·2 readback, `webgpu-step-16`의 고정 경계 네 번 계산을 실제 실행했다. 마지막 사례는 CPU oracle과 절대오차 `1e-6` 이내로 일치했고 `inPlaceExecuted:false`를 확인했다. 기본 headless shell에서 adapter가 없는 경우는 안내와 버튼 회복만 확인했으며 GPU 실행 통과로 세지 않았다.

Three/R3F/Pixi/GLSL에서는 실제 WebGL draw 호출을 관찰했다. GLSL26은 valid→invalid raw compiler log→valid 복구를 검사했다. GLSL07의 역순 smoothstep에는 픽셀 golden을 적용하지 않았다. GLSL17/27은 같은 uniform이 보간식과 octave/해상도 조건을 함께 바꾸는 실제 ShaderMaterial을 확인했으며 단일 변수의 비용 비교로 해석하지 않았다. CPU Canvas의 alpha 순서·회전 중심·quaternion, RGB byte MSE, ray integration도 별도 oracle로 확인했다.

독립 module mount에서 Worker 종료와 Blob URL 회수, GPU buffer/device destroy, Three dispose와 Pixi destroy, bitmap.close, visibility listener 제거와 Offscreen rAF 취소를 관찰했다. 실제 함수를 감싼 계측은 `finally`에서 복구했다. cleanup 뒤 빈 stage와 remount도 검사했다. 이 관찰을 모든 내부 객체나 장시간 메모리 누수 검증으로 확대하지 않는다. 마지막 전역 오류 관측에서 발견한 ResizeObserver 반복은 실제 앱에서 재현되지 않았고, 앞선 예제가 하네스의 inline 크기를 지운 것이 원인이었다. 하네스 크기를 stylesheet에 고정하고 module 사이 스타일을 초기화한 뒤 전체 focused 픽셀·정리 검사를 다시 통과했다. Offscreen02의 별도 실제 Worker 오류 fixture는 MutationObserver로 오류 문구가 DOM에 들어온 것을 확인했다. 그 문구는 후속 resize 출력에 덮일 수 있으며 지속 표시나 자동 fallback 성공을 뜻하지 않는다.

### 수정한 실패와 근거

HTML20은 599px·600px에서 media 조건이 맞아도 산호색 source가 선택되지 않았다. data URI의 공백이 `srcset` 후보를 깨는 것이 원인이었다. 실제 foundations 생성기에서 URL의 공백만 `%20`으로 바꾸고 공통 예제·영어 읽기 원본을 재생성했다. 디코딩한 SVG bytes, 600px 조건, 색·크기·fallback과 표시 번역은 그대로다. 수정 후 양언어 599/600/601px에서 실제 `currentSrc`와 디코딩 결과를 확인했다. 회귀 검사와 생성기 재실행도 통과했다. 이 수정의 커밋은 `6c7cfc6f`다.

사전 조사에 있던 `css-step-02`/viewport560 표기는 legacy `css-02`/실제 query container 콘텐츠 폭 559·560·561로 정정했다. unknown hash는 존재하는 미공개 단위가 아니므로 Home으로 돌아오는 현재 App 계약을 확인했다. 실제 없는 `/en/learn/e09-does-not-exist/`의 영어 404 검사는 별도로 유지했다.

### 증거와 남은 범위

로컬 증거는 `.superpowers/sdd/2026-10-22-ko-en-expansion/runtime-tools/`에 있다. 최종 행은 `e09-coverage.json`, 11묶음 결과는 `e09-final-suite-result.json`, 보충 검사는 `e09-extra-result.json`, 입력·증거 해시는 `e09-review-package.json`에서 확인할 수 있다. 하네스는 `tests/browser/examples.html`, `tests/browser/expansion-contracts.html?locale=ko`, `?locale=en`이다. 전체 실행 순서와 정확한 명령은 같은 작업 디렉터리의 `task-9-report.md`에 기록했다.

초기 실패 runner가 늦게 종료되며 공용 sweep 결과 파일을 덮어쓴 경합이 있었다. 최종 coverage에는 덮어쓰기 전에 저장한 원 sweep의 1,286행과 수정 후 HTML20의 실제 두 행이 보존돼 있다. 교체 전 HTML20 두 행의 원래 결과 파일 복구는 주장하지 않는다. timeout은 `e09-sweep-stale-run-timeout.json`에 분리 보존했다. 종료 시 E09 Node runner가 남아 있지 않은 것도 확인했다.

E05의 외부 WAT/Node·Playwright·Svelte·HTML·SceneLab/R3F·TypeScript 결과는 실제 실행 입력의 SHA가 현재와 같은 경우만 재사용했다. 초기 Notes locator 실패 15개는 재사용하지 않았으며 수정 후 실제 통과 결과로 대조했다. 새 시각 기준 이미지의 재현성, 소프트웨어 GPU baseline이라는 한계도 유지한다. preview의 소스 표시는 외부 실행 성공과 구분한다.

실제 document.hidden 전환은 headless 탭 전환과 창 최소화에서도 관찰되지 않아 Offscreen18 숨김·복귀 동작은 미검증이다. 합성 visibility 이벤트로 대체하지 않았다. native caption 메뉴, 실제 사용자 GLB·대형 GS 파일의 전체 입력 흐름, cross-GPU 픽셀 일치, Firefox/WebKit, 실제 CDN, 장시간 안정성과 운영 배포도 검증하지 않았다. 기존 F17 기본 context의 저장소 변경·복구 한계는 앞의 기록대로 남긴다.
