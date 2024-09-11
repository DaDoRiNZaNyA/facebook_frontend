const nextIntl = require('next-intl/plugin')

const withNextIntl = nextIntl('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['nextui.org', '127.0.0.1'],
    },
}

module.exports = withNextIntl(nextConfig)
