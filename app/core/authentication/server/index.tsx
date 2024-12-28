import { createTrpcContext } from './context'
import { expressSetup, getProviders } from './expressSetup'
import { getHttpContext, getHttpContextPublic } from './middleware'
import { AuthenticationRouter } from './router'
import { AuthenticationService } from './service'

export const AuthenticationServer = {
  createTrpcContext,

  getHttpContext,
  getHttpContextPublic,
  trpcRouter: AuthenticationRouter,
  service: AuthenticationService,
  expressSetup,
  getProviders,
}
