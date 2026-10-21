# Cloudflare Pages에 Frontory 게시하기

## 구성

Frontory는 dist/를 배포하는 정적 사이트입니다. API 서버나 Supabase DB 없이 실행됩니다. Cloudflare Pages의 무료 pages.dev 하위 도메인을 사용할 수 있습니다. 프로젝트 이름과 주소는 생성 시 가용성을 확인해야 하며 이 문서는 특정 주소가 이미 확보되었다는 의미가 아닙니다. 독립 도메인의 등록은 일반적으로 유료입니다. 무료 DNS와 무료 도메인 등록은 다릅니다.

## 권장: GitHub 연동

1. 쓰기 권한이 있는 계정으로 habergeon/frontory의 main에 검증된 커밋을 push합니다. 토큰은 파일이나 채팅에 넣지 않습니다.
2. Cloudflare 대시보드에서 Workers & Pages → Create application → Pages → Connect to Git을 선택합니다. GitHub 앱에 해당 저장소 접근을 허용합니다.
3. 저장소 frontory, 프로덕션 브랜치 main, 루트 디렉터리 저장소 루트를 지정합니다. 프레임워크 프리셋은 Vite 또는 None을 사용합니다.
4. 환경 변수 NODE_VERSION=24.16.0, PNPM_VERSION=10.34.5, SKIP_DEPENDENCY_INSTALL=true를 설정합니다. 빌드 명령은 아래와 같고 출력 디렉터리는 dist입니다.

```sh
pnpm install --frozen-lockfile && pnpm test && pnpm build && pnpm check:deploy
```

5. 배포 로그와 제공된 HTTPS 주소를 확인합니다. 첫 장면 렌더링, JS/TS 수정, 오류 복구, JSON 백업 왕복, 새로고침 복원과 모바일 탭을 확인합니다. 개발 서버의 성공만으로 실제 게시 성공을 판단하지 않습니다.
6. 이후 main push는 프로덕션 배포를, 다른 브랜치는 설정에 따라 미리보기 배포를 만듭니다. 공개 저장소에 비밀 환경 변수를 추가하지 마세요.

Git 연동 방식과 Direct Upload 방식은 처음 선택 시 운영 방식을 결정합니다. Git 연동 프로젝트를 Direct Upload 프로젝트로 전환할 수 없으므로 이 프로젝트에서는 Git 연동을 권장합니다.

## 비용과 제약

2026-10-21 공식 문서 기준 Free는 월 500회 빌드, 동시 빌드 1개, 사이트 20,000파일, 개별 파일 최대 25 MiB입니다. check:deploy는 파일 수와 개별 크기를 검사합니다. 현재 번들에는 Monaco worker가 포함되어 초기 다운로드가 큽니다. 무료 한도와 정책은 서비스에서 최신 값을 확인하세요. 대형 GS 데이터는 이 저장소와 Pages 산출물에 넣지 않습니다.

public/_headers는 MIME sniffing 방지와 referrer 정책을 설정합니다. iframe은 자체 CSP를 사용합니다. 전역 CSP·COEP 등을 무심코 추가하면 Monaco worker와 iframe이 깨질 수 있으므로 변경 후 실제 게시 주소에서 검사하세요.

## 도메인 이동과 데이터

추후 구매하거나 보유한 도메인은 Pages의 Custom domains에 먼저 등록하고 안내에 따라 DNS를 연결합니다. 무료 pages.dev 주소와 새 도메인은 서로 다른 브라우저 저장소입니다. 이전 주소에서 JSON 내보내기 → 새 주소에서 가져오기를 수행하세요. 리디렉션은 백업 기회를 제공한 뒤 적용하세요.

## Supabase는 언제 필요한가요?

현재 localStorage와 파일 백업에는 DB가 필요하지 않습니다. 계정별 여러 기기 동기화를 추가할 때 Supabase Auth + Postgres + 사용자별 RLS 정책, 충돌 해결, 삭제·내보내기 정책을 함께 설계합니다. service_role 비밀 키는 프론트엔드에 넣지 않습니다. 무료 프로젝트에는 용량·트래픽 제한과 비활성 일시중지 조건이 있으므로 항상 실행되는 저장소로 가정하지 않습니다. 지금은 Supabase 프로젝트를 생성하지 않습니다.

## 운영 점검

- GitHub CI에서 설치·테스트·빌드·산출물 한도를 검사합니다. CI와 Pages 빌드는 별개입니다.
- Pages 배포 이력에서 이전 정상 배포로 롤백할 수 있습니다. 브라우저 기록은 배포 롤백으로 복구되지 않으므로 백업 호환성을 유지합니다.
- 게시 후 /_headers 파일 자체가 아니라 실제 HTTP 응답 헤더를 확인하세요.

## 공식 참고

- [Git 연동](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [빌드 설정](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [빌드 환경](https://developers.cloudflare.com/pages/configuration/build-image/)
- [무료 한도](https://developers.cloudflare.com/pages/platform/limits/)
- [헤더](https://developers.cloudflare.com/pages/configuration/headers/)
- [사용자 도메인](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Supabase 요금과 무료 범위](https://supabase.com/pricing)
