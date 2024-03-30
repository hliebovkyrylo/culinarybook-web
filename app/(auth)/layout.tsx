"use client"

import { ThemeProvider }   from "next-themes";
import                          '../globals.css'
import { Poppins }         from "next/font/google";
import { I18nextProvider } from "react-i18next";
import i18n                from "../../i18n";

const poppins = Poppins({ weight: ['400', '500', '700', '800'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${poppins.className} body`}>
        <I18nextProvider i18n={i18n}> 
          <ThemeProvider attribute="class">
            <main className="w-full h-screen">
              <section className="flex items-center justify-center h-full">
                {children}
              </section>
            </main>
          </ThemeProvider>
        </I18nextProvider> 
      </body>
    </html>
  )
}