type State = {status:"idle"}|{status:"loading"}|{status:"done";value:string}|{status:"error";message:string};
function text(s:State):string { return s.status==="done" ? s.value : s.status==="error" ? s.message : s.status }
export {};
