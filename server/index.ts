import { createRequestHandler } from '@remix-run/express'
import compression from 'compression'
import express from 'express'
import { createServer } from 'http'
import morgan from 'morgan'
import { AuthenticationServer } from '~/core/authentication/server'

const app = express()

const httpServer = createServer(app)

const isProduction = process.env.NODE_ENV === 'production'

const viteDevServer = isProduction
  ? undefined
  : await import('vite').then(vite =>
      vite.createServer({
        server: {
          host: true,
          middlewareMode: true,
          hmr: {
            server: httpServer,
          },
        },
      }),
    )

const remixHandler = createRequestHandler({
  build: viteDevServer
    ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
    : // @ts-expect-error Build will appear after
      // eslint-disable-next-line import/no-unresolved
      await import('../build/server/remix.js'),
})

app.use(compression())

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by')

// handle asset requests
if (viteDevServer) {
  app.use(viteDevServer.middlewares)
} else {
  // Vite fingerprints its assets so we can cache forever.
  app.use(
    '/assets',
    express.static('build/client/assets', { immutable: true, maxAge: '1y' }),
  )
}

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('build/client', { maxAge: '1h' }))

app.use(morgan('tiny'))

AuthenticationServer.expressSetup(app)

app.all('*', remixHandler)

const port = process.env.PORT || 8099

httpServer.listen(port, () =>
  console.log(`Express server listening at http://localhost:${port}`),
)
