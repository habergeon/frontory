# 검색 등록과 공개 학습 문서

Frontory의 실습 화면은 기존 `/#학습ID` 주소를 유지합니다. `#` 뒤의 값은 서버에 전달되지 않으므로 학습 문서를 별도로 검색할 수 있는 정적 페이지를 제공합니다.

- `/learn/`: 전체 시리즈 목록
- `/learn/<series>/`: 시리즈별 28단위 학습 계획
- `/learn/<series>/<unit>/`: 목표, 개념, 실습 과제와 공식 참고자료
- `/privacy/`: 저장 및 개인정보 안내
- `/about/`: 사이트 소개와 문의
- `/en/`: 영어 홈 · `/en/learn/`: 영어 학습 목차
- `/en/about/`, `/en/privacy/`: 영어 안내
- `/en/learn/<series>/`, `/en/learn/<series>/<unit>/`: 전체 23개 시리즈와 644개 단위
- `/sitemap.xml`: 한국어 671개와 영어 671개, 총 1,342개 canonical URL
- `/robots.txt`: 공개 페이지 크롤링 허용과 사이트맵 위치

공개 문서는 빌드 시 기존 Markdown에서 생성합니다. JavaScript 없이도 본문과 다음 학습 링크를 읽을 수 있으며 각 페이지에 고유한 제목·설명·canonical을 넣습니다. 본문의 ‘코드 편집 · 실습 · 필기 열기’에서 기존 실습 화면으로 이동합니다. 개인 필기·편집 코드·학습 상태는 공개 문서에 포함하지 않습니다.

`pnpm build`는 Vite 빌드 후 정적 문서를 생성합니다. 별도의 서버나 데이터베이스는 필요하지 않습니다. `404.html`과 `en/404.html`을 생성합니다. 로컬 개발·미리보기 서버는 없는 경로에 해당 언어의 본문과 HTTP 404를 반환합니다. 실제 CDN의 상태 코드와 언어별 오류 응답은 이번 확장의 운영 배포 뒤 별도로 확인해야 합니다. 원본 다운로드 `/examples/`와 영어 주석 읽기용 다운로드 `/examples-en/`에는 `X-Robots-Tag: noindex`와 `Content-Disposition: attachment`를 설정합니다.

## SEO 설정 위치

| 항목 | 설정 | 수정할 파일 |
| --- | --- | --- |
| 사이트맵 | 한국어 671개와 영어 671개, 총 1,342개 canonical URL. `#` 실습 주소는 제외 | `scripts/search-pages.mjs` |
| robots.txt | 크롤링 허용, 사이트맵 절대 주소 안내 | `scripts/search-pages.mjs` |
| 제목·설명·canonical | 홈은 고정, 학습 문서는 각 단위의 제목과 목표로 생성 | `index.html`, `scripts/search-pages.mjs` |
| Open Graph | 페이지별 제목·설명·주소, Frontory 사이트명, 언어별 `ko_KR`·`en_US`, 공통 이미지 | `index.html`, `scripts/social-meta.mjs` |
| Twitter 카드 | `summary_large_image`, 제목·설명은 OG 값 사용 | `index.html`, `scripts/social-meta.mjs` |
| 구조화 데이터 | ko/en 홈은 `WebSite`, 나머지 공개 문서는 `WebPage` | `index.html`, `scripts/search-pages.mjs` |
| 언어 대응 | 실제 번역이 있는 페이지만 ko/en 상호 hreflang. 없는 영어 URL은 생성하지 않음 | `scripts/search-pages.mjs`, `vite.config.ts` |
| 검색 제외 | 404 문서 `noindex`, 예제 파일 응답 `X-Robots-Tag: noindex` | `scripts/search-pages.mjs`, `public/_headers` |

공유 이미지는 `public/og/frontory.png`에 있습니다. 크기는 1200×630이며 기존 로고와 색상을 사용합니다. Windows에서 `powershell -NoProfile -File scripts/build-og.ps1`로 다시 만들 수 있습니다. 배포 빌드에는 이미지 생성 도구가 필요하지 않습니다.

`pnpm build` 후 `dist/sitemap.xml`, `dist/robots.txt`, `dist/og/frontory.png`가 생성·복사됩니다. 공개 문서를 공유할 때는 `/learn/` 주소를 사용하세요. `/#학습ID`는 실습 이동용이므로 소셜 서비스에서 단위별 공유 정보로 구분되지 않습니다.

도메인을 바꾸면 홈과 문서의 canonical, OG 주소, 이미지 주소, 구조화 데이터, 사이트맵 주소를 함께 변경해야 합니다. 공유 서비스가 이전 이미지를 보관하고 있다면 해당 서비스의 미리보기 갱신 도구로 다시 수집하도록 요청하세요.

