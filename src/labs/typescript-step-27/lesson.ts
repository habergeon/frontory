type Context={container:HTMLElement};
interface Plugin { mount(context:Context):()=>void }
const plugin:Plugin={mount({container}){const node=document.createElement("button");container.append(node);return ()=>node.remove()}};
export {};
