# 실행 코드 편집기

## 선택과 범위

2026-10-21, JavaScript/TypeScript 검사와 실제 실행을 위해 [Monaco Editor](https://github.com/microsoft/monaco-editor)를 선택했다. 내장 언어 서비스가 구문 진단, 타입 진단, 자동 완성과 TypeScript emit을 함께 제공한다. 0.55.1을 설치하고 pnpm lockfile에 고정했다. 최신 버전이라는 의미는 아니며 현재 Vite 구성에서 확인한 버전이다.

React 편집 컴포넌트는 지연 로딩하고 worker는 Vite가 로컬 번들링한다. CDN이나 보안 설정 변경은 없다. Monaco와 TypeScript worker가 커서 프로덕션 빌드의 500kB 경고는 남는다. 언어 선택은 실행 가능한 JavaScript/TypeScript 두 가지로 제한한다. 여러 언어의 구문 강조를 제공하는 라이브러리라는 사실과 모든 언어의 컴파일·실행을 지원하는 것은 구별한다.

## 실행과 저장

1. 각 학습 단위에 고유한 Monaco 모델 URI를 만든다.
2. 변경 즉시 원문과 언어를 기존 단위별 저장소에 저장한다.
3. 600ms debounce 후 worker에서 문법·타입을 검사한다. 요청 번호와 dispose 상태로 오래된 검사 결과를 무시한다.
4. 오류가 있으면 해당 줄과 목록을 표시하고 실행을 보류한다. 기존 정상 장면은 유지한다.
5. 통과한 JavaScript 원문 또는 TypeScript emit 결과를 기존 sandbox iframe에 전달한다.
6. 언어 전환·단위 전환·unmount 시 편집기, 모델, 타이머와 이벤트를 정리한다.

이전 version=1 저장본은 language가 없어도 JavaScript로 읽는다. 원본 복원은 코드와 언어만 바꾸며 필기를 지우지 않는다. 타입 검사는 strict=false, checkJs=true이며 주입한 THREE/OrbitControls는 any이다. 전체 Three.js 선언 파일 연결은 후속 범위다.

## 검증 기록

- pnpm test: 저장·미리보기 회귀 검사 13개 통과. 이전 저장 형식과 선택 언어 유지 검사 포함.
- pnpm build: 타입 검사 및 프로덕션 번들 성공. 번들 크기 경고는 남음.
- 로컬 브라우저 실제 키보드 입력으로 JS 구문 오류 발생 및 줄 번호 목록 확인.
- TypeScript 타입 주석이 있는 코드를 변환하여 큐브 색상 변경 렌더링 확인.
- number에 string을 할당한 오류 진단, 마지막 정상 장면 유지, 수정 후 복구 확인.
- 새로고침 후 TypeScript 선택과 오류 코드 복원 확인.
- 원본 복원 후 JavaScript 선택 및 필기 보존 확인.
- 1440px에서 세 패널 모두 표시되고 문서 가로 overflow 없음 확인. 작은 화면에서 편집기·결과 탭 전환 확인.
- 검사 중 브라우저 오류·경고 로그 없음. 테스트 저장값과 viewport override는 원상 복원.

자동 완성의 모든 항목, 모든 문법, 대용량 코드 성능과 다른 브라우저는 전수 검증하지 않았다. 브라우저 검증은 개발 서버에서 수행했다.
