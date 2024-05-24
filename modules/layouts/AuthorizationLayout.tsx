import { Montserrat } from "next/font/google";
import Head           from "next/head";

interface IAuthorizationLayout {
  children       : React.ReactNode;
  pageTitle      : string;
  metaTitle      : string;
  pageDescription: string;
}

const montserrat = Montserrat({ subsets: ['latin'] });

export const AuthorizationLayout = ({
  children,
  pageDescription,
  pageTitle,
  metaTitle,
}: IAuthorizationLayout) => {
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
    </main>
  )
}