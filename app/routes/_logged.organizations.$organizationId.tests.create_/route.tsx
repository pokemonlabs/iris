import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import { Button, Card, Form, Input, Select, Space, Typography } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography

export default function CreateTestPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [previewResponse, setPreviewResponse] = useState<string>('')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)

  // Fetch projects for the organization
  const { data: projects, isLoading: isLoadingProjects } =
    Api.project.findMany.useQuery({
      where: { organizationId },
    })

  // Get current user
  const { user } = useUserContext()

  // Mutations
  const createTest = Api.test.create.useMutation()
  const generatePreview = Api.ai.generateText.useMutation()

  const handlePreview = async (values: any) => {
    setIsPreviewLoading(true)
    try {
      const response = await generatePreview.mutateAsync({
        prompt: `Analyze this test scenario and explain how an AI agent would interpret it: ${values.naturalLanguageInput}`,
      })
      setPreviewResponse(response.answer)
    } catch (error) {
      console.error('Preview generation failed:', error)
    }
    setIsPreviewLoading(false)
  }

  const handleSubmit = async (values: any) => {
    try {
      const test = await createTest.mutateAsync({
        data: {
          name: values.name,
          description: values.description,
          url: values.url,
          naturalLanguageInput: values.naturalLanguageInput,
          status: 'DRAFT',
          projectId: values.projectId,
          createdById: user?.id as string,
        },
      })
      navigate(`/organizations/${organizationId}/tests/${test.id}`)
    } catch (error) {
      console.error('Test creation failed:', error)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <i className="las la-vial" /> Create New Test Scenario
            </Title>
            <Text type="secondary">
              Write your test scenario in natural language and configure the
              test parameters.
            </Text>
          </div>

          {(!projects || projects.length === 0) && !isLoadingProjects ? (
            <Card>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%', padding: '24px' }}
              >
                <Text>Please create a project first</Text>
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(`/organizations/${organizationId}/projects/create`)
                  }
                >
                  Create Project
                </Button>
              </Space>
            </Card>
          ) : (
            <Card>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ status: 'DRAFT' }}
                disabled={isLoadingProjects || !projects?.length}
              >
                <Form.Item
                  label="Project"
                  name="projectId"
                  rules={[
                    { required: true, message: 'Please select a project' },
                  ]}
                >
                  <Select placeholder="Select a project">
                    {projects?.map(project => (
                      <Select.Option key={project.id} value={project.id}>
                        {project.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Test Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please enter a test name' },
                  ]}
                >
                  <Input prefix={<i className="las la-heading" />} />
                </Form.Item>

                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item
                  label="Target Website URL"
                  name="url"
                  rules={[
                    { required: true, message: 'Please enter the target URL' },
                    { type: 'url', message: 'Please enter a valid URL' },
                  ]}
                >
                  <Input prefix={<i className="las la-link" />} />
                </Form.Item>

                <Form.Item
                  label="Test Scenario (Natural Language)"
                  name="naturalLanguageInput"
                  rules={[
                    {
                      required: true,
                      message: 'Please describe your test scenario',
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Describe your test scenario in natural language. For example: 'Go to the login page, enter valid credentials, and verify successful login'"
                  />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button
                      type="default"
                      onClick={() => form.validateFields().then(handlePreview)}
                      loading={isPreviewLoading}
                    >
                      <i className="las la-eye" /> Preview Interpretation
                    </Button>
                    <Button type="primary" htmlType="submit">
                      <i className="las la-save" /> Create Test
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          )}

          {previewResponse && (
            <Card
              title={
                <>
                  <i className="las la-robot" /> AI Interpretation
                </>
              }
            >
              <Text>{previewResponse}</Text>
            </Card>
          )}
        </Space>
      </div>
    </PageLayout>
  )
}
