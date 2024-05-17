import { appWithTranslation } from 'next-i18next'
import { wrapper } from '@/lib/store'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import "@/styles/globals.css";
import { FC } from 'react'
import { Provider } from 'react-redux'

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider attribute='class'>
        <Component {...props.pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default appWithTranslation(MyApp);