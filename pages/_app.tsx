import { appWithTranslation }     from 'next-i18next'
import { wrapper }                from '@/lib/store'
import { ThemeProvider }          from 'next-themes'
import type { AppProps }          from 'next/app'
import { Provider }               from 'react-redux'
import                                 "@/styles/globals.css";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const MyApp: React.FunctionComponent<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class'>
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