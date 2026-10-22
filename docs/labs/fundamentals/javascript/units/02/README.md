# JavaScript · 02 문자열 입력과 숫자 변환

[시리즈 목차](../../README.md) · [전체 기술 지도](../../../../README.md)

단계: 값과 계산 · 편집 가능한 예제 · 저장 ID: `javascript-step-02`

## 목표와 학습 후 역량

- 네 입력의 판정과 타입을 기록한다.
- 공백과 음수에서 저장 건수가 늘지 않는다.

## 선수 지식

1단위 「값과 상태」의 결과물과 실험 기록

## 핵심 개념과 설명

### 입력 타입

폼의 input.value는 문자열입니다. 예를 들어 "15" + 1은 "151"이고 Number("15") + 1은 16입니다. 이 실습도 문자열을 숫자로 바꾸는 과정을 다룹니다. 다만 예제의 입력란은 일반 숫자 입력이 아니라 JSON 편집기입니다. ["15", "", "15px", "-1"]처럼 문자열 배열을 넣으면 JSON.parse가 배열을 만들고 각 원소가 raw로 전달됩니다. 숫자 15, null, 객체를 섞으면 raw.trim()에서 오류가 날 수 있으므로 따옴표를 유지하세요.

### 변환과 유효성 검사

Number(raw)는 숫자로 변환할 수 있는지 확인하는 단계이고 ok는 저장을 허용할지 정하는 단계입니다. 예제는 raw.trim() !== "", Number.isFinite(value), value >= 0을 모두 만족해야 ok를 true로 만듭니다. Number("")와 Number("  ")는 0이지만 공백 검사에서 거부됩니다. "0"은 비어 있지 않은 유한한 0이므로 허용됩니다. 변환 결과만 보고 빈 입력을 0분으로 저장하지 않도록 두 단계를 분리합니다.

### NaN과 출력의 null

"15px"을 Number로 바꾸면 NaN, "Infinity"를 바꾸면 Infinity가 됩니다. 둘 다 Number.isFinite 검사에서 false입니다. 화면은 결과를 JSON.stringify로 표시하므로 NaN과 Infinity가 value: null로 보입니다. 실제 변환값이 JavaScript의 null로 바뀐 것은 아닙니다. 콘솔에서 Number.isNaN(Number("15px"))와 Number("Infinity") === Infinity를 확인하면 표시 형식과 원래 값을 구분할 수 있습니다.

### 입력 정책의 경계

현재 조건은 0 이상의 유한한 수를 허용하므로 소수, "0x10"의 16, "1e3"의 1000도 통과합니다. 이 결과가 분 입력 정책에 맞는지는 별도로 정해야 합니다. 정수 분만 허용한다면 Number.isInteger(value)를 추가하고, 10진 숫자 표기만 받으려면 변환 전에 허용할 문자열 문법을 정의하세요. parseInt("15px", 10)은 15를 읽으므로 이 함수로 바꾸기만 하면 잘못된 단위 문자열까지 통과할 수 있습니다.

### 오류를 고치고 다시 실행하기

