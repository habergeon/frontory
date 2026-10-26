# React · 03 이벤트와 상태 스냅샷

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 컴포넌트와 상태 계산 · 편집 가능한 예제 · 저장 ID: `react-step-03`

## 목표와 학습 후 역량

- 초기 0에서 함수형 갱신 후 3을 표시한다.
- 일반 값 갱신 대조군의 결과를 별도로 기록한다.

## 선수 지식

useState로 숫자를 저장하고 JavaScript 함수와 화살표 함수를 읽을 수 있어야 합니다. 이 단위는 내장 예제의 세 버튼만으로 비교를 시작합니다.

## 핵심 개념과 설명

### 이벤트 핸들러를 실행하는 시점

내장 예제는 React.createElement로 버튼을 만듭니다. button(label, onClick) 도우미가 받은 함수를 버튼의 onClick에 연결하므로 클릭하기 전에는 증가 코드가 실행되지 않습니다. button('Snapshot +1 three times', () => { ... })의 화살표 함수가 실행을 미룹니다. onClick에 handleClick()처럼 함수 호출 결과를 넣으면 렌더 도중 실행합니다. 그 함수가 상태까지 바꾸면 다시 렌더하며 같은 호출을 반복할 수 있으므로 onClick에는 handleClick 또는 () => handleClick()처럼 함수를 전달하세요.

### 상태 스냅샷은 클릭 중에 바뀌지 않는다

const [count, setCount] = React.useState(0)은 현재 렌더에서 읽을 count와 다음 상태를 요청할 setCount를 줍니다. 화면이 0일 때 연결한 핸들러 안에서는 setCount를 호출한 뒤에도 count가 0입니다. setCount는 그 지역 변수에 새 숫자를 대입하지 않습니다. React가 다음 렌더에서 새 상태를 전달하면 화면과 핸들러도 그 값을 사용합니다. 버튼 코드의 count와 화면에 나중에 표시되는 값을 구별하면 이전 값이 로그에 나오는 이유를 설명할 수 있습니다.

### 같은 값을 세 번 예약하면 왜 1인가

Snapshot 버튼의 핵심은 setCount(count + 1); setCount(count + 1); setCount(count + 1);입니다. count가 0인 핸들러에서 세 식을 계산하면 모두 setCount(1)입니다. React는 한 이벤트의 갱신을 모아서 처리하며 이 경우 최종 상태는 1이 될 것으로 예상합니다. 호출 세 번이 버려졌다기보다 세 요청이 모두 같은 교체 값을 담았다고 읽으세요. 화면이 4일 때 같은 버튼을 한 번 누르면 세 요청은 모두 5이므로 예상 증가량은 여전히 1입니다.

### 함수형 updater는 앞선 계산 결과를 받는다

Updater 버튼은 setCount(c => c + 1)을 세 번 호출합니다. 이때 c는 핸들러가 캡처한 count가 아니라 React가 갱신 큐를 처리하며 전달하는 이전 결과입니다. 시작값이 0이면 첫 함수는 1, 다음 함수는 2, 마지막 함수는 3을 반환합니다. 따라서 한 번의 클릭 후 예상 표시는 3입니다. updater 안에서는 인자를 변경하거나 외부 배열에 로그를 쌓는 등 부수 효과를 만들지 말고 다음 숫자만 반환하세요. 개발 중 Strict Mode에서는 순수성을 확인하려 updater를 추가 호출할 수 있어 함수 호출 횟수를 화면 갱신 횟수로 세면 잘못 해석할 수 있습니다.

### 내장 코드에서 두 경로를 나란히 읽기

다음 코드는 내장 예제 Experiment 안의 두 핸들러를 함수로 풀어 쓴 것입니다. 편집하려면 기존 Experiment 함수를 통째로 바꾸세요. mount가 이미 정의한 h, out, button을 그대로 쓰며 JSX 변환은 필요 없습니다.

```js
function Experiment() {
  const [count, setCount] = React.useState(0);
  function snapshot() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }
  function updater() {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  }
  return h('div', null, out(count),
    button('Snapshot +1 three times', snapshot),
    button('Updater +1 three times', updater),
    button('Reset', () => setCount(0)));
}
```

두 함수의 차이는 다음 값을 미리 계산해 전달하는지, 이전 결과를 계산할 함수를 전달하는지에 있습니다. 버튼 수와 렌더 구조는 같게 두어 갱신 방식만 비교합니다.

### 한 클릭의 세 요청과 서로 다른 세 클릭

Snapshot 버튼을 한 번 클릭하면 같은 렌더의 count를 세 번 읽습니다. 화면 갱신을 확인한 뒤 버튼을 다시 클릭하면 새 렌더의 핸들러가 새 count를 읽습니다. Reset 뒤 Snapshot을 세 차례 따로 클릭할 때 예상 표시는 1 → 2 → 3입니다. Reset 뒤 Updater를 한 번 클릭할 때도 최종 숫자는 3이지만 입력 횟수와 큐에 담긴 계산이 다릅니다. 최종 숫자 하나만 기록하면 두 과정을 구별하지 못하므로 클릭 순서와 클릭마다 표시된 값도 남기세요.

### 예상값과 관찰값을 분리하는 기록

