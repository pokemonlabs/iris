
import { PageLayout } from '@/designSystem';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from '@remix-run/react';
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Image,
  message,
  Row,
  Space,
  Spin,
  Statistic,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Api } from '~/core/trpc';
import AddTestStepModal from './add-test-step-modal';

const { Title, Text, Paragraph } = Typography;

const statusColors = {
  PENDING: 'blue',
  SUCCESS: 'green',
  FAILED: 'red',
  RUNNING: 'orange',
};

export default function TestDetailsPage() {
  const { testId, organizationId } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: pushJob, isLoading: isLoadingPush } =
    Api.rabbitmq.pushJob.useMutation();
  const [isAddTestStepVisible, setIsAddTestStepVisible] = useState(false);

  const { data: agent, isLoading: isLoadingAgent } = Api.agent.findFirst.useQuery({
    where: { isActive: true, organizationId: organizationId },
  });

  // Fetch test details with related data
  const { data: test, isLoading } = Api.test.findFirst.useQuery({
    where: { id: testId },
    include: {
      project: true,
      createdBy: true,
      testRuns: {
        include: {
          testSteps: true,
          executedBy: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  // Mutation to rerun test
  const { mutateAsync: runTest, isLoading: isRunning } =
    Api.testRun.create.useMutation();

  const { mutateAsync: updateTest } = Api.testRun.update.useMutation();


  const handleMarkAsDone = async (latestRunId) => {
    try {
      await updateTest({
        where: { id: latestRunId },
        data: { status: 'SUCCESS' },
      });
      message.success('Test marked as success!');
      // Trigger any necessary side-effects
      // For example, refresh data or update UI state
    } catch (error) {
      message.error('Failed to mark test as done. Please try again.');
    }
  };

  const handleMarkAsFail = async (latestRunId) => {
    try {
      await updateTest({
        where: { id: latestRunId },
        data: { status: 'FAILED' },
      });
      message.error('Test marked as failed!');
      // Trigger any necessary side-effects
      // For example, refresh data or update UI state
    } catch (error) {
      message.error('Failed to mark test as done. Please try again.');
    }
  };

  const handleRerun = async () => {
    if (!test) return;
    if (!agent) {
      const agentLink = `${window.location.origin}/organizations/${organizationId}/agent`;
      message.error({
        content: (
          <span>
            No active agent found. Add an agent here: <a href={agentLink} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'underline' }}>Add Agent</a>
          </span>
        ),
        duration: 10, // Optional: Set the duration for the message to stay visible
        onClose: () => {
          // Optional: Handle the close event
        },
      });
      return;
    }

    const testRun = await runTest({
      data: {
        status: 'PENDING',
        testId: test.id,
        executedById: test.createdById,
      },
    });

    message.success(`Test run created with id: ${testRun.id}`);

    // check if there is atleast one agent
    await pushJob({
      message:
        test.naturalLanguageInput +
        `The testRunId is: ${testRun.id}. use this to submit the steps you took to test this`,
      conversation_id: test.id,
      custom_system_prompt:
        'You are an ai agent responsible for testing a user journey. You will exit in two cases - If there is an error, or if you have finished the task.',
      only_n_most_recent_images: 1,
      testRunId: testRun.id,
      url: test.url,
      agentId: test.createdById,
      // @ts-ignore
      localStorage: test.project.localStorage,
      // @ts-ignore
      session: test.project.session,
      // @ts-ignore
      cookies: test.project.cookies,
    });

    message.success({
      content: (
        <span>
          Your test has been queued for execution. You can view the results here:{' '}
          <a
            href={`${window.location.origin}/organizations/$/tests/$/results`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1890ff', textDecoration: 'underline' }}
          >
            View Results
          </a>
        </span>
      ),
      duration: 10, // Optional: Set the duration for the message to stay visible
      onClose: () => {
        // Optional: Handle the close event
      },
    });

    navigate(`/organizations/${organizationId}/tests/${testId}`);
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

  const latestRun = test.testRuns[0];

  const showTestStepModal = () => {
    setIsAddTestStepVisible(true);
  };

  const hideTestStepModal = () => {
    setIsAddTestStepVisible(false);
  };

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div style={{ marginBottom: '24px' }}>
            <Row align="middle" gutter={16}>
              <Col>
                <i className="las la-vial" style={{ fontSize: '32px', color: '#1890ff' }} />
              </Col>
              <Col flex="auto">
                <Title level={2} style={{ margin: 0 }}>
                  {test.name}
                </Title>
                <Paragraph>{test.description}</Paragraph>
              </Col>
              <Col>
                <Space>
                  <Tooltip title="Edit Test">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() =>
                        navigate(`/organizations/${organizationId}/tests/${testId}/edit`)
                      }
                    />
                  </Tooltip>
                  <Tooltip title="View Previous Runs">
                    <Button
                      icon={<EyeOutlined />}
                      onClick={() =>
                        navigate(`/organizations/${organizationId}/tests/${testId}/results`)
                      }
                    />
                  </Tooltip>
                </Space>
              </Col>
            </Row>
            <Space style={{ marginTop: '8px' }}>
              <Text type="secondary">
                <i className="las la-folder" /> Project: {test.project.name}
              </Text>
              <Text type="secondary">
                <i className="las la-calendar" /> Created:{' '}
                {dayjs(test.createdAt).format('MMM D, YYYY')}
              </Text>
              <Text type="secondary">
                <i className="las la-user" /> Created by: {test.createdBy.name}
              </Text>
            </Space>
          </div>

          {/* Action Buttons */}
          <Card style={{ marginBottom: '24px' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} style={{ margin: 0 }}>
                  Latest Test Run
                </Title>
              </Col>
              <Col>
                <Space>
                  <Button
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/organizations/${organizationId}/tests/${testId}/results`)}
                  >
                    View Past Runs
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={handleRerun}
                    loading={isRunning}
                  >
                    Run Test
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Latest Run Results */}
          <Card>
            {latestRun ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Row gutter={24} align="middle">
                  <Col xs={24} md={8}>
                    <Statistic
                      title="Status"
                      value={latestRun.status}
                      valueStyle={{ color: statusColors[latestRun.status] }}
                      prefix={<CheckCircleOutlined />}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Statistic
                      title="Executed By"
                      value={latestRun.executedBy.name}
                      prefix={<i className="las la-user" />}
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <Statistic
                      title="Date"
                      value={dayjs(latestRun.createdAt).format('MMM D, YYYY HH:mm')}
                      prefix={<ClockCircleOutlined />}
                    />
                  </Col>
                </Row>
                <Divider />
                <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={showTestStepModal}
                    >
                      Add Test Step
                    </Button>
                    <AddTestStepModal
                      visible={isAddTestStepVisible}
                      onClose={hideTestStepModal}
                      testRunId={latestRun.id}
                    />
                  </Col>
                {
                  latestRun.status.toLowerCase() === 'processing' ?
                  <>
                  <Col>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleMarkAsDone(latestRun.id)}
                  >
                    Mark Test as Success
                  </Button>
                </Col> 
                <Col>
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleMarkAsFail(latestRun.id)}
                  >
                    Mark Test as Failure
                  </Button>
                </Col>
                  </>: null
                } 
                </Row>
                <Timeline>
                  {latestRun.testSteps?.map((step, index) => (
                    <Timeline.Item key={step.id} color={
                      String(step.status).toUpperCase() === 'SUCCESS' ? 'green' : String(step.status).toUpperCase() === 'FAILED' ? 'red' : 'blue'}>
                      <Card
                        type="inner"
                        title={`Step ${index + 1}`}
                      >
                        <Row gutter={[16, 16]}>
                          <Col xs={24} md={12}>
                            <Space direction="vertical">
                              <Text strong>Action: {step.action}</Text>
                              <Text>Status: <Tag color={
                                String(step.status).toUpperCase() === 'SUCCESS' ? 'green' : String(step.status).toUpperCase() === 'FAILED' ? 'red' : 'blue'}>{step.status}</Tag></Text>
                            </Space>
                          </Col>
                          {step.screenshotUrl && (
                            <Col xs={24} md={12}>
                              <Image
                                src={step.screenshotUrl}
                                alt={`Step ${index + 1} screenshot`}
                                style={{ maxWidth: '100%' }}
                              />
                            </Col>
                          )}
                        </Row>
                      </Card>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Space>
            ) : (
              <Empty description="No test runs yet" />
            )}
          </Card>
        </Space>
      </div>
    </PageLayout>
  );
}