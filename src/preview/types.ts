export type RuntimeProfile = 'legacy' | 'html' | 'threejs'
export interface PreviewInput {
  code: string
  kind: 'javascript' | 'html'
  profile: RuntimeProfile
}
export interface HtmlPreviewModules {
  core?: string
  controls?: string
}
