import { useTranslation } from "next-i18next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

interface IAuthorizationLayout {
  children: React.ReactNode;
  pageTitle: string;
  metaTitle?: string;
  pageDescription?: string;
  applyHomeButton: boolean;
}

const montserrat = Montserrat({ subsets: ['latin'] });

export const AuthorizationLayout = ({
  children,
  pageDescription,
  pageTitle,
  metaTitle,
  applyHomeButton
}: IAuthorizationLayout) => {
  const { t } = useTranslation("common");
  return (
    <main className={`${montserrat.className} w-full h-screen flex justify-center items-center`}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" name="og:image" content={`/api/og?title=${metaTitle}&amp;description=${{pageDescription}}`} />
        <meta property="og:site_name" content="Culinarybook" />
        <meta property="og:url" content="culinarybook.website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="keywords" content="Culinarybook, culinarybook, culinary book, Culinary book, рецепты, кулинария, еда, блюда, готовка, завтрак, обед, ужин, десерты, выпечка, напитки, салаты, супы, основные блюда, закуски, вегетарианские рецепты, мясо, рыба, паста, соусы, рецепти, кулінарія, їжа, страви, готування, сніданок, обід, вечеря, десерти, випічка, напої, салати, супи, основні страви, закуски, вегетаріанські рецепти, м'ясо, риба, паста, соуси, recipes, cooking, food, dishes, cuisine, breakfast, lunch, dinner, desserts, baking, drinks, salads, soups, main courses, appetizers, vegetarian recipes, meat, fish, pasta, sauces" />
      </Head>
      <section className="dark:bg-neutral-900 p-8 w-full max-w-[360px] bg-[#DFDFDF] max-[390px]:mx-4">
        <h1 className="text-2xl mb-3">{pageTitle}</h1>
        {children}
      </section>
      {applyHomeButton && (
        <Link className="absolute left-6 bottom-6 flex items-center text-[#727272] hover:text-[#a3a3a3]" href={'/'}>{t('back-home')}</Link>
      )}
    </main>
  )
}