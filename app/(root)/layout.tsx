"use client"

import { ThemeProvider }                   from "next-themes";
import { Bottombar, LeftSidebar, Topbar }  from '@/components/shared';
import                                          "../globals.css";
import { Montserrat }                      from 'next/font/google';
import { I18nextProvider }                 from 'react-i18next'
import i18n                                from "../../i18n";
import { Provider }                        from "react-redux";
import { PersistGate }                     from "redux-persist/integration/react";
import { persistor, store }                from "@/lib/store";
import                                          'swiper/swiper-bundle.css';

const poppins = Montserrat({ weight: ['400', '500', '700', '800'], subsets: ['cyrillic', 'latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={poppins.className}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <I18nextProvider i18n={i18n}> 
              <ThemeProvider attribute='class'>
                <Topbar />
                <main className='flex flex-row'>
                  <LeftSidebar />
                  <section className='main-container'>
                    <div className='w-full max-w-mw-1480 h-full mt-28 max-sm:mt-16'>
                      {children}
                    </div>
                  </section>
                </main>
                <Bottombar />
              </ThemeProvider>
            </I18nextProvider> 
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}