기준 실험의 예상값은 Reset → 0, Snapshot 한 번 → 1입니다. 변경 실험은 다시 Reset → 0, Updater 한 번 → 3입니다. Reset을 생략하고 Snapshot 다음에 Updater를 누르면 예상값은 4이므로 이를 실패로 기록하면 안 됩니다. 실제로 누르기 전에는 관찰값 칸을 비워 두세요. 예를 들어 기준: 시작 예상 0 / 시작 관찰 __ / 종료 예상 1 / 종료 관찰 __, 변경: 시작 예상 0 / 시작 관찰 __ / 종료 예상 3 / 종료 관찰 __로 적습니다. 브라우저와 실행 날짜도 함께 적으면 같은 입력으로 재확인할 수 있습니다.

### 실패를 좁히는 확인 순서

Updater 결과가 3이 아니면 먼저 Reset 뒤 화면이 0인지 확인하세요. 다음으로 세 줄 모두 c => c + 1인지 살핍니다. setCount(c => count + 1)처럼 내부에서 다시 바깥 count를 읽으면 세 함수가 같은 숫자를 반환하여 Snapshot과 같은 결과가 날 수 있습니다. 클릭 직후 핸들러 안에서 console.log(count)를 추가해 이전 값이 나와도 화면 갱신 실패로 판단하지 마세요. 그 로그는 현재 핸들러의 스냅샷을 읽습니다. 이 실험은 표시값과 큐의 계산을 확인하며 렌더 횟수나 처리 시간의 실측을 대신하지 않습니다.

### 기존 예제의 실행 확인 기록

기존 mount를 로컬 Vite 페이지에서 실행한 HeadlessChrome 151.0.7922.34 검증에서는 초기 0 → Snapshot 한 클릭 후 1 → Reset 후 0 → Updater 한 클릭 후 3 → Updater 한 번 더 클릭 후 6을 확인했습니다. 각 클릭 뒤 requestAnimationFrame 두 차례를 기다려 화면의 pre 값을 읽었습니다. 이는 해당 입력 순서의 표시값 기록입니다. 본문의 Experiment 교체 코드도 같은 브라우저에서 실행해 Snapshot을 서로 다른 세 클릭으로 누르면 1 → 2 → 3이 되고, Reset 뒤 Updater 한 클릭은 3이 됨을 확인했습니다. Strict Mode 호출 횟수와 렌더 성능을 측정한 결과는 포함하지 않습니다. 재현 코드는 [대표 강의 브라우저 검사](../../../../../../tests/browser/representative-lessons.js)에 있습니다.

## 실습 준비

프로젝트 의존성은 React 19.3.1과 react-dom 19.3.1입니다. 내장 예제 src/labs/react-step-03/example.js는 mount가 받는 React와 createRoot 및 React.createElement로 실행합니다. 이 단위의 버튼 비교에는 별도 프로젝트가 필요 없습니다. 별도 React Vite 프로젝트로 옮길 때만 React import와 루트 마운트 환경을 준비하고 버전·lockfile을 기록하세요.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 내장 예제의 초기 숫자와 Snapshot +1 three times, Updater +1 three times, Reset 버튼을 확인하세요. 현재 코드는 그대로 두고 기준 실험과 변경 실험의 예상값을 먼저 적으세요.
2. Reset을 눌러 화면이 0인지 확인한 뒤 Snapshot 버튼을 한 번 누르세요. 표시값을 관찰값으로 기록하고 같은 렌더에서 계산한 세 요청을 숫자로 풀어 쓰세요.
3. 다시 Reset을 눌러 0을 확인한 뒤 Updater 버튼을 한 번 누르세요. 표시값을 기록하고 큐의 중간 계산 0 → 1 → 2 → 3과 비교하세요.
4. Reset 후 Snapshot을 화면 갱신을 보며 세 번 따로 누르세요. 각 클릭 후 숫자를 적고 Updater 한 클릭과 입력 횟수의 차이를 설명하세요. 필요하면 위 Experiment 코드로 교체해 두 핸들러를 나란히 읽으세요.

## 관찰할 변수

| 변수      | 기준 조건       | 바꿀 조건         | 예상할 변화·검증 가설                  |
| --------- | --------------- | ----------------- | -------------------------------------- |
| 갱신 방식 | 스냅샷 값 세 번 | 함수형 갱신 세 번 | 한 클릭 증가량이 1에서 3으로 달라진다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 초기 0에서 함수형 갱신 후 3을 표시한다.
- [ ] 일반 값 갱신 대조군의 결과를 별도로 기록한다.

## 자가 점검

1. 화면이 5일 때 Snapshot 한 클릭의 세 setCount 인자는 각각 무엇이며 종료 예상값은 얼마인가요?
2. setCount(c => count + 1)이 setCount(c => c + 1)과 다른 이유를 큐의 각 입력과 반환값으로 설명해 보세요.
3. Reset 없이 Snapshot 다음에 Updater를 누르면 어떤 숫자를 예상하나요? 직접 실행한 관찰값과 예상값을 구별해 적으세요.

## 공식 참고

- [React 상태 스냅샷](https://react.dev/learn/state-as-a-snapshot)
- [React 상태 갱신 큐와 배칭](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React 이벤트 핸들러 전달](https://react.dev/learn/responding-to-events)
- [useState updater와 Strict Mode](https://react.dev/reference/react/useState#my-initializer-or-updater-function-runs-twice)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/react-step-03/example.js) · [실행 환경과 제한](../../../../../examples.md)

실제 React API 실험입니다. JSX 대신 createElement를 사용합니다.

원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: JSX와 순수한 렌더](../02/README.md) · [다음: 객체와 배열 갱신](../04/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
