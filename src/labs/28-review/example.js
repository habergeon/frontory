// 실행 가능한 결과 기록 폼입니다. 실제로 수행한 항목만 입력하세요. 배포는 수행하지 않습니다.
export function mount({container}){
  container.innerHTML='<h2>실습 재현 카드</h2><label>제목<input id="title" value="나의 WebGL 실험"></label><label>바꾼 변수<input id="variable" placeholder="예: DPR 2 → 1"></label><label>실제 결과<textarea id="result" placeholder="직접 측정한 값과 조건"></textarea></label><label><input type="checkbox" id="verified">재현 확인</label><pre></pre>'
  const render=()=>{const title=container.querySelector('#title')['value'],variable=container.querySelector('#variable')['value'],result=container.querySelector('#result')['value'],verified=container.querySelector('#verified')['checked'];container.querySelector('pre').textContent='# '+title+'\n\n## 바꾼 변수\n'+variable+'\n\n## 실제 결과\n'+result+'\n\n- ['+(verified?'x':' ')+'] 재현 확인\n- [ ] 공개 자산 권한 확인\n- [ ] 배포는 별도 결정'}
  container.addEventListener('input',render);render()
  return()=>{container.removeEventListener('input',render);container.replaceChildren()}
}
