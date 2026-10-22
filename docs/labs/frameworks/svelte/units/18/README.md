# Svelte · 18 요청과 오래된 결과

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: store와 작업공간 상태 · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-step-18`

## 목표와 학습 후 역량

- 최종 query와 결과 id가 B로 같다.
- 컴포넌트 제거 뒤 결과가 반영되지 않는다.

## 선수 지식

18단위는 17단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 비동기 경합

검색 요청은 보낸 순서와 다르게 끝날 수 있습니다. 최신 query의 결과만 채택할 규칙이 필요합니다.

### Effect 정리

Effect 시작 때 query를 동기적으로 읽고 요청을 만듭니다. cleanup에서 취소하거나 완료 결과를 무시하도록 표시합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. src/Search.svelte에서 query를 읽는 $effect에 AbortController를 연결하세요.
2. fakeSearch에 A 800ms·B 100ms 지연을 넣으세요.
3. A 다음 B를 입력하고 최신 id 검사로 최종 결과가 B인지 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 응답 지연 | 동일 100ms | A만 800ms | 늦게 끝난 A가 B 결과를 바꾸지 않는다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 최종 query와 결과 id가 B로 같다.
- [ ] 컴포넌트 제거 뒤 결과가 반영되지 않는다.

## 자가 점검

1. Effect 자체를 async로 선언하면 cleanup 반환은 어떻게 되나요?
2. 취소 오류와 실제 실패를 어떻게 나누나요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/svelte-step-18/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 Svelte writable/DOM 계약 실험입니다. runes·snippet·컴파일 결과는 실제 App.svelte를 Svelte 5 프로젝트에서 실행하세요.

- [App.svelte](../../../../../../src/labs/svelte-step-18/App.svelte)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Context로 작업공간 연결](../17/README.md) · [다음: await 블록과 상태 안내](../19/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
