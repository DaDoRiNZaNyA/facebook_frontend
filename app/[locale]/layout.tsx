import '@/styles/globals.css'
import { Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { fontSans } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import { getDirection } from '@/lib/intl'

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const { locale } = params

    const dir = getDirection(locale)
    return (
        <html suppressHydrationWarning lang={locale} dir={dir}>
            <head />
            <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <div className="relative flex flex-col h-screen">
                        <Navbar locale={locale} />
                        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
                        <footer className="w-full flex items-center justify-center py-3"></footer>
                    </div>
                </Providers>
            </body>
        </html>
    )
}
