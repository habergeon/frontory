type Note={id:number;title:string;done:boolean};
type Patch=Partial<Omit<Note,"id">>;
type Summary=Pick<Note,"id"|"title">;
function apply(note:Note,patch:Patch):Note { return {...note,...patch} }
export {};
