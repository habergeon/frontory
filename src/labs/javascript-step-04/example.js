// 분기와 조기 반환
// 편집할 실험 입력과 알고리즘입니다.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"Branches and early returns","help":"Change the input from running to paused and run the experiment.","input":"Experiment JSON input","run":"Run experiment","display05":"Unknown status: ","display06":"A string is required","display07":"Idle","display08":"Running","display09":"Done"}:{"title":"분기와 조기 반환","help":"running → paused 조건으로 입력을 바꿔 실행하세요.","input":"실험 JSON 입력","run":"실험 실행","display05":"알 수 없는 상태: ","display06":"문자열 필요","display07":"대기","display08":"진행","display09":"완료"};
const INITIAL=["idle","running","done",null,"paused"];
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
async function experiment(input){function describe(status){if(typeof status!=='string')return {ok:false,message:messages.display06};switch(status){case 'idle':return {ok:true,message:messages.display07};case 'running':return {ok:true,message:messages.display08};case 'done':return {ok:true,message:messages.display09};default:return {ok:false,message:messages.display05+status};}}return input.map(describe);}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}
