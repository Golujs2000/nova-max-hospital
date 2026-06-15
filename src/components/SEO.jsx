// ─────────────────────────────────────────────────────────────
// components/SEO.jsx
// Reusable head tag manager using react-helmet-async.
// Place <SEO /> at the top of each page to set:
//   - <title>
//   - meta description, keywords, robots
//   - Open Graph tags (title, description, image, type)
//   - Twitter Card tags
//   - canonical URL and theme-color
//
// Falls back to siteData defaults when props are omitted.
// ─────────────────────────────────────────────────────────────

import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { siteData } from '../data/siteData'

/**
 * SEO head manager.
 * Props:
 *   title        — page title (appended with " | Sarvada Hospito Care")
 *   description  — meta description
 *   image        — absolute OG image URL
 *   type         — OG type: 'website' | 'article'
 *   keywords     — extra keyword strings merged with global defaults
 *   noIndex      — set true for admin/private pages
 *   jsonLd       — object or array of JSON-LD structured data schemas
 */
export default function SEO({ title, description, image, type = 'website', keywords, noIndex = false, jsonLd }) {
  const { pathname } = useLocation()
  const canonicalUrl = `${siteData.url}${pathname}`

  const fullTitle = title
    ? `${title} | ${siteData.name}`
    : `${siteData.name} – ${siteData.tagline}`

  // 1. Dynamic Description Local/Geo-Targeting
  let desc = description || siteData.description
  if (desc && !desc.toLowerCase().includes('patna')) {
    desc = `${desc.trim()} Available at Sarvada Hospito Care in Kankarbagh, Patna, Bihar.`
  }

  const img  = image || `${siteData.url}${siteData.seo.ogImage}`

  // 2. Dynamic Local SEO Keyword Generator
  const dynamicLocalKeywords = []
  if (title) {
    // Strip common clean suffixes/prefixes to get the pure core name
    const coreName = title
      .split('—')[0]
      .split('|')[0]
      .replace(/(Department of|Services|Service|Category|Details|Detail|Treatment)/i, '')
      .trim();

    if (coreName.length > 2) {
      dynamicLocalKeywords.push(
        coreName,
        `${coreName} Patna`,
        `${coreName} Kankarbagh`,
        `${coreName} Bihar`,
        `best ${coreName} in Patna`,
        `top ${coreName} in Kankarbagh`,
        `${coreName} treatment Patna`,
        `${coreName} hospital Patna`
      )
    }
  }

  // Merge, clean, and de-duplicate keywords
  const mergedKeywords = [
    ...(keywords || []),
    ...dynamicLocalKeywords,
    ...siteData.seo.keywords
  ]
  const uniqueKeywords = [...new Set(mergedKeywords.filter(k => typeof k === 'string' && k.trim().length > 0))]
  const kw = uniqueKeywords.join(', ')

  // Normalise jsonLd to an array so we can inject multiple schemas
  const schemas = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : []

  // Always include Local SEO schema on every page
  const localSeoSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: siteData.name,
    description: siteData.description,
    url: siteData.url,
    logo: `${siteData.url}${siteData.logo}`,
    image: `${siteData.url}${siteData.seo.ogImage}`,
    telephone: siteData.contact.phone,
    email: siteData.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Anand palace, Bypass Rd, changer, Kankarbagh',
      addressLocality: 'Patna',
      addressRegion: 'Bihar',
      postalCode: '800020',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.5975',
      longitude: '85.1636'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '17:00'
      }
    ]
  }
  
  schemas.push(localSeoSchema)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords"    content={kw} />
      <meta name="robots"      content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical"    href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image"       content={img} />
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={siteData.name} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image"       content={img} />

      {/* Mobile browser chrome colour */}
      <meta name="theme-color" content="#0060b0" />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
