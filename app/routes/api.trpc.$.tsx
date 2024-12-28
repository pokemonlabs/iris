import { Trpc } from '@/core/trpc/base'
import { appRouter } from '@/server'
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handleRequest = async ({
  request,
}: ActionFunctionArgs | LoaderFunctionArgs) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: options => Trpc.createContext(options),
  })
}

export const loader = handleRequest

export const action = handleRequest
