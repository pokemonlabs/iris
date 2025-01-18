import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Tag,
  Card,
  Row,
  Col,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TestResultsPage() {
  const { testId, organizationId } = useParams()
  const [isShareModalVisible, setIsShareModalVisible] = useState(false)
  const [shareEmail, setShareEmail] = useState('')

  // Fetch test details with related data
  const { data: test } = Api.test.findFirst.useQuery({
    where: { id: testId },
    include: {
      project: true,
      testRuns: {
        include: {
          executedBy: true,
          testSteps: true,
        },
      },
    },
  })

  // Share mutation
  const { mutateAsync: shareTest } = Api.testShare.create.useMutation()

  const handleShare = async () => {
    try {
      await shareTest({
        data: {
          permission: 'VIEW',
          testId: testId!,
          userId: shareEmail, // In a real app, you'd need to lookup the user ID by email
        },
      })
      message.success('Test shared successfully')
      setIsShareModalVisible(false)
    } catch (error) {
      message.error('Failed to share test')
    }
  }

  const columns = [
    {
      title: 'Run Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'SUCCESS'
              ? 'green'
              : status === 'FAILED'
              ? 'red'
              : 'orange'
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Executed By',
      dataIndex: 'executedBy',
      key: 'executedBy',
      render: (user: any) => user?.name || 'Unknown',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          {record.reportUrl && (
            <Button type="link" href={record.reportUrl} target="_blank">
              <i className="las la-download"></i> Download Report
            </Button>
          )}
          {record.errorLog && (
            <Button
              type="link"
              onClick={() =>
                Modal.info({
                  title: 'Error Log',
                  content: (
                    <Paragraph style={{ maxHeight: '400px', overflow: 'auto' }}>
                      {record.errorLog}
                    </Paragraph>
                  ),
                })
              }
            >
              <i className="las la-exclamation-circle"></i> View Errors
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Title level={2}>
                    <i className="las la-vial"></i> Test Results
                  </Title>
                  <Button
                    type="primary"
                    onClick={() => setIsShareModalVisible(true)}
                  >
                    <i className="las la-share"></i> Share Results
                  </Button>
                </div>

                <Paragraph>
                  <Text strong>Project: </Text>
                  {test?.project?.name}
                </Paragraph>
                <Paragraph>
                  <Text strong>Test Name: </Text>
                  {test?.name}
                </Paragraph>
              </Space>
            </Card>
          </Col>

          <Col span={24}>
            <Card
              title={
                <>
                  <i className="las la-history"></i> Test Runs
                </>
              }
            >
              <Table
                dataSource={test?.testRuns || []}
                columns={columns}
                rowKey="id"
                expandable={{
                  expandedRowRender: record => (
                    <Table
                      dataSource={record.testSteps}
                      columns={[
                        { title: 'Step', dataIndex: 'order', key: 'order' },
                        { title: 'Action', dataIndex: 'action', key: 'action' },
                        {
                          title: 'Status',
                          dataIndex: 'status',
                          key: 'status',
                          render: (status: string) => (
                            <Tag color={status.trim().toUpperCase() === 'SUCCESS' ? 'green' : 'red'}>
                              {status}
                            </Tag>
                          ),
                        },
                      ]}
                      pagination={false}
                    />
                  ),
                }}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          title="Share Test Results"
          open={isShareModalVisible}
          onOk={handleShare}
          onCancel={() => setIsShareModalVisible(false)}
        >
          <Paragraph>
            Enter the email of the user you want to share with:
          </Paragraph>
          <input
            type="email"
            value={shareEmail}
            onChange={e => setShareEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid  black', borderRadius: '8px',  }}
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
