# TypeScript · 02 strict 설정과 실행 코드

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 타입 검사와 데이터 모델 · 편집 가능한 예제 · 저장 ID: `typescript-step-02`

## 목표와 학습 후 역량

- 설치한 tsc 버전과 두 설정의 진단을 남긴다.
- 수정 후 tsc --noEmit 오류가 0개다.

## 선수 지식

1단위 「타입과 좁히기」의 결과물과 실험 기록

## 핵심 개념과 설명

### 컴파일 옵션

strict는 여러 엄격한 검사를 묶어 켭니다. 옵션 변경 전후의 진단은 프로젝트 버전과 함께 기록합니다.

### 타입 제거

타입 표기는 출력 JavaScript에서 제거됩니다. 컴파일 성공과 런타임 성공은 별도로 검사합니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 로컬 프로젝트에서 직접 구현하고 브라우저 개발자 도구와 tsc --noEmit로 확인하세요. 별도 TypeScript 프로젝트에서 설치한 tsc 버전을 기록하세요. tsconfig.json에 strict를 켜고 tsc --noEmit으로 검사한 뒤, 실행 실습은 컴파일 출력 또는 로컬 개발 서버로 여세요. TS 타입 표기를 브라우저가 직접 실행한다고 가정하지 않습니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. tsconfig.json에는 compilerOptions의 strict·noEmit과 files:["lesson.ts"]를 설정하세요. lesson.ts에는 function double(value) { return value * 2 }와 let title: string = null;을 작성하세요.
2. 설치한 tsc 버전을 기록하고 tsc -p tsconfig.json --noEmit으로 strict=false/true 진단을 비교하세요. 매개변수를 value: number로, title 초기값을 문자열로 고친 뒤 오류가 없는지 확인하세요.
3. 실행용 출력 비교는 별도로 tsc -p tsconfig.json --noEmit false --outDir dist를 사용하세요. strict 변경 전후 같은 수정본을 출력해 타입 표기가 사라지는지 비교하세요. noEmit 검사만으로 출력 파일이 생겼다고 기록하지 마세요.

## 관찰할 변수

| 변수   | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설                                                                                                 |
| ------ | --------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| strict | false     | true      | 실행 전 가설: 암묵적 any와 null 관련 진단이 늘어날 수 있다. 다른 조건은 고정하고 실행 후 실제 결과를 따로 기록합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 설치한 tsc 버전과 두 설정의 진단을 남긴다.
- [ ] 수정 후 tsc --noEmit 오류가 0개다.

## 자가 점검

1. strict가 런타임 코드를 추가하나요?
2. noEmit은 어떤 산출물을 막나요?

## 공식 참고

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/typescript-step-02/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 JavaScript 런타임 경계 실험입니다. TypeScript 진단은 실행하지 않습니다. lesson.ts를 로컬 tsc --strict --noEmit --lib ES2023,DOM 으로 검사하세요.

- [example.js](../../../../../../src/labs/typescript-step-02/example.js)
- [lesson.ts](../../../../../../src/labs/typescript-step-02/lesson.ts)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 타입과 좁히기](../../01-foundations/README.md) · [다음: 추론과 리터럴 타입](../03/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
