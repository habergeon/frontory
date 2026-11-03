import babel from 'prettier/plugins/babel'
import type { ParserOptions } from 'prettier'
import { splitSource, type SourceFiles } from '../shared/sourceFiles.ts'

// Only the static, top-level HTML assignment used by the bundled examples is
// moved. Dynamic rendering, computed expressions and user drafts stay intact.
export function splitExample(source: string, locale: 'ko' | 'en'): SourceFiles {
  const fallback = splitSource(source, 'javascript')
  try {
    const tree = babel.parsers.babel.parse(source, {} as ParserOptions)
    const mount = tree.program.body.find(
      (node: any) =>
        node.type === 'ExportNamedDeclaration' &&
        node.declaration?.type === 'FunctionDeclaration' &&
        node.declaration.id.name === 'mount',
    )?.declaration
    if (!mount) return fallback
    const statements = mount.body.body
    const assignments = statements.filter((node: any) => {
      const expr = node.expression
      return (
        node.type === 'ExpressionStatement' &&
        expr?.type === 'AssignmentExpression' &&
        expr.operator === '=' &&
        expr.left.type === 'MemberExpression' &&
        !expr.left.computed &&
        expr.left.object.name === 'container' &&
        expr.left.property.name === 'innerHTML'
      )
    })
    if (assignments.length !== 1) return fallback
    const assignment = assignments[0]
    const index = statements.indexOf(assignment)
    // Earlier executable statements may rely on the original empty container.
    if (
      statements
        .slice(0, index)
        .some(
          (node: any) =>
            node.type !== 'VariableDeclaration' ||
            node.declarations.some((d: any) => d.id.name !== 'messages'),
        )
    )
      return fallback
    const messages = statements
      .slice(0, index)
      .flatMap((node: any) => node.declarations)
      .find((node: any) => node.id.name === 'messages')?.init
    const read = (node: any): any => {
      if (node?.type === 'StringLiteral') return node.value
      if (node?.type === 'Identifier' && node.name === 'locale') return locale
      if (node?.type === 'BinaryExpression' && node.operator === '===')
        return read(node.left) === read(node.right)
      if (node?.type === 'ConditionalExpression')
        return read(read(node.test) ? node.consequent : node.alternate)
      if (node?.type === 'ObjectExpression')
        return Object.fromEntries(
          node.properties.map((p: any) => {
            if (p.type !== 'ObjectProperty' || p.computed)
              throw Error('Dynamic object')
            return [p.key.name ?? p.key.value, read(p.value)]
          }),
        )
      if (
        node?.type === 'MemberExpression' &&
        !node.computed &&
        node.object.name === 'messages'
      ) {
        const value = read(messages)[node.property.name]
        if (typeof value === 'string') return value
      }
      if (node?.type === 'TemplateLiteral')
        return node.quasis
          .map((q: any, i: number) => {
            if (q.value.cooked === null) throw Error('Invalid template')
            return (
              q.value.cooked +
              (i < node.expressions.length ? read(node.expressions[i]) : '')
            )
          })
          .join('')
      throw Error('Dynamic expression')
    }
    for (const node of statements.slice(0, index))
      for (const declaration of node.declarations) read(declaration.init)
    const html = read(assignment.expression.right)
    if (typeof html !== 'string') return fallback
    const separated = splitSource(html, 'html')
    // Script tags inserted through innerHTML were inert; never start running them.
    if (separated.javascript) return fallback
    let javascript =
      source.slice(0, assignment.start) + source.slice(assignment.end)
    return {
      mode: 'legacy',
      html: separated.html.replace(
        '<link rel="stylesheet" href="style.css">',
        '',
      ),
      css: separated.css,
      javascript,
    }
  } catch {
    return fallback
  }
}
