// Common sharing identity; titles/descriptions/URLs remain page-specific.
export const socialMeta = `<meta property="og:site_name" content="Frontory">
<meta property="og:locale" content="ko_KR">
<meta property="og:image" content="https://frontory.pages.dev/og/frontory.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Frontory — Learn, Experiment, Archive">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://frontory.pages.dev/og/frontory.png">
<meta name="twitter:image:alt" content="Frontory — Learn, Experiment, Archive">`

export function socialMetaForLocale(locale = 'ko') {
  return locale === 'en' ? socialMeta.replace('content="ko_KR"', 'content="en_US"') : socialMeta
}