JSON은 문자열에 큰따옴표를 쓰며 배열 끝에 불필요한 쉼표를 둘 수 없습니다. [만 입력하면 JSON.parse가 오류를 던지고 화면에는 error가 나옵니다. 오류 객체의 구체적인 문구는 브라우저에 따라 다를 수 있습니다. 입력을 ["2"]로 고쳐 실험 실행을 다시 누르면 새 결과가 표시됩니다. 페이지를 새로 열 필요는 없습니다.

### 예제와 저장 과제의 범위

현재 예제는 raw, type, ok, value를 계산해 보여 주며 저장 목록은 구현하지 않습니다. 공백과 음수에서 저장 건수가 늘지 않는다는 완료 기준은 아래 별도 코드로 확인합니다. 모든 행의 type이 string인지, 변환된 value가 무엇인지, 최종 ok가 무엇인지 각각 기록하면 문자열 입력과 숫자 판정을 혼동하지 않을 수 있습니다.

### 복사해서 실행할 저장 코드

별도 폴더의 index.html과 numbers.js를 아래 내용으로 만드세요. 로컬 HTTP 서버에서 index.html을 열고 개발자 도구 콘솔을 확인합니다. 이 코드는 강의 예제 화면의 저장 기능을 뜻하지 않으며 문자열 배열 입력을 전제로 합니다.

```html
<!doctype html>
<html lang="ko">
<meta charset="utf-8">
<title>숫자 입력 저장 실험</title>
<script type="module" src="./numbers.js"></script>
</html>
```

```js
function parseMinutes(raw) {
  if (raw.trim() === "") return { ok: false, error: "값을 입력하세요" };
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    return { ok: false, error: "0 이상의 유한한 수를 입력하세요" };
  }
  return { ok: true, value };
}
const saved = [];
const inputs = ["15", "", "15px", "-1", "  ", "0"];
for (const raw of inputs) {
  const before = saved.length;
  const result = parseMinutes(raw);
  if (result.ok) saved.push(result.value);
  if (!result.ok) console.assert(saved.length === before, raw);
  console.log({ raw, type: typeof raw, result, count: saved.length });
}
console.assert(JSON.stringify(saved) === "[15,0]", saved);
```

## 실습 준비

시작 예제는 문자열 배열 JSON을 읽고 판정 결과를 표시합니다. 실험 실행 버튼으로 입력을 다시 처리하세요. 저장 목록과 parseMinutes는 별도 과제이므로 로컬 프로젝트의 numbers.js에서 구현합니다. index.html에 script type="module"로 연결하고 로컬 HTTP 서버로 여세요. 개발자 도구 콘솔에서 원래 숫자 값과 console.assert 결과를 확인합니다.

연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.

## 실습 과제

1. 강의 예제를 열고 실험 JSON 입력에 ["15", "", "15px", "-1"]을 붙여 넣은 뒤 실험 실행을 누르세요. 실행 전 각 행의 type, value, ok를 예상해 적으세요. 문자열 배열이므로 숫자처럼 보이는 15에도 큰따옴표가 필요합니다.
2. 출력에서 raw가 "15"인 행은 string / 15 / true, 빈 문자열은 string / 0 / false, "15px"는 string / null / false, "-1"은 string / -1 / false인지 확인하세요. 여기의 순서는 type / 화면의 value / ok입니다. null 표시는 NaN의 JSON 표현이라는 설명도 기록하세요. Windows Chromium 151에서 기존 예제를 실행한 기록은 이 네 판정과 일치했습니다. 자신의 실행값은 별도 측정 칸에 적으세요.
3. JSON 입력을 ["  ", "0", "Infinity", "0x10", "1e3"]으로 바꿔 실험 실행을 누르세요. 예상 ok는 false, true, false, true, true이고 화면의 value는 0, 0, null, 16, 1000입니다. 이 경계 입력도 기존 Chromium 151 실행 기록과 일치했습니다. 0을 거부하는 if (!value) 검사를 쓰면 어떤 행이 틀리는지 설명하세요.
4. 입력란을 [로 바꾸고 실험 실행을 눌러 error 표시를 확인하세요. 이어 ["2"]로 수정하고 같은 버튼을 다시 눌러 value 2, ok true로 복구되는지 보세요. 이 오류 표시와 복구는 기존 브라우저 기록에서 확인했습니다. [15]처럼 문자열이 아닌 원소를 넣었을 때의 오류와 JSON 문법 오류는 발생 단계가 다릅니다.
5. 저장 조건은 개념 설명의 「복사해서 실행할 저장 코드」를 이용해 별도 프로젝트에서 확인하세요. index.html과 numbers.js를 각각 복사하고 로컬 HTTP 서버로 연 뒤 콘솔의 console.assert 실패가 없는지 확인하세요.
6. 별도 코드의 예상 저장 목록은 [15, 0], 건수는 2입니다. 빈 문자열·공백·단위가 붙은 문자열·음수를 처리하기 전후의 건수를 비교하고 실제 콘솔 결과를 적으세요. 이 저장 과제의 코드는 현재 예제 화면에 자동으로 반영되지 않습니다.
7. Number와 parseInt의 차이는 콘솔에서 console.log(Number("15px"), parseInt("15px", 10));로 비교하세요. 이어 "2.5", "0x10", "1e3"을 parseMinutes에 넣어 보고 정수만 허용할지, 10진 표기만 허용할지 자신의 입력 정책을 한 문장으로 정하세요. 정책을 바꾸면 기대값도 다시 정해야 합니다.
8. 실험 기록에는 입력 원문 / 실행 전 예상 / 실행 후 화면 또는 콘솔 값 / 차이의 원인을 남기세요. 성공 여부만 쓰지 말고 빈 문자열의 value가 0인데도 ok가 false인 이유와 화면의 null이 실제 null을 뜻하지 않는 이유를 설명하면 완료입니다.

## 관찰할 변수

| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |
| --- | --- | --- | --- |
| 문자열 | 15 | 빈 문자열 | 실행 전 가설: 빈 값을 0분으로 저장하지 않고 거부할 것이다. 다른 조건은 고정하고 실행 후 실제 결과를 따로 기록합니다. |

표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.

## 완료 조건

- [ ] 네 입력의 판정과 타입을 기록한다.
- [ ] 공백과 음수에서 저장 건수가 늘지 않는다.

## 자가 점검

1. parseInt는 15px을 어떻게 처리하나요?
2. number 입력의 제약만 믿을 수 있나요?

## 공식 참고

- [MDN Number — 숫자 변환](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion)
- [MDN Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite)
- [MDN String.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
- [MDN JSON.stringify — NaN과 Infinity 표시](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description)
- [MDN JSON.parse — JSON 문법 오류](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#exceptions)
- [MDN parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [MDN HTMLInputElement.value](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value)

## 연결된 예제와 실행 범위

[예제 원본](../../../../../../src/labs/javascript-step-02/example.js) · [실행 환경과 제한](../../../../../examples.md)

편집 가능한 입력과 실제 브라우저 실행 결과를 비교합니다.


원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.

## 다음 학습

[이전: 값과 상태](../../01-foundations/README.md) · [다음: 동등 비교와 기본값](../03/README.md)

## 실험 기록 — 직접 작성

### 목표

### 핵심 개념

### 바꾼 변수와 예상

### 실제 결과

### 배운 점

### 남은 질문
