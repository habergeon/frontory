import sveltePlugin from 'prettier-plugin-svelte'

const printer = sveltePlugin.printers['svelte-ast']

export default {
  ...sveltePlugin,
  printers: {
    ...sveltePlugin.printers,
    'svelte-ast': {
      ...printer,
      embed(path, options) {
        // Svelte needs embedding for script/style and expressions, but their
        // nested tagged templates must keep the shared preservation policy.
        const result = printer.embed(path, options)
        if (typeof result !== 'function') return result
        return (textToDoc, ...args) =>
          result(
            (text, options) =>
              textToDoc(text, {
                ...options,
                embeddedLanguageFormatting: 'off',
              }),
            ...args,
          )
      },
    },
  },
}
