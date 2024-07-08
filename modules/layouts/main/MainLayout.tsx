import Head from "next/head"
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { MainTopbar } from "./MainTopbar";
import { MainLeftSidebar } from "./MainLeftSidebar";
import { MainBottombar } from "./MainBottombar";
import { Loader } from "@/components/Loader";
import { IUserMe } from "@/typings/user";
import { INotification } from "@/typings/notification";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const montserrat = Montserrat({ subsets: ['latin'] });

interface IMainLayout {
  children: React.ReactNode;
  metaTitle: string;
  pageDescription: string;
  backgroundImage?: string;
  isLoading?: boolean;
  containerSize: 'full' | 'small';
  pageTitle?: string;
  user?: IUserMe;
  notifications?: INotification[];
}

export const MainLayout = ({
  children,
  metaTitle,
  pageDescription,
  backgroundImage,
  isLoading,
  containerSize,
  pageTitle,
  user,
  notifications
}: IMainLayout) => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  return (
    <div className={montserrat.className}>
      <Head>
      <title>{metaTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:locale" content={i18n.language} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" name="og:image" content='/favicon.ico' />
        <meta property="og:site name" content="Culinarybook" />
        <meta property="og:url" content="culinarybook.website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:image" content='/favicon.ico' />
        <meta name="twitter:site" content='@culinarybook' />
        <meta name="keywords" content="Culinarybook, culinarybook, culinary book, Culinary book, рецепты, кулинария, еда, блюда, готовка, завтрак, обед, ужин, десерты, выпечка, напитки, салаты, супы, основные блюда, закуски, вегетарианские рецепты, мясо, рыба, паста, соусы, рецепти, кулінарія, їжа, страви, готування, сніданок, обід, вечеря, десерти, випічка, напої, салати, супи, основні страви, закуски, вегетаріанські рецепти, м'ясо, риба, паста, соуси, recipes, cooking, food, dishes, cuisine, breakfast, lunch, dinner, desserts, baking, drinks, salads, soups, main courses, appetizers, vegetarian recipes, meat, fish, pasta, sauces" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.SITE_URL + router.asPath} />
      </Head>
      <MainTopbar user={user} notifications={notifications} />
      <div className="flex flex-row">
        <MainLeftSidebar user={user} />
        <main className='flex min-h-screen flex-1 flex-col items-center p-5 2xl:p-0 max-2xl:w-screen mx-auto'>
          <div className={`w-full h-full flex flex-col ${containerSize === 'full' ? 'max-w-[1480px]' : 'max-w-[974px]'} mt-24 max-sm:mt-16`}>
            <h1 className='text-black dark:text-neutral-50 font-semibold text-2xl'>{pageTitle}</h1>
            {isLoading ? (
              <Loader className="!-z-10 absolute top-0 left-0 blur-[2px]" />
            ) : backgroundImage && (
              <Image className="absolute w-full h-screen top-0 left-0 object-cover z-[-1] blur-sm opacity-10" src={backgroundImage} alt="Background image" width={500} height={500} />
            )}
            {children}
          </div>
        </main>
      </div>
      <MainBottombar user={user} />
    </div>
  )
}