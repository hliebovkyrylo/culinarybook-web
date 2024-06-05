import { useTranslation } from "next-i18next";
import { Montserrat }     from "next/font/google";
import Head               from "next/head";
import Link               from "next/link";

interface IAuthorizationLayout {
  children        : React.ReactNode;
  pageTitle       : string;
  metaTitle      ?: string;
  pageDescription?: string;
  applyHomeButton : boolean;
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