# Svelte · 16 공유 runes 모듈

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: store와 작업공간 상태 · 문서 기반 직접 구현 · 저장 ID: `svelte-step-16`

## 목표와 학습 후 역량

- 두 Workspace의 A 초안이 서로 다르다.
- 한 Workspace reset이 다른 쪽 값을 지우지 않는다.

## 선수 지식

16단위는 15단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 모듈 파일

.svelte.js 또는 .svelte.ts에서는 runes를 사용한 로직을 분리할 수 있습니다. 일반 .js와 컴파일 조건을 구분합니다.

### 인스턴스 범위

factory가 상태 객체를 만들면 호출별로 분리할 수 있습니다. 모듈 전역에 하나만 만들면 모든 소비자가 공유합니다.

## 실습 준비

별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다. Frontory 내장 실행 예제가 없는 확장 단위이며 아래 파일은 외부 실습 프로젝트에 작성합니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. src/createNotes.svelte.js에 $state 객체와 update 함수를 만드는 factory를 작성하세요.
2. 두 Workspace.svelte가 각자 factory를 호출하게 하세요.
3. 같은 단위 A에 다른 문자열을 넣고 공유 여부를 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 생성 위치 | 모듈 전역 1회 | Workspace별 호출 | 두 작업공간 초안이 독립적이다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 두 Workspace의 A 초안이 서로 다르다.
- [ ] 한 Workspace reset이 다른 쪽 값을 지우지 않는다.

## 자가 점검

1. 반응형 값을 재대입해 export하면 어떤 제한을 확인해야 하나요?
2. SSR에서 모듈 전역 사용자 상태가 왜 위험할 수 있나요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: writable과 구독 계약](../15/README.md) · [다음: Context로 작업공간 연결](../17/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
