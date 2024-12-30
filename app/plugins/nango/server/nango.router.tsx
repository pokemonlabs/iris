import { Trpc } from '@/core/trpc/base'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { NangoService } from './nango.service'
/**
 * @provider Nango Api
 * @description An library to integrate with 250+ APIs
 * @function {(ProxyConfiguration) => Promise<result} proxy - Send a config proxy request to Nango and get back the result
 * @usage `const nango = useNango(); const {mutateAsync: nangoProxy} = Api.nango.proxy.useMutation();   nango.auth('google', user?.id); const config = {method:'GET', endpoint: 'https://www.googleapis.com/calendar/v3/calendars/primary/events', providerConfigKey: 'google-calendar', connectionId: user?.id}   const { data } = await nangoProxy(config) `
 * @isImportOverriden false
 * @isAlwaysIncluded false
 * @import import { Api } from '@/core/trpc; import { useNango } from '@/plugins/nango/client'
 */

const check = () => {
  if (!NangoService.isActive()) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Set SERVER_NANGO_SECRET_KEY and PUBLIC_NANGO_KEY in your .env to activate Nango',
    })
  }
}

export const NangoRouter = Trpc.createRouter({
  proxy: Trpc.procedure.input(z.any()).mutation(async ({ input, ctx }) => {
    try {
      check()

      const { data } = await NangoService.proxy(input)

      return data
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.log('Failed to query nango:', errorMessage)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to query nango: ${errorMessage}`,
      })
    }
  }),
})
