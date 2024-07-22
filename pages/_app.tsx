import { appWithTranslation } from 'next-i18next'
import { wrapper } from '@/lib/store'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import "@/styles/globals.css";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Script from 'next/script'
import NextNProgress from 'nextjs-progressbar';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo'

const MyApp: React.FunctionComponent<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider attribute='class'>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
        />

        <Script id="google-analytics-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GTM_ID}', {
            page_path: window.location.pathname,
            });
          `}
        </Script>
        <DefaultSeo {...SEO} />
        <NextNProgress color="#DDDF72" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default appWithTranslation(MyApp);