# 공식 참조 출처와 원본 자료

`manifest.json`은 23개 시리즈가 사용하는 20개 공식 출처와 실제 실행 범위를 기록한다. 여러 시리즈가 같은 HTML Standard나 Three.js 자료를 공유한다. 강의 644개와 절별 연결, 본문 변환, 내부 읽기 화면은 아직 구현하지 않았다.

`series[].runtime`은 설치 패키지, 브라우저, 외부 도구, 자체 예제, Monaco에 포함된 서비스를 구분한다. 저장소 TypeScript 검사는 `7.0.2`, Monaco `0.55.1`의 서비스 원본에 표시된 TypeScript는 `5.9.3`이다. 외부 학습 프로젝트의 compiler와 Playwright·WABT, 브라우저 빌드에는 확인하지 않은 버전을 채우지 않았다. 설치 파일 확인은 실제 배포 브라우저에서 버전을 측정한 결과와 다르다.

`revision.kind=live`의 `reviewedOn`은 기존 공식 출처 조사에서 확인한 날짜다. `basis=prior-official-research`는 이 구현 중 해당 URL을 새로 조회한 시각이라는 뜻이 아니다. 불변 문서 revision과 실행 환경의 대응을 확인하지 않은 자료는 `compatibility.status=unverified`로 남겼다. Three.js만 확보한 package·commit 근거로 `exact`이며, npm tarball과 Git tree 전체가 같다는 주장까지 포함하지 않는다.

권리 상태와 본문 상태는 별개다. `confirmed`도 선택 파일별 고지와 외부 자산을 수집 전에 검토해야 한다. `needs-review` 또는 `restricted` 자료는 사유를 한국어·영어로 기록하고 링크만 제공한다. PixiJS·GSAP·Motion 사이트 전문은 보관하지 않았다.

## Three.js 원본

`raw/three-r186/`에는 commit `9b4a2ac29c63ccb43fd51c5661f2f873ac2c39b8`에서 이미 확보한 7개 파일을 원래 bytes 그대로 복사했다. 실제 취득 시각·SHA-256·Git blob SHA는 `provenance/three-source-evidence.json`에서 보존했고 manifest에도 연결했다. 태그는 `r186`, package version은 `0.186.1`이다. 추측한 `r186.1` 태그를 사용하지 않는다.

7개 가운데 본문 후보는 Creating Text와 Object3D·PerspectiveCamera·TextGeometry API의 4개다. 나머지는 LICENSE, package.json, manual 목차다. `raw-only`는 내부에서 읽을 수 있는 본문이 완성됐다는 뜻이 아니다. 선택 문서에 적용되는 [MIT 고지](raw/three-r186/LICENSE.txt)를 함께 보관한다. 이미지·폰트·동영상·외부 패키지는 포함하지 않았다.

원본 HTML에는 script와 전용 문서 표기가 남아 있다. `.html.txt`를 포함한 모든 사본은 실행할 수 없는 자료 경로에 두었고 public 디렉터리로 복사하거나 정적 HTML로 공개하지 않았다. 이 자료의 script를 import하거나 실행하지 않는다. 읽기용 변환·링크와 anchor 정비·script 제거는 R02에서 별도로 검증한다. `.gitattributes`는 raw 자료의 Git 줄바꿈 변환을 막는다.

## 검사

저장소 루트에서 `node scripts/check-references.mjs`와 `node --test tests/references.test.mjs`를 실행한다. 네트워크 조회나 원문 재취득 없이 catalog 범위, 선언·lock·설치 버전, Monaco 서비스 상수, raw hash와 provenance, LICENSE·package 근거, 상태와 사유를 검사한다.

현재 결과는 `series=23`, `sources=20`, `rawFiles=7`, `readableDocuments=0`이다. 수집되지 않은 source를 내부 전문 제공 완료로 집계하지 않는다. 이 검사는 URL이 현재 접속되거나 본문 권리가 바뀌지 않았다는 것을 보장하지 않는다. 온라인 변경 감지는 R04의 별도 작업이다.
