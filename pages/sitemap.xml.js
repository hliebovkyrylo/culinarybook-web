function generateSiteMap(userIds, recipeIds) {
  const languages = ['ru', 'uk'];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.SITE_URL}</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/search/recipes</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/search/users</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/sign-in</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/sign-up</loc>
      </url>
      ${languages.map(lang => `
      <url>
        <loc>${process.env.SITE_URL}/${lang}</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/${lang}/search/recipes</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/${lang}/search/users</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/${lang}/sign-in</loc>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/${lang}/sign-up</loc>
      </url>
      `).join('')}
      ${userIds
      .flatMap((user) => [
        `<url>
           <loc>${`${process.env.SITE_URL}/profile/${user.id}`}</loc>
         </url>`,
        ...languages.map(lang => `
         <url>
           <loc>${`${process.env.SITE_URL}/${lang}/profile/${user.id}`}</loc>
         </url>
        `)
      ]).join('')}
     ${recipeIds
      .flatMap((recipe) => [
        `<url>
           <loc>${`${process.env.SITE_URL}/recipe/${recipe.id}`}</loc>
         </url>`,
        ...languages.map(lang => `
         <url>
           <loc>${`${process.env.SITE_URL}/${lang}/recipe/${recipe.id}`}</loc>
         </url>
        `)
      ]).join('')}
   </urlset>
 `;
}

function SiteMap() { }

export async function getServerSideProps({ res }) {
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/user/get/users/ids`);
  const recipesResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/recipe/get/recipes/ids`);

  if (!userResponse.ok || !recipesResponse.ok) {
    console.error('Failed to fetch data from the API');
    return {
      props: {},
    };
  }

  const users = await userResponse.json();
  const recipes = await recipesResponse.json();

  const sitemap = generateSiteMap(users.usersIds, recipes.recipesIds);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;