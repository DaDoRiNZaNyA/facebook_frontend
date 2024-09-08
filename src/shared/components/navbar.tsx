import { Navbar as NextUINavbar, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { ThemeSwitch } from '@/shared/components/theme-switch'
import { Link, useRouter } from '@/navigation'
import { LogoutIcon, PostIcon, UserIcon } from './icons'
import LanguageSwitcher from './LanguageSwitcher'
import { Locale } from '@/shared/types'
import { useProfile } from '@/entities/Auth/api/hooks'
import { User } from '@nextui-org/user'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown'
import { useQueryClient } from '@tanstack/react-query'

export const Navbar = ({
    locale,
    messages,
}: {
    locale: Locale
    messages: {
        myProfile: string
        myPosts: string
        logout: string
    }
}) => {
    const queryClient = useQueryClient()
    const { push } = useRouter()
    const { data: profile } = useProfile()

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="flex gap-[20px] items-center">
                    {profile ? (
                        <Dropdown placement="bottom" backdrop="blur">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    name={profile?.name + ' ' + profile?.lastName}
                                    description={profile?.email}
                                    avatarProps={{ size: 'sm', src: '' }}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem
                                    key="profile"
                                    href="/profile"
                                    as={Link}
                                    startContent={<UserIcon size={20} />}
                                >
                                    {messages.myProfile}
                                </DropdownItem>
                                <DropdownItem
                                    key="posts"
                                    href="/profile/posts"
                                    as={Link}
                                    startContent={<PostIcon size={20} />}
                                >
                                    {messages.myPosts}
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    startContent={<LogoutIcon size={20} />}
                                    onClick={() => {
                                        localStorage.removeItem('access')
                                        localStorage.removeItem('refresh')
                                        queryClient.clear()
                                        push('/')
                                    }}
                                    color="danger"
                                    className="text-danger"
                                >
                                    {messages.logout}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Link className="text-default-500" href={`/login`} locale={locale}>
                            <UserIcon size={22} />
                        </Link>
                    )}

                    <ThemeSwitch />
                    <LanguageSwitcher locale={locale} />
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar>
    )
}
