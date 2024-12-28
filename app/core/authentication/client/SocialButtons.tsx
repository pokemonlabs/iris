import { GoogleOutlined, LoginOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import React from 'react'
import { Api } from '~/core/trpc'

export const SocialButtons: React.FC = () => {
  const { data } = Api.configuration.getPublic.useQuery()

  const providers = data?.authenticationProviders ?? []

  if (providers.length === 0) {
    return <></>
  }

  const ProviderIcon = (props: { name: string }) => {
    switch (props.name) {
      case 'google':
        return <GoogleOutlined />
      default:
        return <LoginOutlined />
    }
  }

  return (
    <>
      <Flex vertical align="center">
        {providers.map(provider => (
          <a
            key={provider.name}
            href={`/api/auth/${provider.name}`}
            className="w-full"
          >
            <Button
              size="large"
              icon={<ProviderIcon name={provider.name} />}
              block
            >
              Continue with{' '}
              <span style={{ textTransform: 'capitalize' }}>
                {provider.name}
              </span>
            </Button>
          </a>
        ))}
      </Flex>
    </>
  )
}
