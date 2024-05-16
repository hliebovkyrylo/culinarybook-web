import i18n from '@/i18n'
import { wrapper } from '@/lib/store'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { I18nextProvider } from 'react-i18next'
import "@/styles/globals.css";
import { FC } from 'react'
import { Provider } from 'react-redux'

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute='class'>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </I18nextProvider>
    </Provider>
  );
};

export default MyApp;