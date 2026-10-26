# Svelte · 14 이벤트와 자원 정리

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 컴포넌트 계약과 Effect · 외부 실행 예제 · 미리보기 안내 · 저장 ID: `svelte-02`

## 목표와 학습 후 역량

- 재표시 뒤 포인터 위치에 원이 하나 그려진다.
- 숨김 뒤 타이머와 리스너 처리가 멈춘다.

## 선수 지식

14단위는 13단위 결과물과 실험 기록을 이어 사용합니다.

## 핵심 개념과 설명

### 포인터 좌표

client 좌표는 화면 좌표이며 Canvas 버퍼 좌표와 다릅니다. getBoundingClientRect 비율을 적용해 그리는 위치로 변환합니다.

### 자원 묶음

컴포넌트가 만든 리스너·타이머·구독은 함께 정리합니다. 재표시 후 입력과 프레임이 중복되지 않는지 확인해야 합니다.

## 실습 준비

별도 Svelte 5 Vite 프로젝트에서 .svelte 파일을 컴파일해 실행합니다. 패키지 버전과 lockfile을 기록하세요. Frontory의 Svelte 미리보기는 실제 writable와 명시적 DOM 어댑터이며 .svelte 컴파일러나 runes 실행기가 아닙니다. 기존 svelte-02 미리보기는 출발점입니다. 본문의 확장 결과물은 별도 프로젝트에서 구현합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 기존 src/labs/svelte-02의 App.svelte와 PointerCanvas.svelte를 외부 프로젝트 src에 복사하세요.
2. Canvas pointer 좌표 변환과 onMount의 타이머·리스너 cleanup을 확인하세요.
3. 표시 5회와 주기 100→500 변경을 실행하고 활성 자원 수를 기록하세요.

## 관찰할 변수

| 변수      | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                      |
| --------- | --------- | --------- | ------------------------------------------ |
| 표시 횟수 | 1회       | 5회       | 표시 중 타이머 1개·숨김 중 0개를 유지한다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 재표시 뒤 포인터 위치에 원이 하나 그려진다.
- [ ] 숨김 뒤 타이머와 리스너 처리가 멈춘다.

## 자가 점검

1. 내장 store 어댑터의 unsubscribe와 컴포넌트 cleanup은 어떻게 대응하나요?
2. CSS 크기만 줄이면 좌표 계산에서 어떤 비율이 필요한가요?

## 공식 참고

- [Svelte 공식 문서와 runes 목차](https://svelte.dev/docs/svelte/overview)
- [Svelte $effect와 cleanup](https://svelte.dev/docs/svelte/$effect)
- [Svelte onMount와 tick](https://svelte.dev/docs/svelte/lifecycle-hooks)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/svelte-02/example.js) · [실행 환경과 제한](../../../../examples.md)

미리보기는 실제 Svelte writable store와 DOM 어댑터를 사용합니다. Svelte 컴포넌트 컴파일러는 내장하지 않습니다. 같은 예제 폴더의 .svelte 파일을 별도 Svelte 프로젝트에서 실행하여 컴포넌트 수명주기도 비교하세요.

- [App.svelte](../../../../../src/labs/svelte-02/App.svelte)
- [PointerCanvas.svelte](../../../../../src/labs/svelte-02/PointerCanvas.svelte)
- [README.md](../../../../../src/labs/svelte-02/README.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: onMount와 초기 자원](../units/13/README.md) · [다음: writable과 구독 계약](../units/15/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
