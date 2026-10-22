# React · 14 Effect와 외부 렌더러

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 공유 상태와 외부 시스템 · 편집 가능한 예제 · 저장 ID: `react-02`

## 목표와 학습 후 역량

- 5회 전환 후 Canvas가 1개만 존재한다.
- 숨긴 뒤 프레임 로그와 resize 콜백이 멈춘다.

## 선수 지식

14단위는 13단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 렌더러 소유권

Canvas 렌더러는 React의 DOM 계산과 별개로 동작합니다. 생성한 geometry·material·리스너의 소유자를 명시해야 해제 지점을 찾을 수 있습니다.

### 대칭적 cleanup

Effect가 만든 루프와 구독은 cleanup에서 닫습니다. 재실행 때 이전 Canvas가 남으면 렌더러가 중복됩니다.

## 실습 준비

별도 React Vite 프로젝트의 JSX 실습입니다. Node와 패키지 버전·lockfile을 기록하고 프로젝트 개발 서버에서 실행하세요. 내장 편집기는 범용 JSX 컴파일러가 아닙니다. 기존 react-02 미리보기는 출발점입니다. 본문의 확장 결과물은 별도 프로젝트에서 구현합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/ThreeScene.jsx에 canvas ref와 Effect를 만들고 기존 Three.js 큐브를 연결하세요.
2. RAF 취소·resize 리스너 해제·geometry/material/renderer.dispose를 cleanup에 넣으세요.
3. 표시 버튼을 5회 토글하고 활성 Canvas·루프 수와 다시 보인 큐브 조작을 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 재마운트 횟수 | 1회 | 5회 | 표시 중 활성 루프 1개·숨김 중 0개를 유지한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 5회 전환 후 Canvas가 1개만 존재한다.
- [ ] 숨긴 뒤 프레임 로그와 resize 콜백이 멈춘다.

## 자가 점검

1. 공유 material을 자식 cleanup에서 dispose해도 되나요?
2. 색상 prop 변화마다 렌더러를 다시 만들 필요가 있나요?

## 공식 참고

- [React 학습 가이드](https://react.dev/learn)
- [React API 참고](https://react.dev/reference/react)
- [React useEffect: 외부 시스템과 정리](https://react.dev/reference/react/useEffect)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/react-02/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 요청 경합과 취소](../units/13/README.md) · [다음: 커스텀 Hook의 경계](../units/15/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
