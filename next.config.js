const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
        hostname: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.NEXT_PUBLIC_APP_API_URL,
        pathname: '**'
      }
    ]
  },
  experimental: {
    outputFileTracing: true,
  },
}