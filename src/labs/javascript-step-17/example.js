// 디바운스와 타이머 정리
// 편집할 실험 입력과 알고리즘입니다.
export function mount({container}) {
const INITIAL={"delay":300,"query":"grid"};
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent="디바운스와 타이머 정리";
const help=document.createElement('p');help.textContent="0ms → 300ms 조건으로 입력을 바꿔 실행하세요.";
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label','실험 JSON 입력');
const button=document.createElement('button');button.textContent='실험 실행';
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){stage.replaceChildren();const field=document.createElement('input');field.value=input.query;const result=document.createElement('output');let pending;field.oninput=()=>{clearTimeout(pending);pending=later(()=>{result.textContent='검색 실행: '+field.value},input.delay)};stage.append(field,result);field.dispatchEvent(new Event('input'));return '빠르게 입력하세요. 실행 시점은 마지막 입력 이후 '+input.delay+'ms입니다.';}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}
