import { Typography, Form, Input, Button, Card, message } from 'antd'
const { Title, Text } = Typography
import { useNavigate, useParams } from '@remix-run/react'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CreateProjectPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const createProject = Api.project.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      await createProject.mutateAsync({
        data: {
          name: values.name,
          description: values.description,
          organizationId,
        },
      })
      navigate(`/organizations/${organizationId}/projects`)
    } catch (error) {
      message.error(`Could not create project: ${error.message}`)
    }
  }

  return (
    <PageLayout layout="narrow">
      <div className="p-4">
        <Title level={2}>Create New Project</Title>
        <Text type="secondary">Create a new project to organize your tests</Text>

        <Card className="mt-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Project Name"
              name="name"
              rules={[{ required: true, message: 'Please enter a project name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
              label="Description" 
              name="description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={createProject.isLoading}>
                Create Project
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PageLayout>
  )
}
