import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { useNavigate } from '@remix-run/react'
import { Alert, Button, Flex, Form, Input, message, Typography } from 'antd'
import { useState } from 'react'

const { Text } = Typography

export default function ResetPasswordPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>()

  const [form] = Form.useForm()

  const {
    mutateAsync: resetPassword,
    isLoading,
    isSuccess,
  } = Api.authentication.sendResetPasswordEmail.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      setEmail(values.email)

      await resetPassword({ email: values.email })
    } catch (error) {
      message.error(`Could not reset password: ${error}`)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '340px',
          paddingBottom: '100px',
          paddingTop: '100px',
        }}
        gap="middle"
      >
        <AppHeader description="You will receive a link" />

        {isSuccess && (
          <Alert
            style={{ textAlign: 'center' }}
            message={`We sent an email to ${email} with a link to reset your password`}
            type="success"
          />
        )}

        {!isSuccess && (
          <>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <Input
                  type="email"
                  placeholder="Your email"
                  autoComplete="email"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  block
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        <Flex justify="center" align="center">
          <Button
            ghost
            style={{ border: 'none' }}
            onClick={() => navigate('/login')}
          >
            <Flex gap={'small'} justify="center">
              <Text>Sign in</Text>
            </Flex>
          </Button>

          <Text type="secondary">or</Text>

          <Button
            ghost
            style={{ border: 'none' }}
            onClick={() => navigate('/register')}
          >
            <Flex gap={'small'} justify="center">
              <Text>Sign up</Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
