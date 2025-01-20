import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Test } from '@prisma/client'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useUserContext } from '~/core/context'

const { Title, Text } = Typography
const { Search } = Input

export default function ProjectTestsPage() {
  const { projectId, organizationId } = useParams()
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)

  // Fetch project details
  const { data: project } = Api.project.findFirst.useQuery({
    where: { id: projectId },
  })

  const { mutateAsync: pushJob } = Api.rabbitmq.pushJob.useMutation()

  // Fetch tests for this project
  const { data: tests, refetch } = Api.test.findMany.useQuery({
    where: {
      projectId,
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      }
    },
    include: {
      testRuns: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      }
    },
  })

  // Delete mutation
  const { mutateAsync: deleteTest } = Api.test.delete.useMutation()

  // Run test mutation
  const { mutateAsync: createTestRun } = Api.testRun.create.useMutation()

  const handleDelete = async (testId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this test?',
      content: 'This action cannot be undone.',
      okText: 'Yes, delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteTest({ where: { id: testId } })
          message.success('Test deleted successfully')
          refetch()
        } catch (error) {
          message.error('Failed to delete test')
        }
      },
    })
  }

  const handleRun = async (test: Test) => {
    try {
      const testRun = await createTestRun({
        data: {
          testId: test.id,
          status: "PENDING",
          executedById: user.id,
        }
      })

      await pushJob({
        // shouldn't the url come from the project page itself! lol
        url: test.url,
        testRunId: testRun.id,
        message: test.naturalLanguageInput + `testRunId: ${testRun.id}, use this to submit the steps you took.`,
        conversation_id: test.id,
        custom_system_prompt: "You are an ai agent responsible for testing a user journey. You will exit in two cases - If there is an error, or if you have finished the task.",
        only_n_most_recent_images: 1,
        agentId: test.createdById,

        // @ts-ignore
        session: project.session,
        // @ts-ignore
        cookies: project.cookies,
        // @ts-ignore
        localStorage: project.localStorage,
        useUserDataDirectory: project.useUserDataDirectory,
      });

      message.success('Test started successfully')
      refetch()
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleRunAllTests = async () => {
    const inactiveTests = tests?.filter(test => !test.isActive) || []
    const activeTests = tests?.filter(test => test.isActive) || []

    // Show preview modal with inactive tests
    if (inactiveTests.length > 0) {
      setIsPreviewModalOpen(true)
      return
    }

    // Run all active tests
    for (const test of activeTests) {
      const testRun = await createTestRun({
        data: {
          testId: test.id,
          status: "PENDING",
          executedById: user.id,
        }
      })

      await pushJob({
        // shouldn't the url come from the project page itself! lol
        url: test.url,
        testRunId: testRun.id,
        message: test.naturalLanguageInput + `testRunId: ${testRun.id}, use this to submit the steps you took.`,
        conversation_id: test.id,
        custom_system_prompt: "You are an ai agent responsible for testing a user journey. You will exit in two cases - If there is an error, or if you have finished the task.",
        only_n_most_recent_images: 1,
        agentId: test.createdById,

        // @ts-ignore
        session: project.session,
        // @ts-ignore
        cookies: project.cookies,
        // @ts-ignore
        localStorage: project.localStorage,
        useUserDataDirectory: project.useUserDataDirectory,
      });
    }

    message.success(`Started ${activeTests.length} tests`)
  }

  return (
    <PageLayout layout="full-width">
      <div className="max-w-[1200px] mx-auto p-6">
        <Space direction="vertical" size="large" className="w-full">
          {/* Header Section */}
          <div>
            <Title level={2}>
              <i className="las la-project-diagram" /> {project?.name}
            </Title>
            <Text type="secondary">{project?.description}</Text>
          </div>

          {/* Search and Action Button */}
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search tests..."
              style={{ width: 300 }}
              onChange={e => setSearchQuery(e.target.value)}
              prefix={<i className="las la-search"></i>}
            />
            <Space>
              <Button
                type="primary"
                icon={<i className="las la-play-circle" />}
                onClick={handleRunAllTests}
              >
                Run All Tests
              </Button>
              <Button
                type="primary"
                icon={<i className="las la-plus" />}
                onClick={() =>
                  navigate(
                    `/organizations/${organizationId}/tests/create?projectId=${projectId}`,
                  )
                }
              >
                Create Test
              </Button>
            </Space>
          </Space>

          {/* Tests Grid */}
          <Row gutter={[16, 16]}>
            {tests?.sort((a, b) => Number(b.isActive) - Number(a.isActive)).map(test => (
              <Col xs={24} sm={12} lg={8} key={test.id}>
                <Card
                  onClick={() => navigate(`/organizations/${organizationId}/tests/${test.id}`)}
                  hoverable
                  className={`${!test.isActive ? 'opacity-60 grayscale' : ''}`}
                >
                  <div className="flex flex-col gap-2">
                    <Title level={4} className="!mb-0">
                      {test.name}
                    </Title>

                    <div className="flex items-center gap-2">
                      <Tag
                        color={
                          String(test.testRuns?.[0]?.status).toUpperCase() === 'SUCCESS'
                            ? 'success'
                            : String(test.testRuns?.[0]?.status).toUpperCase() === 'FAILED'
                              ? 'error'
                              : 'processing'
                        }
                      >
                        {String(test.testRuns?.[0]?.status).toUpperCase() || 'NO RUNS'}
                      </Tag>
                      {!test.isActive && (
                        <Tag color="default">Inactive</Tag>
                      )}
                    </div>

                    {test.testRuns?.[0] && (
                      <Text type="secondary" className="mb-4">
                        Last run:{' '}
                        {dayjs(test.testRuns[0].createdAt).format(
                          'YYYY-MM-DD HH:mm',
                        )}
                      </Text>
                    )}

                    <Space>
                      <Button
                        type="primary"
                        icon={<i className="las la-play" />}
                        disabled={!test.isActive}
                        onClick={e => {
                          e.stopPropagation()
                          handleRun(test)
                        }}
                      >
                        Run
                      </Button>
                      <Button
                        icon={<i className="las la-edit" />}
                        onClick={e => {
                          e.stopPropagation()
                          navigate(
                            `/organizations/${organizationId}/tests/${test.id}/edit`,
                          )
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        danger
                        icon={<i className="las la-trash" />}
                        onClick={e => {
                          e.stopPropagation()
                          handleDelete(test.id)
                        }}
                      >
                        Delete
                      </Button>
                    </Space>
                  </div>
                </Card>
              </Col>
            ))}

            {!tests?.length && (
              <Col span={24}>
                <Card className="text-center py-12">
                  <Space direction="vertical" align="center">
                    <i className="las la-vial text-4xl text-gray-400" />
                    <Title level={4}>No Tests Yet</Title>
                    <Text type="secondary">
                      Create your first test or try a different search
                    </Text>
                    <Button
                      type="primary"
                      onClick={() =>
                        navigate(
                          `/organizations/${organizationId}/tests/create?projectId=${projectId}`,
                        )
                      }
                    >
                      Create Test
                    </Button>
                  </Space>
                </Card>
              </Col>
            )}
          </Row>

          <Modal
            title="Inactive Tests Preview"
            open={isPreviewModalOpen}
            onOk={() => {
              setIsPreviewModalOpen(false)
              handleRunAllTests()
            }}
            onCancel={() => setIsPreviewModalOpen(false)}
          >
            <Text>The following tests are inactive and will be skipped:</Text>
            <div className="mt-4">
              {tests?.filter(test => !test.isActive).map(test => (
                <div key={test.id} className="mb-2">
                  - {test.name}
                </div>
              ))}
            </div>
          </Modal>
        </Space>
      </div>
    </PageLayout>
  )
}  