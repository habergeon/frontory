# 학습 실행기 설계

React는 탐색·문서·코드·필기 UI를 담당하고 Three.js는 장면을 생성합니다. 학습 단위 ID가 문서와 저장 데이터를 연결합니다.

Monaco의 JS/TS worker가 입력을 검사하고, 검사를 통과한 JavaScript를 sandbox iframe에서 실행합니다. iframe에는 allow-scripts만 허용하며 부모 DOM과 저장소 접근을 분리합니다. 실행 오류는 메시지로 부모에게 전달합니다. 코드 교체와 unmount 시 animation frame·controls·renderer·geometry·material을 정리합니다.

localStorage는 소규모 텍스트 기록에 사용합니다. 실패 시 경고하고 메모리 사본을 유지합니다. 전체 백업을 검증한 후 단일 저장 연산으로 교체합니다. 보안과 저장 한계는 [사용법](../learning-workspace.md)에 설명합니다.
