import createMiddleware from 'next-intl/middleware'

export default createMiddleware({ locales: ['en', 'ru'], localePrefix: 'always', defaultLocale: 'en' })

export const config = {
    matcher: ['/', '/(ru|en)/:path*'],
}
