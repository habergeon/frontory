# GLSL · 11 Texture sampling

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 좌표·질감·시간 표현 · 문서 기반 직접 구현 · 저장 ID: `glsl-step-11`

## 목표와 학습 후 역량

- Texture를 shader에 연결한다.
- 샘플링 상태의 효과를 비교한다.

## 선수 지식

10단위 결과물과 기록을 이어 사용합니다. Texture sampling 실험에 앞서 이전 입력과 기준 출력을 보관합니다.

## 핵심 개념과 설명

### 샘플 좌표

texture는 UV 위치에서 저장된 색을 읽습니다. WebGL2 GLSL ES 3.00에서는 texture 함수를 사용합니다.

### 경계와 필터

wrap과 filter는 texture object 상태입니다. shader의 UV 계산만 바꿔도 기존 sampler 설정과 결합되어 다른 결과가 나옵니다.

## 실습 준비

별도 localhost 프로젝트에서 WebGL2와 GLSL ES 3.00으로 직접 구현하는 문서 안내 실습입니다. 기존 예제의 GLSL 버전을 먼저 확인하고 1.00 문법을 혼용하지 않습니다.

이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.

## 실습 과제

1. texture.js에서 직접 만든 4×4 체크 패턴을 업로드하세요.
2. sampler2D uniform에 texture unit을 연결하고 fragment에서 texture를 호출하세요.
3. UV를 0..2로 넓혀 CLAMP_TO_EDGE·REPEAT와 NEAREST·LINEAR를 비교하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| wrap | CLAMP_TO_EDGE | REPEAT | 범위 밖 UV에서 가장자리 연장 대신 패턴 반복이 보일 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] texture unit과 sampler uniform 연결 값을 기록한다.
- [ ] 두 wrap과 두 filter 결과를 각각 저장한다.

## 자가 점검

1. uniform1i에 texture 객체를 넣을 수 있나요?
2. 패턴이 뒤집혔을 때 shader와 업로드 중 어느 쪽을 확인하나요?

## 공식 참고

- [GLSL ES 3.00 명세](https://registry.khronos.org/OpenGL/specs/es/3.0/GLSL_ES_Specification_3.00.pdf)

## 연결된 예제와 실행 범위

문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 타일링과 반복 좌표](../10/README.md) · [다음: 미분과 가장자리 완화](../12/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
