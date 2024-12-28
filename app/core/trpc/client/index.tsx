import { AppRouter } from '@/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React, { ReactNode, useState } from 'react'
import superjson from 'superjson'
import { createTRPCReact } from '../../.iris/zenstack/client/react'

export const Api = createTRPCReact<AppRouter>()

const transformer = superjson

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false, // Disable retries globally for queries
          },
          mutations: {
            retry: false, // Disable retries globally for mutations
          },
        },
      }),
  )

  const [trpcClient] = useState(() =>
    Api.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    }),
  )

  return (
    <Api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Api.Provider>
  )
}

export const TrpcClient = {
  Provider,
}
