import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Input,
  Modal,
  Space,
  Typography,
  message
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input

export default function TestsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useUserContext()

  // Fetch tests with included relations
  const { data: tests, refetch } = Api.test.findMany.useQuery({
    where: {
      project: {
        organizationId,
      },
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    },
    include: {
      project: true,
      createdBy: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Delete mutation
  const { mutateAsync: deleteTest } = Api.test.delete.useMutation()

  // Duplicate mutation
  const { mutateAsync: createTest } = Api.test.create.useMutation()

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

  const handleDuplicate = async (test: any) => {
    try {
      const { id, createdAt, updatedAt, ...testData } = test
      await createTest({
        data: {
          ...testData,
          name: `${testData.name} (Copy)`,
          createdById: user?.id || '',
        },
      })
      message.success('Test duplicated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to duplicate test')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <i className="las la-vial" style={{ marginRight: 8 }}></i>
              My Tests
            </Title>
            <Text type="secondary">
              Manage and organize all your automated tests in one place
            </Text>
          </div>

          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Search
              placeholder="Search tests..."
              style={{ width: 300 }}
              onChange={e => setSearchQuery(e.target.value)}
              prefix={<i className="las la-search"></i>}
            />
            <Button
              type="primary"
              icon={<i className="las la-plus"></i>}
              onClick={() =>
                navigate(`/organizations/${organizationId}/tests/create`)
              }
            >
              Create New Test
            </Button>
          </Space>

          {tests?.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <i
                className="las la-folder-open"
                style={{ fontSize: 48, color: '#999' }}
              ></i>
              <Title level={4}>No tests found</Title>
              <Text type="secondary">
                Create your first test or try a different search
              </Text>
            </div>
          )}
        </Space>
      </div>
    </PageLayout>
  )
}
