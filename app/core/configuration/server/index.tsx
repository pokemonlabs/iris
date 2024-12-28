import { AuthenticationServer } from '~/core/authentication/server'
import { Trpc } from '~/core/trpc/base'

type PublicVariables = {
  authenticationProviders: { name: string }[]
  [key: string]: any
}

export const trpcRouter = Trpc.createRouter({
  getPublic: Trpc.procedurePublic.query(async (): Promise<PublicVariables> => {
    const variables = process.env ?? {}

    const authenticationProviders = AuthenticationServer.getProviders().map(
      provider => ({ name: provider.name }),
    )

    const variablesPublic: PublicVariables = {
      authenticationProviders,
    }

    for (const [key, value] of Object.entries(variables)) {
      const isPublic = key.startsWith('PUBLIC_')

      if (isPublic) {
        variablesPublic[key] = value
      }
    }

    return variablesPublic
  }),
})

export const ConfigurationServer = {
  trpcRouter,
}
