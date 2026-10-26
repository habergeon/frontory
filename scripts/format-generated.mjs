import { format, getFileInfo } from 'prettier'
import options from '../prettier-options.json' with { type: 'json' }
import sveltePlugin from './prettier-svelte-plugin.mjs'

export async function formatGeneratedText(file, text) {
  const { inferredParser: parser } = await getFileInfo(file, {
    plugins: [sveltePlugin],
  })
  if (!parser) return text
  try {
    const settings = {
      ...options,
      filepath: file,
      parser,
      plugins: [sveltePlugin],
      ...(parser === 'svelte' ? { embeddedLanguageFormatting: 'auto' } : {}),
    }
    // Prettier can reflow a newly expanded method-chain argument on pass two.
    // Return a fixed point so previews and a writer's second call stay identical.
    for (let attempt = 0; attempt < 3; attempt++) {
      const formatted = await format(text, settings)
      if (formatted === text) return formatted
      text = formatted
    }
    throw new Error('Generated formatting did not converge after three passes')
  } catch (cause) {
    throw new Error(`${file}: ${cause.message}`, { cause })
  }
}
