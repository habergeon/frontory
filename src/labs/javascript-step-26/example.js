// 계산 비용과 작업 분할
// 편집할 실험 입력과 알고리즘입니다.
export function mount({container}) {
const INITIAL={"count":10000,"batch":500};
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent="계산 비용과 작업 분할";
const help=document.createElement('p');help.textContent="시간은 현재 기기의 관찰값이며 성능 우열을 단정하지 않습니다. count와 batch를 같은 조건으로 비교하세요.";
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label','실험 JSON 입력');
const button=document.createElement('button');button.textContent='실험 실행';
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){if(!Number.isInteger(input.batch)||input.batch<1||input.count<0||input.count>1000000)throw new Error('batch >= 1, count 0..1000000');let hits=0,yields=0;const started=performance.now();stage.replaceChildren();const button=document.createElement('button');button.textContent='응답 확인';button.onclick=()=>button.textContent='클릭 처리됨';stage.append(button);for(let start=0;start<input.count;start+=input.batch){for(let i=start;i<Math.min(start+input.batch,input.count);i++)if(('record '+i).includes('5'))hits++;await new Promise(resolve=>later(resolve,0));yields++}return {hits,yields,milliseconds:performance.now()-started};}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}
