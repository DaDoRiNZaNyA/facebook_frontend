import '@/styles/globals.css'
import { Viewport } from 'next'
import { Navbar } from '@/components/navbar'
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
        <div className="relative flex flex-col h-screen">
            <Navbar locale={locale} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3"></footer>
        </div>
    )
}
