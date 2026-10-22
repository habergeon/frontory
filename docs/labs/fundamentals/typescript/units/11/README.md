# TypeScript · 11 keyof와 속성 조회 함수

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 유니온과 제네릭 · 편집 가능한 예제 · 저장 ID: `typescript-step-11`

## 목표와 학습 후 역량

- title은 string, done은 boolean으로 추론된다.
- missing 키의 컴파일 오류를 남긴다.

## 선수 지식

10단위 「readonly와 변경 범위」의 결과물과 실험 기록

## 핵심 개념과 설명

### 키 유니온

keyof는 객체 타입의 키를 타입으로 얻습니다. 잘못된 이름을 문자열 대신 타입 오류로 잡습니다.

### 인덱스 접근

T[K]는 선택한 키의 값 타입입니다. 키와 반환값의 관계를 유지할 수 있습니다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 별도 로컬 프로젝트에서 직접 구현하고 브라우저 개발자 도구와 tsc --noEmit로 확인하세요. 별도 TypeScript 프로젝트에서 설치한 tsc 버전을 기록하세요. tsconfig.json에 strict를 켜고 tsc --noEmit으로 검사한 뒤, 실행 실습은 컴파일 출력 또는 로컬 개발 서버로 여세요. TS 타입 표기를 브라우저가 직접 실행한다고 가정하지 않습니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. property.ts 파일에 title, done, 없는 missing 키 조건을 준비하세요.
2. getProperty를 T와 K extends keyof T로 정의하고 제목·완료 필드를 읽으세요.
3. title, done, 없는 missing 키 조건으로 실행하세요. 확인할 결과: title은 string, done은 boolean으로 추론된다. missing 키의 컴파일 오류를 남긴다. 예상과 실제 결과는 구분해 기록하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 조회 키 | title | missing | 실행 전 가설: 없는 키 호출이 거부될 것이다. 다른 조건은 고정하고 실행 후 실제 결과를 따로 기록합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] title은 string, done은 boolean으로 추론된다.
- [ ] missing 키의 컴파일 오류를 남긴다.

## 자가 점검

1. 반환 타입을 unknown으로 쓰면 무엇을 잃나요?
2. keyof가 런타임 키 목록을 만들까요?

## 공식 참고

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/typescript-step-11/example.js) · [실행 환경과 제한](../../../../../examples.md)

미리보기는 JavaScript 런타임 경계 실험입니다. TypeScript 진단은 실행하지 않습니다. lesson.ts를 로컬 tsc --strict --noEmit --lib ES2023,DOM 으로 검사하세요.

- [example.js](../../../../../../src/labs/typescript-step-11/example.js)
- [lesson.ts](../../../../../../src/labs/typescript-step-11/lesson.ts)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: readonly와 변경 범위](../10/README.md) · [다음: 제네릭 함수와 추론](../12/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
