import { useUserContext } from '@/core/context';
import { Api } from '@/core/trpc';
import { PageLayout } from '@/designSystem';
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  DiscordOutlined,
  SlackOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;

interface Integration {
  id: string;
  type: 'jira' | 'linear' | 'slack' | 'discord';
  name: string;
  config: any;
}

const integrationTypeLabels: Record<
  Integration['type'],
  { label: string; icon: React.ReactNode; description: string }
> = {
  jira: {
    label: 'Jira',
    icon: <AppstoreAddOutlined />,
    description: 'Connect to Jira for issue tracking.',
  },
  linear: {
    label: 'Linear',
    icon: <ThunderboltOutlined />,
    description: 'Integrate with Linear for project management.',
  },
  slack: {
    label: 'Slack',
    icon: <SlackOutlined />,
    description: 'Send notifications to your Slack channels.',
  },
  discord: {
    label: 'Discord',
    icon: <DiscordOutlined />,
    description: 'Receive alerts in your Discord server.',
  },
};

export default function IntegrationsPage() {
  const { user } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedIntegrationType, setSelectedIntegrationType] =
    useState<Integration['type'] | null>(null);
  const [selectedIntegrationToEdit, setSelectedIntegrationToEdit] =
    useState<Integration | null>(null);
  const [editing, setEditing] = useState(false);

  const {
    data: integrations,
    isLoading: isLoadingIntegrations,
    refetch,
  } = Api.integration.findMany.useQuery();

  const { mutateAsync: createIntegration, isLoading: isLoadingCreate } =
    Api.integration.create.useMutation();
  const { mutateAsync: updateIntegration, isLoading: isLoadingUpdate } =
    Api.integration.update.useMutation();
  const { mutateAsync: deleteIntegration, isLoading: isLoadingDelete } =
    Api.integration.delete.useMutation();

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      if (!editing) {
        setSelectedIntegrationType(null);
      }
      setSelectedIntegrationToEdit(null);
      setEditing(false);
    }
  }, [isModalOpen, form, editing]);

  const handleDelete = async (integrationId: string) => {
    try {
      await deleteIntegration({ integrationId });
      message.success('Integration deleted successfully');
      refetch();
    } catch (error) {
      message.error('Failed to delete integration');
    }
  };

  const handleEdit = async (integration: Integration) => {
    setSelectedIntegrationToEdit(integration);
    setSelectedIntegrationType(integration.type);
    form.setFieldsValue({
      name: integration.name,
      ...integration.config,
    });
    setEditing(true);
    setIsModalOpen(true);
  };

  const handleAddNew = (type: Integration['type']) => {
    setSelectedIntegrationType(type);
    setEditing(false);
    setSelectedIntegrationToEdit(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    if (!selectedIntegrationType) {
      message.error('Please select an integration type.');
      return;
    }

    try {
      const config = { ...values };
      delete config.name; // Remove name from config object

      if (editing && selectedIntegrationToEdit) {
        await updateIntegration({
          integrationId: selectedIntegrationToEdit.id,
          type: selectedIntegrationType,
          name: values.name,
          config,
        });
        message.success('Integration updated successfully');
      } else {
        await createIntegration({
          type: selectedIntegrationType,
          name: values.name,
          config,
        });
        message.success('Integration created successfully');
      }
      setIsModalOpen(false);
      form.resetFields();
      refetch();
    } catch (error) {
      message.error('Failed to save integration');
    }
  };

  const renderIntegrationForm = () => {
    switch (selectedIntegrationType) {
      case 'jira':
        return (
          <>
            <Form.Item
              name="jiraUrl"
              label="Jira URL"
              rules={[{ required: true, message: 'Please enter Jira URL' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="jiraUsername"
              label="Jira Username"
              rules={[{ required: true, message: 'Please enter Jira Username' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="jiraApiToken"
              label="Jira API Token"
              rules={[{ required: true, message: 'Please enter Jira API Token' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="jiraProjectKey"
              label="Jira Project Key"
              rules={[{ required: true, message: 'Please enter Jira Project Key' }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      case 'linear':
        return (
          <>
            <Form.Item
              name="linearApiKey"
              label="Linear API Key"
              rules={[{ required: true, message: 'Please enter Linear API Key' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="linearTeamId"
              label="Linear Team ID"
              rules={[{ required: true, message: 'Please enter Linear Team ID' }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      case 'slack':
        return (
          <>
            <Form.Item
              name="slackWebhookUrl"
              label="Slack Webhook URL"
              rules={[{ required: true, message: 'Please enter Slack Webhook URL' }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      case 'discord':
        return (
          <>
            <Form.Item
              name="discordWebhookUrl"
              label="Discord Webhook URL"
              rules={[{ required: true, message: 'Please enter Discord Webhook URL' }]}
            >
              <Input />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  const availableIntegrations: Integration['type'][] = [
    'jira',
    'linear',
    'slack',
    'discord',
  ];

  return (
    <PageLayout>
      <Alert
        message="Manage Integrations"
        description="Connect your project management and communication tools to enable automated bug reporting and notifications."
        type="info"
        showIcon
        banner
        style={{ marginBottom: 24 }}
      />
      <Card title="Available Integrations">
        <Row gutter={[16, 16]}>
          {availableIntegrations.map((type) => (
            <Col key={type} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => handleAddNew(type)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                {integrationTypeLabels[type].icon}
                <Title level={5} style={{ marginTop: 8, marginBottom: 4 }}>
                  {integrationTypeLabels[type].label}
                </Title>
                <Paragraph type="secondary">
                  {integrationTypeLabels[type].description}
                </Paragraph>
                <Button type="primary" style={{ marginTop: 12 }}>
                  Add
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {integrations && integrations.length > 0 && (
        <Card title="Your Integrations" style={{ marginTop: 20 }}>
          <Row gutter={[16, 16]}>
            {integrations.map((integration) => (
              <Col key={integration.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  title={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {integrationTypeLabels[integration.type].icon}{' '}
                        <span style={{ marginLeft: 5 }}>{integration.name}</span>
                      </span>
                      <Tooltip title="Delete">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(integration.id);
                          }}
                          loading={isLoadingDelete}
                        />
                      </Tooltip>
                    </div>
                  }
                  onClick={() => handleEdit(integration)}
                >
                  <Paragraph type="secondary">
                    Type: {integrationTypeLabels[integration.type].label}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      )}

      <Modal
        title={`${editing ? 'Edit' : 'Add New'} Integration`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Integration Name"
            rules={[
              {
                required: true,
                message: 'Please enter a name for this integration',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {renderIntegrationForm()}
          <Form.Item>
            <Space>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingCreate || isLoadingUpdate}
              >
                {editing ? 'Update' : 'Add Integration'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  );
}