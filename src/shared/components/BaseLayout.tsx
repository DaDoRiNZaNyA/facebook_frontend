'use client'
import { Navbar } from '@/shared/components/navbar'
import { Locale } from '@/shared/types'
import { useTheme } from 'next-themes'
import { ToastContainer } from '@/shared/lib/toast'
import { Tabs, Tab } from '@nextui-org/tabs'
import { HomeIcon, MessagesIcon, UsersIcon } from '@/shared/components/icons'
import { useProfile } from '@/entities/Auth/api/hooks'
import { Link, usePathname } from '@/navigation'

export default function BaseLayout({
    children,
    params,
    messages,
}: {
    children: React.ReactNode
    params: { locale: Locale }
    messages: {
        myProfile: string
        myPosts: string
        logout: string
    }
}) {
    const { locale } = params
    const { theme } = useTheme()
    const { data: profile } = useProfile()
    const pathname = usePathname()
    const hideTabsOnPaths = ['/login', '/register', '/someOtherPage']

    const shouldShowTabs = !hideTabsOnPaths.includes(pathname)

    return (
        <div className="relative flex flex-col h-screen">
            <Navbar locale={locale} messages={messages} />
            <main className="flex-grow w-full p-[15px]">
                {shouldShowTabs && (
                    <div className="flex items-center justify-center w-full">
                        <Tabs size="lg" selectedKey={pathname}>
                            <Tab
                                key="/"
                                title={
                                    <Link href={`/`} locale={locale}>
                                        <HomeIcon size={30} />
                                    </Link>
                                }
                            />
                            <Tab
                                key="/following"
                                title={
                                    <Link href={profile ? `/following` : `/login`} locale={locale}>
                                        <UsersIcon size={30} />
                                    </Link>
                                }
                            />
                            <Tab
                                key="/messages"
                                title={
                                    <Link href={profile ? `/messages` : `/login`} locale={locale}>
                                        <MessagesIcon size={30} />
                                    </Link>
                                }
                            />
                        </Tabs>
                    </div>
                )}
                {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3"></footer>
            <ToastContainer theme={theme} />
        </div>
    )
}
