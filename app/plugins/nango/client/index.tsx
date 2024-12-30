'use client'
import Nango from '@nangohq/frontend'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { Api } from '~/core/trpc'

export const useNango = () => {
  const [nango, setNango] = useState<Nango | null>(null)

  const { data, isLoading } = Api.configuration.getPublic.useQuery()

  const action = () => {
    return (
      <Button
        href="https://dev.marblism.com/next/Building-Your-Application/Integrations/nango"
        target="_blank"
      >
        Read more
      </Button>
    )
  }
  useEffect(() => {
    const initNango = (nangoPublicKey: string) => {
      if (nangoPublicKey) {
        // return a new Nango instance
        const nangoInstance = new Nango({
          publicKey: nangoPublicKey,
        })
        setNango(nangoInstance)
      } else {
        // Create a fake Nango instance that triggers an error if the key is missing
        const errorNango = {
          auth: () => {
            message.info(
              'PUBLIC_NANGO_KEY is missing in your environment variables, unable to authenticate.',
            )
            console.error('PUBLIC_NANGO_KEY is missing, cannot call auth')
          },
        }

        setNango(errorNango as unknown as Nango)
      }
    }

    if (!nango) {
      if (!isLoading && data) {
        const nangoPublicKey = data['PUBLIC_NANGO_KEY']
        initNango(nangoPublicKey)
      }
    }
  }, [data, isLoading])

  return nango
}