## ko/en 공개 범위와 확장 계약

2026-10-23 현재 한국어·영어 모두 23개 시리즈·644개 단위를 공개합니다. 언어별 홈·학습 목차·안내 두 개·시리즈 23개·단위 644개를 합쳐 671개씩이며 전체 canonical URL은 1,342개입니다. 404·hash 실습 주소·다운로드는 사이트맵에서 제외합니다. 공통 실행 원본은 644개, 영어 주석 읽기용 원본도 644개이며 외부 도구용 companion 233개는 별도 분류입니다. 영어 읽기 원본이나 companion을 학습 단위 수에 더하지 않습니다.

2026-10-22 첫 묶음 당시 영어 공개 강의는 `javascript-step-02`, `css-step-04`, `react-step-03`, `gsap-step-02` 네 개였습니다. 당시 영어 12개 페이지는 홈·학습 목차·안내 두 개·시리즈 네 개·강의 네 개를 합한 수이며 404와 다운로드를 포함하지 않습니다. 한국어 전체 범위 23개 시리즈·644개 단위와 구분합니다. 미번역 강의를 한국어 본문으로 채운 영어 공개 페이지는 만들지 않습니다. 미제공 영어 실습 ID에는 영어 안내와 한국어 원문 링크를 표시합니다.

URL이 언어를 결정합니다. `/`와 `/#<id>`는 한국어, `/en/`와 `/en/#<id>`는 영어입니다. 자동 언어 redirect나 별도 언어 저장 key는 없습니다. 영어 홈은 빌드한 한국어 앱과 같은 해시 JS/CSS를 사용하되 head·fallback·canonical·JSON-LD는 영어로 생성합니다. `pnpm build:search`는 Vite 빌드 뒤 실행합니다.

확장은 `content/locales/en/manifest.json`의 `publishedUnitIds`와 검토한 번역 record를 함께 추가하는 방식입니다. `scripts/locale-content.mjs`의 `sourceHash`는 CRLF를 LF로 정규화하고 object key를 정렬한 원문을 검증합니다. 산문 record는 `{ sourceHash, values }`이며 `values`는 허용된 모든 산문 leaf path의 정확한 집합입니다. ID·day·URL 같은 구조 필드는 번역하지 않습니다. 문서 record는 `{ sourceHash, translatedPath }`로 `/docs/`와 `/docs/en/`을 대응시킵니다. 원문이 바뀌면 영어 대응 내용을 검토한 뒤 해당 record만 갱신하며 생성기가 hash를 자동 승인하지 않습니다.

`pnpm build:curricula`가 `src/app/catalog.en.json`과 영어 학습 Markdown을 생성하고 `pnpm check:curricula`가 최신 상태를 검사합니다. `readEnglishContent({ complete: true })`는 전체 영어 범위의 필수 검증입니다. 현재 빌드와 CI는 complete 검사를 통과해야 합니다. 실제 공개 경로 집합은 `generateSearchPages()`가 결정합니다. 영어 앱 진입·자산 결합은 `scripts/build-search.mjs`, 로컬 라우팅은 `vite.config.ts`가 맡습니다.

전체 확장과 번들 최적화(E08), E09의 로컬 예제 검증은 완료했습니다. 이번 확장의 원격 CI·Cloudflare 배포와 실제 CDN header·언어별 404 검증(E10)은 아직 실행하지 않았습니다. 로컬 HTTP 성공을 운영 배포 완료로 해석하지 않습니다.

## Search Console 등록과 확인

확인된 URL 접두어 속성 `https://frontory.pages.dev/`에서 `https://frontory.pages.dev/sitemap.xml`을 제출합니다. 홈페이지 URL 검사를 통해 Google의 접근 가능 여부와 색인 상태를 확인할 수 있습니다. 사이트맵 접수나 소유권 인증은 검색 노출을 보장하지 않습니다. Google이 크롤링·색인 여부를 결정합니다.

소유권은 기존 Google Analytics 태그로 확인했습니다. 이번 확장으로 Search Console 속성을 추가 등록하거나 사이트맵을 다시 제출한 것은 아닙니다. GA 태그를 제거할 경우 먼저 다른 인증 수단을 마련하세요. 도메인을 바꾸면 canonical·사이트맵 기준 주소와 Search Console 속성을 함께 변경해야 합니다.

## 공식 참고

- [Open Graph 메타데이터 규격](https://ogp.me/)
- [Google 사이트 이름과 WebSite 구조화 데이터](https://developers.google.com/search/docs/appearance/site-names)

- [JavaScript SEO 기본사항](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [URL 구조와 fragment 제한](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [사이트맵 작성 및 제출](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
