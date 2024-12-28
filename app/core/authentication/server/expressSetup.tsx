import { Express } from 'express'
import Jwt from 'jsonwebtoken'
import passport from 'passport'
import { Configuration } from '~/core/configuration'
import { COOKIE_MAX_AGE, Cookies } from './cookies'
import { GoogleProvider } from './providers/google.provider'

const providers = [GoogleProvider]

export const getProviders = () => {
  return providers.filter(provider => provider.isActive())
}

export const expressSetup = (app: Express) => {
  app.use(passport.initialize())

  getProviders().forEach(provider => passport.use(provider.strategy))

  app.get('/api/auth/:provider', (req, res, next) => {
    const provider = req.params.provider
    passport.authenticate(provider, {
      scope: ['profile', 'email'], // You can customize scope per provider if needed
      session: false,
      prompt: 'select_account',
    })(req, res, next) // Invoke the Passport authenticate function
  })

  app.get(
    '/api/auth/:provider/callback',
    (req, res, next) => {
      const provider = req.params.provider
      passport.authenticate(provider, { failureRedirect: '/', session: false })(
        req,
        res,
        next,
      )
    },
    (req, res) => {
      // Successful authentication, redirect to your desired route
      const provider = req.params.provider

      const secret = Configuration.getAuthenticationSecret()

      const jwtToken = Jwt.sign(
        {
          userId: req.user['user'].id,
          [`${provider}AccessToken`]: req.user['accessToken'],
          [`${provider}RefreshToken`]: req.user['refreshToken'],
        },
        secret,
        {
          expiresIn: COOKIE_MAX_AGE,
        },
      )

      Cookies.setOnResponse(res, 'IRIS_ACCESS_TOKEN', jwtToken)

      res.redirect('/')
    },
  )
}
