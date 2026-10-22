# Svelte · 21 key 블록과 초안 보존

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: store와 작업공간 상태 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-21`

## 목표와 학습 후 역량

- A와 B 초안이 섞이지 않는다.
- key 변경 뒤 편집 횟수가 초기값이다.

## 선수 지식

21단위는 20단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 재생성

{#key unitId}는 값이 바뀔 때 블록을 재생성합니다. 로컬 상태를 의도적으로 초기화할 때 사용할 수 있습니다.

### 보존 위치

단위별 초안은 key 블록 바깥에 두어야 전환에도 남습니다. 커서나 임시 패널 상태는 별도 초기화 정책을 정합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/App.svelte에서 draftsById를 만들고 Editor를 {#key unitId}로 감싸세요.
2. 문자열은 부모에 저장하고 에디터의 로컬 편집 횟수를 표시하세요.
3. A→B→A로 전환해 초안과 편집 횟수를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| key | 고정 값 | unitId | 초안은 남지만 로컬 편집 횟수는 초기화된다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] A와 B 초안이 섞이지 않는다.
- [ ] key 변경 뒤 편집 횟수가 초기값이다.

## 자가 점검

1. key를 매 프레임 바꾸면 무엇이 반복되나요?
2. 모든 상태를 보존해야 할 때 key 블록이 적합한가요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-21/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-21/App.svelte)
- [Editor.svelte](../../../../../../src/labs/svelte-step-21/Editor.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 초안 저장과 복원](../20/README.md) · [다음: Canvas 루프와 반응성 분리](../22/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
