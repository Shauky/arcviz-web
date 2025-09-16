import type React from "react"
import type { Metadata } from "next"
import { Inter, Source_Code_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/layout/header"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
})
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "arcviz.com",
  description: "Created by devs for Designers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} ${sourceCodePro.variable}`}
      >
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
