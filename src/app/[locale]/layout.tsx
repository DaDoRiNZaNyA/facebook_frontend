'use client'
import { Navbar } from '@/shared/components/navbar'
import { Locale } from '@/shared/types'
import { useTheme } from 'next-themes'
import { ToastContainer } from '@/shared/lib/toast'

export default function Layout({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) {
    const { locale } = params
    const { theme } = useTheme()

    return (
        <div className="relative flex flex-col h-screen">
            <Navbar locale={locale} />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3"></footer>
            <ToastContainer theme={theme} />
        </div>
    )
}
