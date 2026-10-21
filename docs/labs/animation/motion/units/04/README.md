# Motion · 04 Spring의 물리 변수

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 상태와 Transition · 편집 가능한 예제 · 저장 ID: `motion-step-04`

## 목표와 학습 후 역량

- 학습 결과: Stiffness의 역할을 설명한다. 입력 사례: x=0과 x=160.
- 산출물: 초과 이동과 안정화 관찰 기록. Damping 처리 근거를 코드와 연결해 설명한다.

## 선수 지식

3단위 「Transition 구성」의 Tween 및 속성별 설정 실습 결과를 준비한다.

## 핵심 개념과 설명

### Stiffness

stiffness는 목표로 돌아가는 힘과 관련된다. 값이 커지면 응답이 달라진다.

### Damping

damping은 진동을 억제한다. duration 기반 spring 설정과 물리 설정을 섞어 해석하지 않는다.

## 실습 준비

예제 화면의 실행 범위 안내를 먼저 확인하세요. 다음은 과제를 별도 프로젝트로 확장할 때의 준비 환경입니다. 기존 motion-01·02·03은 Motion JS animate 기반의 제한된 예제다. React layout·AnimatePresence·hooks는 별도 로컬 React 프로젝트에 motion을 설치하고 motion/react에서 가져와 실습한다. 편집기에서 JSX가 바로 실행된다고 가정하지 않으며 CSP와 격리를 유지한다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 별도 실습 프로젝트의 src/day-4.tsx에 type:spring에 stiffness·damping을 명시하고 목표를 전환한다. 기존 1·14·28단위 예제는 출발점으로만 참고한다.
2. 입력 조건: x=0과 x=160. 기준: 10. 기준 조건에서 실행한 뒤 관찰값과 오류를 notes/day-4.md에 남긴다.
3. 변경 변수: damping. 변경값: 30. 같은 입력 경로로 다시 실행한다. 저장할 산출물: 초과 이동과 안정화 관찰 기록. 확인할 가설: 진동이 줄어드는 경향을 보인다. 실제 결과와 비교해 일치 여부 및 차이의 원인을 기록한다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| damping | 10 | 30 | 진동이 줄어드는 경향을 보인다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 필수 산출물: 초과 이동과 안정화 관찰 기록. 기준 및 변경 조건 각각의 결과가 있어 총 2조건을 비교할 수 있고, 입력값과 실행 환경을 함께 기록했다.
- [ ] 두 조건의 차이에 관한 설명에 다음 개념을 모두 연결했다: Stiffness, Damping. 예상과 다른 항목은 원인 또는 미해결 이유를 1개 이상 적었다.

## 자가 점검

1. 이번 실습에서 Stiffness 개념은 어느 처리 단계에 영향을 주는가? 입력 사례: x=0과 x=160.
2. 변경 변수: damping. 확인할 가설: 진동이 줄어드는 경향을 보인다. 실제 결과가 가설과 일치했는가? Damping 관점에서 근거를 설명하라.

## 공식 참고

- [Motion React animation](https://motion.dev/docs/react-animation)
- [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/motion-step-04/example.js) · [실행 환경과 제한](../../../../../examples.md)

Interactive Spring의 물리 변수 experiment with resource cleanup.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: Transition 구성](../03/README.md) · [다음: Keyframes](../05/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
