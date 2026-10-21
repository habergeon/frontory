// Blob으로 JSON 내보내기
// 편집할 실험 입력과 알고리즘입니다.
export function mount({container}) {
const INITIAL={"notes":[{"id":1,"title":"한글\n줄바꿈"}]};
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent="Blob으로 JSON 내보내기";
const help=document.createElement('p');help.textContent="영문 → 한글과 줄바꿈 조건으로 입력을 바꿔 실행하세요.";
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label','실험 JSON 입력');
const button=document.createElement('button');button.textContent='실험 실행';
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){const blob=new Blob([JSON.stringify({schemaVersion:1,notes:input.notes},null,2)],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);urls.push(url);stage.replaceChildren();const a=document.createElement('a');a.href=url;a.download='notes.json';a.textContent='notes.json 다운로드';stage.append(a);return {bytes:blob.size,roundTrip:JSON.parse(await blob.text())};}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}
