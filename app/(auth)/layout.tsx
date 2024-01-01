"use client"

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider }  from "next-themes";
import                         '../globals.css'
import { Poppins }        from "next/font/google";

const poppins = Poppins({ weight: ['400', '500', '700', '800'], subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-bg-c`}>
        <ThemeProvider attribute="class">
          <NextUIProvider>
            <main className="w-full h-screen">
              <section className="flex items-center justify-center h-full">
                {children}
              </section>
            </main>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
