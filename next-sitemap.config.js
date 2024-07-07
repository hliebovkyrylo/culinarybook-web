/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: `${process.env.SITE_URL}/ru`,
      hreflang: 'ru',
    },
    {
      href: `${process.env.SITE_URL}/uk`,
      hreflang: 'uk',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/confirm-code',
          '/forgot-password',
          '/change-password',
          '/reset-password',
          '/ru/confirm-code',
          '/ru/forgot-password',
          '/ru/change-password',
          '/ru/reset-password',
          '/uk/confirm-code',
          '/uk/forgot-password',
          '/uk/change-password',
          '/uk/reset-password',
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/sitemap.xml`,
    ],
  },
}