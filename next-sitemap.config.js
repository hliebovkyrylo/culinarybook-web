/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateIndexSitemap: true,
  changefreq: 'daily',
  sitemapsSize: 5000,
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
          '/verify-account',
          '/history',
          '/notifications',
          '/change-password',
          '/reset-password',
          '/settings',
          '/profile/*/followers',
          '/profile/*/followings',
          '/profile/*/liked',
          '/profile/*/saved',
          '/update-recipe/*',
          '/create-recipe',
          '/ru/confirm-code',
          '/ru/forgot-password',
          '/ru/change-password',
          '/ru/reset-password',
          '/ru/profile/*/followers',
          '/ru/profile/*/followings',
          '/ru/profile/*/liked',
          '/ru/profile/*/saved',
          '/ru/update-recipe/*',
          '/ru/create-recipe',
          '/ru/verify-account',
          '/ru/history',
          '/ru/notifications',
          '/ru/settings',
          '/uk/confirm-code',
          '/uk/forgot-password',
          '/uk/change-password',
          '/uk/reset-password',
          '/uk/profile/*/followers',
          '/uk/profile/*/followings',
          '/uk/profile/*/liked',
          '/uk/profile/*/saved',
          '/uk/update-recipe/*',
          '/uk/create-recipe',
          '/uk/verify-account',
          '/uk/history',
          '/uk/notifications',
          '/uk/settings',
        ],
      },
    ],
  },
  additionalPaths: async () => {
    const result = [];
    try {
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/user/get/users/ids`, {
        method: 'GET'
      });
      const recipesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/recipe/get/recipes/ids`, {
        method: 'GET'
      });

      if (!userResponse.ok || !recipesResponse.ok) {
        console.error('Failed to fetch data from the API');
        return result;
      }

      const users = await userResponse.json();
      const recipes = await recipesResponse.json();

      const languages = ['', 'ru', 'uk'];

      users.usersIds.forEach(user => {
        languages.forEach(lang => {
          result.push({
            loc: `/${lang}${lang ? '/' : ''}profile/${user.id}`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.7,
            alternateRefs: languages.map(altLang => ({
              href: `${process.env.SITE_URL}/${altLang}${altLang ? '/' : ''}profile/${user.id}`,
              hreflang: altLang || 'x-default'
            })),
          });
        });
      });

      recipes.recipesIds.forEach(recipe => {
        languages.forEach(lang => {
          result.push({
            loc: `/${lang}${lang ? '/' : ''}recipe/${recipe.id}`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 0.7,
            alternateRefs: languages.map(altLang => ({
              href: `${process.env.SITE_URL}/${altLang}${altLang ? '/' : ''}recipe/${recipe.id}`,
              hreflang: altLang || 'x-default'
            })),
          });
        });
      });

    } catch (error) {
      console.error('Error fetching or parsing data', error);
    }

    return result;
  },
  outDir: 'public',
}
