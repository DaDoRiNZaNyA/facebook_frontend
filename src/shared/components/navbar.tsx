import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { ThemeSwitch } from '@/shared/components/theme-switch'
import { Link } from '@/navigation'
import { UserIcon } from './icons'
import LanguageSwitcher from './LanguageSwitcher'
import { Locale } from '@/shared/types'

export const Navbar = ({ locale }: { locale: Locale }) => {
    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-[20px] items-center">
                    <ThemeSwitch />
                    <Link className="text-default-500" href={`/login`} locale={locale}>
                        <UserIcon size={22} />
                    </Link>
                    <LanguageSwitcher locale={locale} />
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    )
}
