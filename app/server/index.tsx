import { createRouter } from '@/core/.iris/zenstack/routers'
import { AuthenticationServer } from '@/core/authentication/server'
import { ConfigurationServer } from '@/core/configuration/server'
import { Trpc } from '@/core/trpc/base'
import { AiServer } from '@/plugins/ai/server'
import { EmailServer } from '@/plugins/email/server'
import { UploadServer } from '@/plugins/upload/server'
import { NangoServer } from '~/plugins/nango/server'

import { PaymentServer } from '~/plugins/payment/server'
import { PwaServer } from '~/plugins/pwa/server'
import { RabbitMQServer } from '~/plugins/rabbitmq'

export const appRouter = Trpc.mergeRouters(
  createRouter(Trpc.createRouter, Trpc.procedurePublic),

  // the custom router, add your own routers here
  Trpc.createRouter({
    authentication: AuthenticationServer.trpcRouter,
    configuration: ConfigurationServer.trpcRouter,
    upload: UploadServer.trpcRouter,
    ai: AiServer.trpcRouter,
    email: EmailServer.trpcRouter,

    billing: PaymentServer.trpcRouter,
    rabbitmq: RabbitMQServer.trpcRouter,
    pwa: PwaServer.trpcRouter,
    nango: NangoServer.trpcRouter,
  }),
)

export type AppRouter = typeof appRouter
