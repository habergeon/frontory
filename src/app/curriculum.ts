import exampleSource from '../labs/01-scene/example.js?raw'
import catalog from './catalog.json'

export interface Unit {
  id: string
  day: number
  week: number
  title: string
  goal: string
  docPath: string
  seriesId: string
  source?: string
}
export const series = catalog.series
export const units: Unit[] = catalog.units
units[0].source = exampleSource
export const legacyUnitIds = units.filter(unit => unit.seriesId === 'webgl').map(unit => unit.id)
export const categories: Record<string, string> = {
  fundamentals: '언어와 웹 기초', frameworks: 'UI 프레임워크', graphics: '그래픽스',
  shader: '셰이더', animation: '애니메이션', engineering: '엔지니어링', testing: '테스트',
}
export const documents = import.meta.glob<string>('/docs/**/*.md', {
  query: '?raw', import: 'default', eager: true,
})
