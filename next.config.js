const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME,
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SECOND_IMAGE_HOSTNAME,
      }
    ]
  },
}