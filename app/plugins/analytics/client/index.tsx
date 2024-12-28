import { Api } from '@/core/trpc'
import Posthog from 'posthog-js'
import React, { ReactNode, useEffect, useRef } from 'react'
import { Configuration } from '~/core/configuration'

const importPostHogProvider = async () => {
  if (typeof window !== 'undefined') {
    const value = (await import('posthog-js/react')).PostHogProvider
    return value
  }
}

type Props = {
  children: ReactNode
}

export const AnalyticsProvider: React.FC<Props> = ({ children }) => {
  const { data, isLoading } = Api.configuration.getPublic.useQuery()

  const PostHogProvider =
    useRef<Awaited<ReturnType<typeof importPostHogProvider>>>()

  useEffect(() => {
    const isProduction = Configuration.isProduction()
    const canActivate =
      typeof window !== 'undefined' && !isLoading && data && isProduction

    if (canActivate) {
      const key = data['PUBLIC_POSTHOG_KEY']
      const host = data['PUBLIC_POSTHOG_HOST']

      try {
        Posthog.init(key, {
          api_host: host,
        })
      } catch (error) {
        console.log(`Could not start analytics: ${error.message}`)
      }
    }
  }, [data, isLoading])

  useEffect(() => {
    importPostHogProvider().then(value => (PostHogProvider.current = value))
  }, [])

  if (!PostHogProvider.current) {
    return <>{children}</>
  }

  return (
    <PostHogProvider.current client={Posthog}>
      {children}
    </PostHogProvider.current>
  )
}
