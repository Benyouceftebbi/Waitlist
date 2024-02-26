
'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Theming from "@/Theme/Theming";
import "./globals.css";
import { Inter, Architects_Daughter } from 'next/font/google'
import Header from "./Header/page";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
})
export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })
  return (
    <html lang="en">
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-450 text-gray-200 tracking-tight`}>

        <Theming>
        <div className="flex flex-col min-h-screen overflow-hidden">
        <Header/>
          <main>
            {children}
            </main>
            </div>
        </Theming>
      </body>
    </html>
  );
}
