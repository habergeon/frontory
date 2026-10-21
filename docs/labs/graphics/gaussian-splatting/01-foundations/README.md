# Gaussian Splatting · 01 3DGS 표현과 데이터

[시리즈 목차](../README.md) · [전체 기술 지도](../../../README.md)

단계: 표현과 투영의 기초 · 편집 가능한 예제 · 저장 ID: `gaussian-splatting-01`

## 목표와 학습 후 역량

- 세 장면 표현의 차이를 설명한다.
- Gaussian 속성의 역할을 분류한다.

## 선수 지식

Three.js 카메라·투영과 alpha blending

## 핵심 개념과 설명

### 표현 단위

mesh는 표면 연결 관계를 저장하고 Gaussian은 공간상의 분포를 저장합니다. NeRF의 신경망 질의와도 저장·렌더링 경로가 다릅니다.

### 파라미터

위치만으로 Gaussian의 형태와 색을 복원할 수 없습니다. scale·rotation·opacity와 색 표현의 의미를 함께 확인합니다.

## 실습 준비

기존 gaussian-splatting-01 미리보기는 출발점입니다. 이후 과제 전체의 구현이나 검증을 대신하지 않습니다. 별도 로컬 프로젝트의 문서 안내 실습입니다. 직접 만든 소형 데이터 또는 사용 허가를 확인한 로컬 파일만 사용합니다. 기존 미리보기는 1 MiB·512개 이하 .splat/ASCII GS PLY를 다루는 CPU 교육 뷰어이며 Spark GPU 렌더러가 아닙니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. representation.md에 mesh·NeRF·3DGS의 입력과 렌더링 출력을 표로 적으세요.
2. data.js에 위치·scale·quaternion·opacity·색을 가진 Gaussian 두 개를 작성하세요.
3. 기존 gaussian-splatting-01 CPU 예제에서 scale·opacity가 2D radial gradient 출력에 연결되는 경로를 그리세요. 3D 투영 구현은 gaussian-splatting-02 뷰어에서 별도로 확인하세요.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| scale | 두 축 0.1 | 한 축만 0.3 | 같은 중심에서 타원 방향의 폭만 커질 것으로 예상합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 세 표현의 저장 단위와 렌더 경로를 각각 한 줄 이상 작성한다.
- [ ] Gaussian 두 개의 필수 속성과 단위를 빠짐없이 적는다.

## 자가 점검

1. 일반 점 구름에는 어떤 속성이 부족한가요?
2. 카메라가 이동하면 어떤 입력을 다시 계산하나요?

## 공식 참고

- [Spark 공식 문서](https://sparkjs.dev/docs/)
- [3D Gaussian Splatting 연구 프로젝트](https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../src/labs/gaussian-splatting-01/example.js) · [실행 환경과 제한](../../../../examples.md)

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[다음: 출처와 파일 계약](../units/02/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
