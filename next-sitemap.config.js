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
          '/profile/*/followers',
          '/profile/*/followings',
          '/profile/*/liked',
          '/profile/*/saved',
          '/update-recipe/*',
          '/ru/confirm-code',
          '/ru/forgot-password',
          '/ru/change-password',
          '/ru/reset-password',
          '/ru/profile/*/followers',
          '/ru/profile/*/followings',
          '/ru/profile/*/liked',
          '/ru/profile/*/saved',
          '/ru/update-recipe/*',
          '/uk/confirm-code',
          '/uk/forgot-password',
          '/uk/change-password',
          '/uk/reset-password',
          '/uk/profile/*/followers',
          '/uk/profile/*/followings',
          '/uk/profile/*/liked',
          '/uk/profile/*/saved',
          '/uk/update-recipe/*',
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL}/sitemap.xml`,
    ],
  },
  additionalPaths: async () => {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/user/get/users/ids`, {
      method: 'GET'
    });
    const recipesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/recipe/get/recipes/ids`, {
      method: 'GET'
    });
    const users = await userResponse.json();
    const recipes = await recipesResponse.json();

    const languages = ['', 'ru', 'uk'];

    const userPaths = users.usersIds.flatMap(user => 
      languages.map(lang => ({
        loc: `/${lang}${lang ? '/' : ''}profile/${user.id}/followings`,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map(altLang => ({
          href: `${process.env.SITE_URL}/${altLang}${altLang ? '/' : ''}profile/${user.id}/followings`,
          hreflang: altLang || 'x-default'
        }))
      }))
    );

    const recipePaths = recipes.recipesIds.flatMap(recipe => 
      languages.map(lang => ({
        loc: `/${lang}${lang ? '/' : ''}recipe/${recipe.id}`,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map(altLang => ({
          href: `${process.env.SITE_URL}/${altLang}${altLang ? '/' : ''}recipe/${recipe.id}`,
          hreflang: altLang || 'x-default'
        }))
      }))
    );

    return [...userPaths, ...recipePaths];
  },
}