# Svelte · 17 Context로 작업공간 연결

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: store와 작업공간 상태 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-17`

## 목표와 학습 후 역량

- 각 트리에서 최신 문자열이 함께 보인다.
- 다른 트리의 초안이 변경되지 않는다.

## 선수 지식

17단위는 16단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### Context

setContext와 getContext는 컴포넌트 트리 안에서 의존성을 전달합니다. 전역 단일 저장소와 달리 트리마다 범위를 나눌 수 있습니다.

### 반응형 객체

Context에 반응형 객체를 전달하면 소비자는 그 객체를 읽습니다. 참조를 통째로 바꾸는 대신 공유 계약을 유지하는 방법을 정합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/Workspace.svelte에서 Symbol 키로 notes 객체와 update 함수를 setContext하세요.
2. 깊은 NoteEditor.svelte에서 getContext로 읽으세요.
3. 중첩 Workspace 두 개에서 같은 id를 편집하고 분리 여부를 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 제공자 | 공통 1개 | 중첩 2개 | 내부 편집기는 가까운 작업공간의 초안을 읽는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 각 트리에서 최신 문자열이 함께 보인다.
- [ ] 다른 트리의 초안이 변경되지 않는다.

## 자가 점검

1. Context를 초기화 시점 밖에서 가져오면 왜 문제가 되나요?
2. 문자열 키 충돌을 어떻게 피하나요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte state rune](https://svelte.dev/docs/svelte/$state)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-17/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-17/App.svelte)
- [Consumer.svelte](../../../../../../src/labs/svelte-step-17/Consumer.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 공유 runes 모듈](../16/README.md) · [다음: 요청과 오래된 결과](../18/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
