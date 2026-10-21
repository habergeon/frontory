import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
const baseline = read('content/catalog-v2.json')
const categories = { fundamentals: '언어 및 기초', frameworks: 'UI 프레임워크', graphics: '그래픽스', shader: '셰이더', animation: '애니메이션', engineering: '엔지니어링', testing: '테스트' }
const outputs = new Map()
const catalog = { series: [], units: [] }
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to)
const link = (from, to, title) => `[${title}](${relative(from, to)})`
const bullets = values => values.map(value => '- ' + value).join('\n')
const numbered = values => values.map((value, index) => `${index + 1}. ${value}`).join('\n')
const table = value => value.replaceAll('|', '\\|').replaceAll('\n', ' ')

for (const series of baseline.series) {
  if (series.id === 'webgl') {
    catalog.series.push(series)
    catalog.units.push(...baseline.units.filter(unit => unit.seriesId === series.id))
    continue
  }
  const content = read(`content/curricula/${series.id}.json`)
  if (content.seriesId !== series.id || content.stages.length !== 4 || content.units.length !== 28) throw Error('Invalid series: ' + series.id)
  const base = path.posix.dirname(series.docPath)
  const units = content.units.map((unit, index) => {
    if (unit.day !== index + 1) throw Error('Invalid sequence: ' + unit.id)
    const old = baseline.units.find(item => item.id === unit.id)
    if (old && (old.seriesId !== series.id || old.title !== unit.title)) throw Error('Changed legacy identity: ' + unit.id)
    const docPath = old?.docPath ?? `${base}/units/${String(unit.day).padStart(2, '0')}/README.md`
    return { id: unit.id, day: unit.day, week: Math.ceil(unit.day / 7), title: unit.title, goal: unit.outcomes.join(' '), docPath, seriesId: series.id }
  })
  catalog.series.push({ ...series, stages: content.stages })
  catalog.units.push(...units)
  const intro = [
    `# ${series.title}`, '', link(series.docPath, '/docs/labs/README.md', 'Frontory 기술 지도'), '',
    `${categories[series.category]} · 4단계 · 28개 학습 단위`, '',
    '## 시리즈 목표', '', content.goal, '', '## 선수 지식', '', series.prerequisites, '',
    '## 실습 방식과 제공 범위', '',
    '학습 단위는 날짜가 아닙니다. 설명과 과제를 읽고, 완료 조건을 확인한 뒤 다음 단위로 이동하세요. 기존 세 예제는 출발점으로 유지하며 나머지 25개 단위는 문서 기반 직접 구현 과제입니다. 내장 실행 예제와 별도 환경이 필요한 과제를 구분해서 표시합니다. 예제를 여는 것만으로 학습을 완료한 것으로 처리하지 않습니다.', '',
    '기존 단위 ID와 필기는 유지됩니다. 기존 01·02·03 예제는 확장된 학습 순서의 1·14·28번째에 연결되므로 주소의 숫자와 화면의 학습 순서가 다를 수 있습니다.', '',
    '## 학습 경로', '',
  ]
  content.stages.forEach((stage, index) => {
    intro.push(`### ${index + 1}단계 · ${stage}`, '', ...units.filter(unit => unit.week === index + 1).map(unit => `- ${link(series.docPath, unit.docPath, `${String(unit.day).padStart(2, '0')}. ${unit.title}`)} — ${baseline.units.some(old => old.id === unit.id) ? '기존 예제에서 확장' : '문서 기반 직접 구현'}`), '')
  })
  intro.push('## 통합 프로젝트와 제출물', '', content.capstone, '',
    '구현 코드와 실행 방법, 기준 조건과 변경 조건의 기록, 실패 사례와 복구 방법을 함께 남기세요. 측정하지 않은 성능과 수행하지 않은 테스트는 결과로 기재하지 않습니다.', '',
    '## 공식 참고', '', ...[...new Map(content.units.flatMap(unit => unit.references).map(reference => [reference.url, reference])).values()].map(reference => `- [${reference.title}](${reference.url})`), '')
  outputs.set(series.docPath.slice(1), intro.join('\n'))
  content.units.forEach((unit, index) => {
    const entry = units[index]
    const old = baseline.units.some(item => item.id === unit.id)
    const lines = [
      `# ${series.title} · ${String(unit.day).padStart(2, '0')} ${unit.title}`, '',
      link(entry.docPath, series.docPath, '시리즈 목차') + ' · ' + link(entry.docPath, '/docs/labs/README.md', '전체 기술 지도'), '',
      `단계: ${content.stages[entry.week - 1]} · ${old ? '기존 예제에서 확장' : '문서 기반 직접 구현'} · 저장 ID: \`${unit.id}\``, '',
      '## 목표와 학습 후 역량', '', bullets(unit.outcomes), '',
      '## 선수 지식', '', unit.prerequisites, '',
      '## 핵심 개념과 설명', '', ...unit.concepts.flatMap(concept => [`### ${concept.title}`, '', concept.explanation, '']),
      '## 실습 준비', '', unit.environment, '',
      old ? '연결된 예제는 출발점입니다. 아래 과제 전체가 완성된 코드는 아니며, 예제의 지원 범위를 넘는 작업은 별도 프로젝트에서 수행하세요.' : '이 단위에는 내장 실행 예제가 없습니다. 아래 절차에 따라 별도 실습 파일을 만들고 실행 결과를 필기에 남기세요. 코드 파일은 작업 폴더에서 따로 보관하고 Frontory 필기는 JSON 또는 Markdown으로 백업하세요.', '',
      '## 실습 과제', '', numbered(unit.steps), '',
      '## 관찰할 변수', '', '| 변수 | 기준 조건 | 바꿀 조건 | 예상할 변화·검증 가설 |', '| --- | --- | --- | --- |',
      ...unit.variables.map(variable => `| ${[variable.name, variable.baseline, variable.change, variable.expected].map(table).join(' | ')} |`), '',
      '표의 예상은 측정 결과가 아닙니다. 한 번에 한 조건만 바꾸고 실제 결과가 다르면 원인을 기록하세요.', '',
      '## 완료 조건', '', unit.criteria.map(criterion => '- [ ] ' + criterion).join('\n'), '',
      '## 자가 점검', '', numbered(unit.questions), '',
      '## 공식 참고', '', ...unit.references.map(reference => `- [${reference.title}](${reference.url})`), '',
      '## 연결된 예제와 실행 범위', '',
      old ? `${link(entry.docPath, '/src/labs/' + unit.id + '/example.js', '기존 예제 원본')} · ${link(entry.docPath, '/docs/examples.md', '실행 환경과 제한')}` : '문서와 필기를 제공합니다. 내장 실행 예제는 아직 제공하지 않습니다.', '',
      '원본 코드·기록은 자동으로 덮어쓰지 않습니다. 기존 예제를 초기화할 때도 필기는 유지됩니다.', '',
      '## 다음 학습', '',
      [index > 0 && link(entry.docPath, units[index - 1].docPath, '이전: ' + units[index - 1].title), index < 27 && link(entry.docPath, units[index + 1].docPath, '다음: ' + units[index + 1].title)].filter(Boolean).join(' · '), '',
      '## 실험 기록 — 직접 작성', '', ...['목표', '핵심 개념', '바꾼 변수와 예상', '실제 결과', '배운 점', '남은 질문'].flatMap(title => ['### ' + title, '']),
    ]
    outputs.set(entry.docPath.slice(1), lines.join('\n'))
  })
}
if (new Set(catalog.units.map(unit => unit.id)).size !== 644) throw Error('Expected 644 unique units')
for (const old of baseline.units) if (!catalog.units.some(unit => unit.id === old.id && unit.docPath === old.docPath)) throw Error('Missing historical unit: ' + old.id)
outputs.set('src/app/catalog.json', JSON.stringify(catalog, null, 2) + '\n')
const check = process.argv.includes('--check')
for (const [file, text] of outputs) {
  const target = path.join(root, file)
  if (check) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8').replaceAll('\r\n', '\n') !== text) throw Error('Generated content is stale: ' + file)
  } else {
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, text)
  }
}
console.log(`${check ? 'Verified' : 'Generated'} ${outputs.size} files; 23 series, 644 units, 94 retained example IDs.`)
