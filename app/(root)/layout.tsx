"use client"

import { Poppins }                            from 'next/font/google'
import { ThemeProvider }                      from "next-themes";
import { Bottombar, LeftSidebar, Topbar }     from '@/components/shared';
import                                             "../globals.css";

const poppins = Poppins({ weight: ['400', '500', '700', '800'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={poppins.className}>
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
      </body>
    </html>
  )
}