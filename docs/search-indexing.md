# 검색 등록과 공개 학습 문서

Frontory의 실습 화면은 기존 `/#학습ID` 주소를 유지합니다. `#` 뒤의 값은 서버에 전달되지 않으므로 학습 문서를 별도로 검색할 수 있는 정적 페이지를 제공합니다.

- `/learn/`: 전체 시리즈 목록
- `/learn/<series>/`: 시리즈별 28단위 학습 계획
- `/learn/<series>/<unit>/`: 목표, 개념, 실습 과제와 공식 참고자료
- `/sitemap.xml`: 홈과 공개 학습 문서 669개 URL
- `/robots.txt`: 공개 페이지 크롤링 허용과 사이트맵 위치

공개 문서는 빌드 시 기존 Markdown에서 생성합니다. JavaScript 없이도 본문과 다음 학습 링크를 읽을 수 있으며 각 페이지에 고유한 제목·설명·canonical을 넣습니다. 본문의 ‘코드 편집 · 실습 · 필기 열기’에서 기존 실습 화면으로 이동합니다. 개인 필기·편집 코드·학습 상태는 공개 문서에 포함하지 않습니다.

`pnpm build`는 Vite 빌드 후 정적 문서를 생성합니다. 별도의 서버나 데이터베이스는 필요하지 않습니다. `404.html`을 두어 존재하지 않는 URL이 홈으로 응답하는 soft 404를 피합니다. 원본 예제 다운로드 경로 `/examples/`에는 `X-Robots-Tag: noindex`를 적용합니다.

## SEO 설정 위치

| 항목 | 설정 | 수정할 파일 |
| --- | --- | --- |
| 사이트맵 | 홈, 시리즈, 학습 문서 669개 URL. `#` 실습 주소는 제외 | `scripts/search-pages.mjs` |
| robots.txt | 크롤링 허용, 사이트맵 절대 주소 안내 | `scripts/search-pages.mjs` |
| 제목·설명·canonical | 홈은 고정, 학습 문서는 각 단위의 제목과 목표로 생성 | `index.html`, `scripts/search-pages.mjs` |
| Open Graph | 페이지별 제목·설명·주소, Frontory 사이트명, `ko_KR`, 공통 이미지 | `index.html`, `scripts/social-meta.mjs` |
| Twitter 카드 | `summary_large_image`, 제목·설명은 OG 값 사용 | `index.html`, `scripts/social-meta.mjs` |
| 구조화 데이터 | 홈에 `WebSite` 이름·주소·언어 명시 | `index.html` |
| 검색 제외 | 404 문서 `noindex`, 예제 파일 응답 `X-Robots-Tag: noindex` | `scripts/search-pages.mjs`, `public/_headers` |

공유 이미지는 `public/og/frontory.png`에 있습니다. 크기는 1200×630이며 기존 로고와 색상을 사용합니다. Windows에서 `powershell -NoProfile -File scripts/build-og.ps1`로 다시 만들 수 있습니다. 배포 빌드에는 이미지 생성 도구가 필요하지 않습니다.

`pnpm build` 후 `dist/sitemap.xml`, `dist/robots.txt`, `dist/og/frontory.png`가 생성·복사됩니다. 공개 문서를 공유할 때는 `/learn/` 주소를 사용하세요. `/#학습ID`는 실습 이동용이므로 소셜 서비스에서 단위별 공유 정보로 구분되지 않습니다.

도메인을 바꾸면 홈과 문서의 canonical, OG 주소, 이미지 주소, 구조화 데이터, 사이트맵 주소를 함께 변경해야 합니다. 공유 서비스가 이전 이미지를 보관하고 있다면 해당 서비스의 미리보기 갱신 도구로 다시 수집하도록 요청하세요.

## Search Console 등록과 확인

확인된 URL 접두어 속성 `https://frontory.pages.dev/`에서 `https://frontory.pages.dev/sitemap.xml`을 제출합니다. 홈페이지 URL 검사를 통해 Google의 접근 가능 여부와 색인 상태를 확인할 수 있습니다. 사이트맵 접수나 소유권 인증은 검색 노출을 보장하지 않습니다. Google이 크롤링·색인 여부를 결정합니다.

소유권은 기존 Google Analytics 태그로 확인했습니다. GA 태그를 제거할 경우 먼저 다른 인증 수단을 마련하세요. 도메인을 바꾸면 canonical·사이트맵 기준 주소와 Search Console 속성을 함께 변경해야 합니다.

## 공식 참고

- [Open Graph 메타데이터 규격](https://ogp.me/)
- [Google 사이트 이름과 WebSite 구조화 데이터](https://developers.google.com/search/docs/appearance/site-names)

- [JavaScript SEO 기본사항](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [URL 구조와 fragment 제한](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [사이트맵 작성 및 제출](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
