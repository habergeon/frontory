// Event propagation and delegation
// Editable experiment input and algorithm.
export function mount({container,locale='ko'}) {
const messages=locale==='en'?{"title":"Event propagation and delegation","help":"Change the click target from the button to its inner span and run the experiment.","input":"Experiment JSON input","run":"Run experiment","display05":"The delegated handler removes the item even when you click the span inside the button.","display06":" Remove"}:{"title":"이벤트 전파와 위임","help":"버튼 → 내부 span 조건으로 입력을 바꿔 실행하세요.","input":"실험 JSON 입력","run":"실험 실행","display05":"버튼 내부 span을 눌러도 위임된 핸들러가 항목을 삭제합니다.","display06":" 삭제"};
const INITIAL=["Alpha","Beta","Gamma"];
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
async function experiment(input){stage.replaceChildren();const list=document.createElement('ul');input.forEach(title=>{const li=document.createElement('li'),button=document.createElement('button'),span=document.createElement('span');span.textContent=title+messages.display06;button.dataset.action='remove';button.append(span);li.append(button);list.append(li)});list.onclick=event=>{const target=event.target;if(!(target instanceof Element))return;const button=target.closest('[data-action="remove"]');if(button&&list.contains(button))button.closest('li')?.remove();};stage.append(list);return messages.display05;}
let generation=0;const run=async()=>{const current=++generation;try{const result=await experiment(JSON.parse(editor.value));if(current===generation)show(result)}catch(error){if(current===generation)show({error:String(error)})}};
button.addEventListener('click',run,{signal});container.append(title,help,editor,button,stage,output);run();
return ()=>{disposed=true;controller.abort();timers.forEach(clearTimeout);urls.forEach(url=>URL.revokeObjectURL(url));container.replaceChildren()};
}
