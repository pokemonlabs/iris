import { Api } from '@/core/trpc';
import { PageLayout } from '@/designSystem';
import { useNavigate, useParams } from '@remix-run/react';
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  Space,
  Spin,
  Switch,
  Tag,
  Typography,
  message,
} from 'antd';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export default function EditTestPage() {
  const { testId, organizationId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch test details with related data
  const { data: test, isLoading } = Api.test.findFirst.useQuery({
    where: { id: testId },
    include: {
      project: true,
      createdBy: true,
    },
  });

  // Mutation to update test
  const { mutateAsync: updateTest, isLoading: isUpdating } =
    Api.test.update.useMutation();

  const handleUpdate = async (values) => {
    if (!test) return;
    setIsSubmitting(true);
    try {
      await updateTest({
        where: { id: test.id },
        data: {
          name: values.name,
          description: values.description,
          isActive: values.isActive,
          url: values.url,
          naturalLanguageInput: values.naturalLanguageInput,
        },
      });
      message.success('Test updated successfully!');
      navigate(`/organizations/${organizationId}/tests/${testId}`);
    } catch (error) {
      console.error('Failed to update test:', error);
      message.error('Failed to update test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    );
  }

  if (!test) {
    return (
      <PageLayout layout="full-width">
        <Empty description="Test not found" />
      </PageLayout>
    );
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div>
            <Space align="center" style={{ marginBottom: '16px' }}>
              <i className="las la-vial" style={{ fontSize: '24px' }} />
              <Title level={2} style={{ margin: 0 }}>
                Edit Test: {test.name}
              </Title>
            </Space>
            <Paragraph>Update the details of your test below.</Paragraph>
          </div>

          {/* Edit Form */}
          <Card>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                name: test.name,
                description: test.description,
                isActive: test.isActive,
                url: test.url,
                naturalLanguageInput: test.naturalLanguageInput,
              }}
              onFinish={handleUpdate}
            >
              <Form.Item
                label="Test Name"
                name="name"
                rules={[{ required: true, message: 'Please input the test name!' }]}
              >
                <Input placeholder="Enter test name" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the test description!' }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter test description"
                />
              </Form.Item>

              <Form.Item
                label="URL"
                name="url"
              >
                <Input placeholder="Enter test URL" />
              </Form.Item>

              <Form.Item
                label="Natural Language Input"
                name="naturalLanguageInput"
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter natural language input"
                />
              </Form.Item>

              <Form.Item
                label="Active"
                name="isActive"
                valuePropName="checked"
              >
                <Space>
                  <Switch />
                  {!form.getFieldValue('isActive') && <Tag color="default">Inactive</Tag>}
                </Space>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`/organizations/${organizationId}/tests`)
                    }
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </div>
    </PageLayout>
  );
}