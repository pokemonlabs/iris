import { useNavigate } from '@remix-run/react'
import { Button, Space, Typography } from 'antd'

const { Title, Text } = Typography

interface AccessBlockedOverlayProps {
  message: string
  redirectPath: string
  buttonText: string
}

export function AccessBlockedOverlay({ message, redirectPath, buttonText }: AccessBlockedOverlayProps) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <Space direction="vertical" align="center">
        <Title level={2}>
          <i className="las la-lock" /> Access Restricted
        </Title>
        <Text type="secondary">{message}</Text>
        <Button type="primary" size="large" onClick={() => navigate(redirectPath)}>
          {buttonText}
        </Button>
      </Space>
    </div>
  )
}
