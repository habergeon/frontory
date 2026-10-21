/** Read the learner-facing task from the same Markdown shown in the document dialog. */
export function practiceGuide(markdown: string) {
  const section = (heading: string) => {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n')
    const start = lines.findIndex(line => line === '## ' + heading)
    if (start < 0) return ''
    const end = lines.findIndex((line, index) => index > start && /^## /.test(line))
    return lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim()
  }
  return {
    steps: section('실습 과제').split('\n').filter(line => /^\d+\. /.test(line)).join('\n'),
    variables: section('관찰할 변수'),
    criteria: section('완료 조건').replace(/^- \[ \] /gm, '- '),
  }
}
