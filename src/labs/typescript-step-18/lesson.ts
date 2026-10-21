type Theme={foreground:string;background:string};
const theme={foreground:"#111",background:"#fff"} as const satisfies Theme;
// @ts-expect-error misspelled foreground
const bad={foregound:"#111",background:"#fff"} satisfies Theme;
export {};
