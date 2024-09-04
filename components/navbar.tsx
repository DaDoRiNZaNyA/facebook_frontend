import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { ThemeSwitch } from '@/components/theme-switch'
import Link from 'next/link'
import { UserIcon } from './icons'
import LanguageSwitcher from './LanguageSwitcher'

export const Navbar = ({ locale }: { locale: string }) => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-[20px] items-center">
                    <ThemeSwitch />
                    <Link className="text-default-500" href={`${locale}/login`}>
                        <UserIcon size={22} />
                    </Link>
                    <LanguageSwitcher locale={locale} />
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    )
}
