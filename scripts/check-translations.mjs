import { readEnglishContent } from './locale-content.mjs'

try {
  const args = process.argv.slice(2)
  for (const argument of args)
    if (argument !== '--complete') throw Error(`Unknown argument: ${argument}`)
  const complete = args.includes('--complete')
  const review = []
  const content = readEnglishContent({ complete, review })
  console.log(
    JSON.stringify(
      {
        mode: complete ? 'complete' : 'partial',
        publishedUnits: content.publishedUnitIds.length,
        series: content.catalog.series.length,
        documents: content.documents.size,
        reviewNotice:
          'Extracted numbers and code require human review. Matches do not prove semantic equivalence; differences may be valid translated comments or prose.',
        review,
      },
      null,
      2,
    ),
  )
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
