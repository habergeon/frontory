import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker.js?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker.js?worker'
import TypeScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker.js?worker'

self.MonacoEnvironment = {
  getWorker(_id, label) {
    return label === 'typescript' || label === 'javascript'
      ? new TypeScriptWorker()
      : label === 'html'
        ? new HtmlWorker()
        : new EditorWorker()
  },
}
for (const defaults of [
  monaco.typescript.javascriptDefaults,
  monaco.typescript.typescriptDefaults,
]) {
  defaults.setCompilerOptions({
    target: monaco.typescript.ScriptTarget.ESNext,
    module: monaco.typescript.ModuleKind.ESNext,
    // A fixed .html virtual URI uses this option to select the JS/TS worker script kind.
    allowJs: defaults === monaco.typescript.javascriptDefaults,
    checkJs: true,
    strict: false,
    noEmit: false,
    allowNonTsExtensions: true,
    sourceMap: false,
  })
  defaults.setModeConfiguration({
    ...defaults.modeConfiguration,
    diagnostics: false,
  })
  defaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })
  defaults.addExtraLib(
    'interface StudyContext { THREE: any; OrbitControls: any; React: any; createRoot: any; Vue: any; Fiber: any; PIXI: any; gsap: any; ScrollTrigger: any; animate: any; Motion: any; writable: any; container: HTMLElement }',
    'file:///study-context.d.ts',
  )
}
export { monaco }
