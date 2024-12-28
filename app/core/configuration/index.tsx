const isDevelopment = () => process.env.NODE_ENV === 'development'
const isProduction = () => process.env.NODE_ENV === 'production'

const getBaseUrl = () => {
  const isServer = typeof window !== 'undefined'
  const baseUrl = process.env.BASE_URL
  const port = process.env.PORT ?? 8099

  if (isServer) {
    return ''
  }

  if (baseUrl) {
    if (baseUrl.startsWith('http')) {
      return baseUrl
    } else {
      return `https://${baseUrl}`
    }
  }

  return `http://localhost:${port}`
}

const getAuthenticationSecret = () => {
  return process.env.SERVER_AUTHENTICATION_SECRET
}

export const Configuration = {
  isDevelopment,
  isProduction,
  getBaseUrl,
  getAuthenticationSecret,
}
