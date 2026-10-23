// Listener cleanup and repeated mounts
// Editable experiment input and algorithm.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"Listener cleanup and repeated mounts","help":"Change the input from 1 mount to 5 mounts and run the experiment.","input":"Experiment JSON input","run":"Run experiment"}:{"title":"리스너 정리와 반복 마운트","help":"1회 → 5회 조건으로 입력을 바꿔 실행하세요.","input":"실험 JSON 입력","run":"실험 실행"};
const INITIAL={"mounts":5};
const controller=new AbortController(),signal=controller.signal;
const timers=[],urls=[];let disposed=false;
const later=(fn,delay)=>{const id=setTimeout(fn,delay);timers.push(id);return id};
const title=document.createElement('h2');title.textContent=messages.title;
const help=document.createElement('p');help.textContent=messages.help;
const editor=document.createElement('textarea');editor.value=JSON.stringify(INITIAL,null,2);editor.rows=10;editor.style.cssText='width:100%;font-family:monospace';editor.setAttribute('aria-label',messages.input);
const button=document.createElement('button');button.textContent=messages.run;
const output=document.createElement('pre');output.style.whiteSpace='pre-wrap';output.setAttribute('aria-live','polite');const stage=document.createElement('section');
const show=value=>{if(!disposed)output.textContent=typeof value==='string'?value:JSON.stringify(value,null,2)};
/** @param {any} input */
async function experiment(input){const target=new EventTarget();let calls=0,disposed=0;const mount=()=>{const handler=()=>calls++;target.addEventListener('ping',handler);const controller=new AbortController();return ()=>{target.removeEventListener('ping',handler);controller.abort();disposed++}};for(let i=0;i<input.mounts;i++){const dispose=mount();dispose()}const dispose=mount();target.dispatchEvent(new Event('ping'));dispose();target.dispatchEvent(new Event('ping'));return {calls,disposed,expectedCalls:1};}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}
