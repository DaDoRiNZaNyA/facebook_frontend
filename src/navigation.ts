import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

const routing = defineRouting({ locales: ['en', 'ru'], localePrefix: 'always', defaultLocale: 'en' })

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
