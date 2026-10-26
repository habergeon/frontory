import options from './prettier-options.json' with { type: 'json' }
import sveltePlugin from './scripts/prettier-svelte-plugin.mjs'

export default {
  ...options,
  plugins: [sveltePlugin],
  overrides: [
    {
      files: '*.svelte',
      options: { parser: 'svelte', embeddedLanguageFormatting: 'auto' },
    },
  ],
}
