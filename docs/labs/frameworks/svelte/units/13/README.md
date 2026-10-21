# Svelte · 13 onMount와 초기 자원

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 컴포넌트 계약과 Effect · 문서 기반 직접 구현 · 저장 ID: `svelte-step-13`

## 목표와 학습 후 역량

- 표시 중 pointer 입력 1회에 처리 1회다.
- 숨긴 상태에서는 pointer 처리 로그가 없다.

## 선수 지식

13단위는 12단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 마운트 시점

onMount는 컴포넌트가 DOM에 연결된 뒤 실행합니다. 서버 렌더 과정에서 DOM 자원을 만드는 장소로 쓰지 않습니다.

### 동기 반환

onMount가 동기적으로 반환한 함수는 제거 때 정리됩니다. async 콜백은 Promise를 반환하므로 같은 cleanup 계약으로 오해하지 않습니다.

## 실습 준비

별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/PointerCanvas.svelte에서 onMount로 pointer 리스너를 등록하세요.
2. 같은 함수 참조로 removeEventListener하는 cleanup을 반환하세요.
3. 표시를 5회 전환하고 포인터 한 번의 처리 횟수를 세세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 마운트 횟수 | 1회 | 5회 | 포인터 처리 횟수가 누적되지 않는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 표시 중 pointer 입력 1회에 처리 1회다.
- [ ] 숨긴 상태에서는 pointer 처리 로그가 없다.

## 자가 점검

1. async onMount에서 cleanup을 return하면 왜 다르게 동작하나요?
2. onMount와 $effect 중 어떤 값 변화가 재실행을 요구하나요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount와 tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: $effect 의존성과 해제](../12/README.md) · [다음: 이벤트와 자원 정리](../../02-experiments/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
