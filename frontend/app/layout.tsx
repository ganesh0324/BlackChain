import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { WalletProviderWrapper } from "@/components/WallerProviderWrapper"
import { SUI_TESTNET_CHAIN } from '@mysten/wallet-standard'
import '@mysten/dapp-kit/dist/index.css';
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SUI Social Dashboard",
  description: "A simple social media dashboard for SUI blockchain",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProviderWrapper>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </WalletProviderWrapper>
      </body>
    </html>
  )
}
