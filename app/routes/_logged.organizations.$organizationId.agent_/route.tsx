import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import Anthropic from '@anthropic-ai/sdk'
import { Button, Flex, Form, Input, Modal, Popconfirm, Select, Table, Tag, Typography } from 'antd'
import { useState } from 'react'
import { useUserContext } from '~/core/context'
import { Api } from '~/core/trpc'
import { PageLayout, useDesignSystem } from '~/designSystem'

type ProviderType = 'anthropic' | 'bedrock' | 'vertex'
type ModelType = 'CLAUDE_3_OPUS' | 'CLAUDE_3_SONNET' | 'CLAUDE_3_HAIKU' | 'CLAUDE_2' | 'CLAUDE_INSTANT'

interface CredentialFormData {
  provider: ProviderType
  modelType: ModelType
  anthropicApiKey?: string
  awsAccessKeyId?: string
  awsSecretAccessKey?: string
  awsSessionToken?: string
  awsRegion?: string
  apiEndpoint?: string
  apiKey?: string
}

interface AgentCredentialWithProvider {
  id: string
  provider: ProviderType
  modelType: ModelType
  numAgents: number
  createdAt: string
  config?: {
    awsRegion?: string
    apiEndpoint?: string
  }
}

export default function AgentConfigPage() {
  const { organization } = useUserContext()
  const { message } = useDesignSystem()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [provider, setProvider] = useState<ProviderType>()
  const [isCredentialValidated, setIsCredentialValidated] = useState(false)

  const {
    data: credentials,
    isLoading: isLoadingCredentials,
    refetch: refetchCredentials,
  } = Api.agent.findMany.useQuery(
    {
      where: { organizationId: organization.id },
      orderBy: { createdAt: 'desc' },
    },
    { initialData: [] },
  )

  const { mutate: createCredential, isLoading: isLoadingCreate } =
    Api.agent.create.useMutation({
      onSuccess: () => {
        message.success('Credential added successfully')
        form.resetFields()
        setProvider(undefined)
        setIsModalOpen(false)
        refetchCredentials()
      },
      onError: (error) => {
        message.error('Failed to add credential: ' + error.message)
      }
    })

  const { mutate: deleteCredential, isLoading: isLoadingDelete } =
    Api.agent.delete.useMutation({
      onSuccess: () => {
        message.success('Credential deleted successfully')
        refetchCredentials()
      },
      onError: (error) => {
        message.error('Failed to delete credential: ' + error.message)
      }
    })

  const handleCreate = async (values: CredentialFormData) => {
    const credentialData = {
      provider: values.provider,
      modelType: values.modelType,
      organizationId: organization.id,
      ...(values.provider === 'anthropic' && {
        anthropicApiKey: values.anthropicApiKey,
      }),
      ...(values.provider === 'bedrock' && {
        awsAccessKeyId: values.awsAccessKeyId,
        awsSecretAccessKey: values.awsSecretAccessKey,
        awsSessionToken: values.awsSessionToken,
        awsRegion: values.awsRegion,
      }),
      ...(values.provider === 'vertex' && {
        apiEndpoint: values.apiEndpoint,
        apiKey: values.apiKey,
      }),
    }

    createCredential({ data: credentialData })
  }

  const handleDelete = async (credential: AgentCredentialWithProvider) => {
    deleteCredential({ where: { id: credential.id } })
  }

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null);
  const verifyAnthropicKey = async (apiKey: string) => {
    setIsVerifying(true);
    try {
      const anthropic = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
      await anthropic.models.list();
      setVerificationStatus('success');
      setIsCredentialValidated(true);
      message.success('API key is valid');
    } catch (error) {
      setVerificationStatus('error');
      setIsCredentialValidated(false);
      message.error('Invalid API key');
    } finally {
      setIsVerifying(false);
    }
  };

  const dataSource = credentials
    .map(item => ({ ...item, key: item.id }))
    .filter(item => !provider || item.provider === provider)

  const getProviderFields = () => {
    switch (provider) {
      case 'anthropic':
        return (
          <Form.Item
            name="apiKey"
            label="API Key"
            rules={[{ required: true, message: 'API Key is required' }]}
          >
            <Input.Group compact>
              <Form.Item
                name="apiKey"
                noStyle
                rules={[{ required: true, message: 'API Key is required' }]}
              >
                <Input
                  style={{ width: 'calc(100% - 88px)' }}
                  placeholder="Enter API key"
                  status={verificationStatus === 'error' ? 'error' : undefined}
                />
              </Form.Item>
              <Button
                loading={isVerifying}
                onClick={async () => {
                  const apiKey = form.getFieldValue('apiKey');
                  if (apiKey) {
                    await verifyAnthropicKey(apiKey);
                  } else {
                    message.warning('Please enter an API key first');
                  }
                }}
                style={{ width: '88px' }}
              >
                Verify
              </Button>
            </Input.Group>
          </Form.Item>
        );
      case 'bedrock':
        return (
          <>
            <Form.Item
              name="accessKeyId"
              label="Access Key ID"
              rules={[{ required: true, message: 'Access Key ID is required' }]}
            >
              <Input placeholder="Enter Access Key ID" />
            </Form.Item>
            <Form.Item
              name="secretAccessKey"
              label="Secret Access Key"
              rules={[{ required: true, message: 'Secret Access Key is required' }]}
            >
              <Input placeholder="Enter Secret Access Key" />
            </Form.Item>
            <Form.Item
              name="region"
              label="Region"
              rules={[{ required: true, message: 'Region is required' }]}
            >
              <Input placeholder="Enter Region" />
            </Form.Item>
          </>
        );
      case 'vertex':
        return (
          <Form.Item
            name="serviceAccountKey"
            label="Service Account Key"
            rules={[{ required: true, message: 'Service Account Key is required' }]}
          >
            <Input.TextArea
              placeholder="Enter Service Account Key JSON"
              rows={4}
            />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const getModelOptions = (provider: ProviderType) => {
    switch (provider) {
      case 'anthropic':
        return [
          { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet' },
          { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku' },
          // { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus' },
          // { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
          // { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
        ]
      case 'bedrock':
        return [
          { value: 'anthropic.claude-3-5-sonnet-20241022-v2:0', label: 'Claude 3.5 Sonnet' },
          { value: 'anthropic.claude-3-5-haiku-20241022-v1:0', label: 'Claude 3.5 Haiku' },
          // { value: 'anthropic.claude-3-opus-20240229-v1:0', label: 'Claude 3 Opus' },
          // { value: 'anthropic.claude-3-sonnet-20240229-v1:0', label: 'Claude 3 Sonnet' },
          // { value: 'anthropic.claude-3-haiku-20240307-v1:0', label: 'Claude 3 Haiku' },
        ]
      case 'vertex':
        return [
          { value: 'claude-3-5-sonnet-v2@20241022', label: 'Claude 3.5 Sonnet' },
          { value: 'claude-3-5-haiku@20241022', label: 'Claude 3.5 Haiku' },
          // { value: 'claude-3-opus@20240229', label: 'Claude 3 Opus' },
          // { value: 'claude-3-sonnet@20240229', label: 'Claude 3 Sonnet' },
          // { value: 'claude-3-haiku@20240307', label: 'Claude 3 Haiku' },
        ]
      default:
        return []
    }
  }

  const columns = [
    {
      title: `${dataSource.length} Credentials`,
      key: 'provider',
      render: (credential: AgentCredentialWithProvider) => (
        <Flex gap={8} align="center">
          <Typography.Text>{credential.provider}</Typography.Text>
          <Tag color="blue">{credential.modelType}</Tag>
        </Flex>
      ),
    },
    {
      title: 'Configuration',
      key: 'config',
      render: (credential: AgentCredentialWithProvider) => {
        const config = credential.provider === 'bedrock' ?
          credential.config?.awsRegion :
          credential.provider === 'vertex' ?
            credential.config?.apiEndpoint :
            'API Key configured'
        return <Typography.Text type="secondary">{config}</Typography.Text>
      }
    },
    {
      title: 'Agents',
      key: 'numAgents',
      render: (credential: AgentCredentialWithProvider) => (
        <Tag bordered={false}>
          {credential.numAgents} active
        </Tag>
      ),
    },
    {
      title: 'Added',
      key: 'createdAt',
      render: (credential: AgentCredentialWithProvider) => (
        <Typography.Text type="secondary">
          {new Date(credential.createdAt).toLocaleDateString()}
        </Typography.Text>
      ),
    },
    {
      title: '',
      key: 'delete',
      width: '50px',
      render: (credential: AgentCredentialWithProvider) => (
        <Flex gap={8} justify="end">
          <Popconfirm
            title="Are you sure you want to delete this credential?"
            description="This will deactivate any agents using this credential."
            onConfirm={() => handleDelete(credential)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              size="small"
              type="text"
              icon={<DeleteOutlined />}
              loading={isLoadingDelete}
            />
          </Popconfirm>
        </Flex>
      ),
    },
  ]

  return (
    <PageLayout>
      <Flex
        gap={30}
        vertical
        justify="center"
        align="center"
        style={{ width: '100%' }}
      >
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <Typography.Title level={1} style={{ margin: 0 }}>Agent Credentials</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Configure Agent
          </Button>
        </Flex>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoadingCredentials}
          style={{ width: '100%' }}
        />

        <Modal
          title="Agent Configuration"
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            form.resetFields();
            setProvider(undefined);
            setIsCredentialValidated(false);
          }}
          footer={null}
        >
          <Form
            form={form}
            onFinish={handleCreate}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="provider"
              label="Provider"
              rules={[{ required: true, message: 'Provider is required' }]}
            >
              <Select
                placeholder="Select provider"
                onChange={(value: ProviderType) => {
                  setProvider(value);
                  setIsCredentialValidated(false);
                }}
                options={[
                  { value: 'anthropic', label: 'Anthropic' },
                  { value: 'bedrock', label: 'AWS Bedrock' },
                  { value: 'vertex', label: 'Google Vertex' },
                ]}
              />
            </Form.Item>

            {provider && (
              <Form.Item
                name="modelType"
                label="Model"
                rules={[{ required: true, message: 'Model is required' }]}
              >
                <Select
                  placeholder="Select model"
                  options={getModelOptions(provider)}
                />
              </Form.Item>
            )}

            {getProviderFields()}

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingCreate}
                block
                disabled={!isCredentialValidated}
              >
                Configure Agent
              </Button>
            </Form.Item>

            {/* Links section */}
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <a
                href="https://docs.anthropic.com/en/docs/about-claude/models"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', marginBottom: 8 }}
              >
                Learn more about Claude models
              </a>
              <a
                href="https://console.anthropic.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Claude credits
              </a>
            </div>
          </Form>
        </Modal>
      </Flex>
    </PageLayout>
  )
}