const nextIntl = require('next-intl/plugin')

const withNextIntl = nextIntl('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['nextui.org'],
    },
}

module.exports = withNextIntl(nextConfig)
