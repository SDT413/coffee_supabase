"use client";
import './globals.scss'
import { Inter } from 'next/font/google'
import ReduxAndChakraProviders from "@/components/ReduxAndChakraProviders";
import {ReactNode} from "react";
import SupabaseProvider from "@/providers/SupabaseProvider";
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}: {
    children: ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
        <SupabaseProvider>
            <ReduxAndChakraProviders>
                {children}
            </ReduxAndChakraProviders>
        </SupabaseProvider>
        </body>
        </html>

    )
}
