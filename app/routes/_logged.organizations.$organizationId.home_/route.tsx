import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Input,
  List,
  Row,
  Statistic,
  Tag,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title, Text } = Typography

export default function DashboardPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('')

  // Fetch recent test runs
  const { data: testRuns } = Api.testRun.findMany.useQuery({
    where: { executedById: user?.id },
    include: { test: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Fetch statistics
  const { data: allTestRuns } = Api.testRun.findMany.useQuery({
    where: { executedById: user?.id },
  })

  // Create new test mutation
  const { mutateAsync: createTest } = Api.test.create.useMutation()
  const { mutateAsync: createTestRun } = Api.testRun.create.useMutation()

  const handleQuickTest = async () => {
    if (!naturalLanguageInput || !organizationId || !user) return

    try {
      const test = await createTest({
        data: {
          name: `Quick Test ${dayjs().format('YYYY-MM-DD HH:mm')}`,
          description: naturalLanguageInput,
          naturalLanguageInput,
          status: 'PENDING',
          projectId: organizationId,
          createdById: user.id,
        },
      })

      await createTestRun({
        data: {
          status: 'PENDING',
          testId: test.id,
          executedById: user.id,
        },
      })

      setNaturalLanguageInput('')
    } catch (error) {
      console.error('Error creating quick test:', error)
    }
  }

  // Calculate statistics
  const totalTests = allTestRuns?.length || 0
  const successfulTests =
    allTestRuns?.filter(run => String(run.status).toUpperCase() === 'SUCCESS')?.length || 0
  const failedTests =
    allTestRuns?.filter(run => String(run.status).toUpperCase() === 'FAILED')?.length || 0

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tachometer-alt"></i> Testing Dashboard
        </Title>
        <Text type="secondary">
          Monitor your testing activities and quickly create new tests
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Total Test Runs"
                value={totalTests}
                prefix={<i className="las la-vial"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Successful Tests"
                value={successfulTests}
                valueStyle={{ color: '#3f8600' }}
                prefix={<i className="las la-check-circle"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <Statistic
                title="Failed Tests"
                value={failedTests}
                valueStyle={{ color: '#cf1322' }}
                prefix={<i className="las la-times-circle"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>
            <i className="las la-magic"></i> Quick Test
          </Title>
          <Input.TextArea
            placeholder="Describe your test in natural language..."
            value={naturalLanguageInput}
            onChange={e => setNaturalLanguageInput(e.target.value)}
            style={{ marginBottom: 16 }}
            rows={4}
          />
          <Button
            type="primary"
            onClick={handleQuickTest}
            icon={<i className="las la-play"></i>}
          >
            Start Test
          </Button>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>
            <i className="las la-history"></i> Recent Test Runs
          </Title>
          <List
            dataSource={testRuns}
            renderItem={run => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <i className="las la-vial" style={{ fontSize: 24 }}></i>
                  }
                  title={run.test?.name}
                  description={dayjs(run.createdAt).format('YYYY-MM-DD HH:mm')}
                />
                <Tag
                  color={
                    String(run.status).toUpperCase() === 'SUCCESS'
                      ? 'success'
                      : run.status === 'FAILED'
                      ? 'error'
                      : 'processing'
                  }
                >
                  {run.status}
                </Tag>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
