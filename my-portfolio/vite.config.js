import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { EDUCATION, HERO, SITE, SOCIAL_LINKS } from './src/data/portfolio.js'
import { THEMES } from './src/theme/themes.js'

const escapeHtml = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

/* JSON that is safe inside an inline <script>: no "</script>" breakouts. */
const inlineJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

const absolute = (path) => new URL(path, SITE.url).href

/* Pages a search engine should index — keep in step with App.jsx routes. */
const PAGES = ['/', SITE.cvUrl]

/* schema.org Person: lets search engines tie the name to the profiles. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  image: absolute(SITE.ogImage),
  jobTitle: SITE.role,
  description: SITE.description,
  email: `mailto:${SITE.email}`,
  address: { '@type': 'PostalAddress', addressLocality: SITE.location },
  alumniOf: EDUCATION.filter((item) => item.kind === 'degree').map((item) => ({
    '@type': 'EducationalOrganization',
    name: item.institution,
  })),
  knowsAbout: HERO.tools,
  sameAs: SOCIAL_LINKS.map((link) => link.href),
}

/* Raw values are inserted verbatim (already JSON); everything else is
   HTML-escaped. */
const TOKENS = {
  'site.title': SITE.title,
  'site.description': SITE.description,
  'site.name': SITE.name,
  'site.url': SITE.url,
  'site.ogTitle': `${SITE.name} — ${SITE.role}`,
  'site.ogImage': absolute(SITE.ogImage),
  'theme.defaultMeta': THEMES[0].meta,
}
const RAW_TOKENS = {
  'site.jsonLd': inlineJson(personJsonLd),
  'theme.modes': inlineJson(Object.fromEntries(THEMES.map((t) => [t.id, t.mode]))),
}

/* Fills {{…}} tokens in index.html from src/data/portfolio.js and
   src/theme/themes.js, and emits robots.txt and sitemap.xml, so none of
   them can drift from the source. Unknown tokens fail the build. */
function siteMeta() {
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      return html.replace(/\{\{([\w.]+)\}\}/g, (token, key) => {
        if (key in RAW_TOKENS) return RAW_TOKENS[key]
        if (key in TOKENS) return escapeHtml(TOKENS[key])
        throw new Error(`index.html: unknown token ${token}`)
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`,
      })
      const urls = PAGES.map((page) => `  <url><loc>${absolute(page)}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteMeta()],
})
