type Result<T>={ok:true;value:T}|{ok:false;error:string};
async function load():Promise<Result<string>> { try{return {ok:true,value:await Promise.resolve("A")}}catch(error:unknown){return {ok:false,error:error instanceof Error?error.message:String(error)}} }
export {};
