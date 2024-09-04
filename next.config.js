const nextIntl = require('next-intl/plugin')

const withNextIntl = nextIntl('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withNextIntl(nextConfig)
