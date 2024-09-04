import '@/styles/globals.css'
import { Viewport } from 'next'
import clsx from 'clsx'

import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { Providers } from './providers'
import { Locale } from '@/types'

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
    const { locale } = params

    return (
        <html suppressHydrationWarning lang={locale}>
            <head />
            <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>{children}</Providers>
            </body>
        </html>
    )
}
