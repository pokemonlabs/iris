import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd'
import { useState } from 'react'

const { Title, Text } = Typography
const { Search } = Input

export default function ProjectsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: projects } = Api.project.findMany.useQuery({
    where: {
      organizationId,
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    },
    include: {
      _count: {
        select: {
          tests: true
        }
      }
    }
  })

  return (
    <PageLayout layout="full-width">
      <div className="max-w-[1200px] mx-auto p-6">
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-between items-center">
            <div>
              <Title level={2}>
                <i className="las la-project-diagram" /> Projects
              </Title>
              <Text type="secondary">
                Manage and organize your test projects
              </Text>
            </div>
            <Button
              type="primary"
              icon={<i className="las la-plus" />}
              onClick={() => navigate(`/organizations/${organizationId}/projects/create`)}
            >
              Create Project
            </Button>
          </div>

          <Search
            placeholder="Search projects..."
            style={{ width: 300 }}
            onChange={e => setSearchQuery(e.target.value)}
            prefix={<i className="las la-search"></i>}
          />

          <Row gutter={[16, 16]}>
          {projects?.map(project => (
              <Col xs={24} sm={12} lg={8} key={project.id}>
                <Card
                  onClick={() => navigate(`/organizations/${organizationId}/projects/${project.id}/tests`)}
                  hoverable
                >
                  <div className="flex flex-col gap-2">
                    <Title level={4} className="!mb-0">
                      {project.name}
                    </Title>
                    <Text type="secondary" className="mb-4">
                      {project.description || 'No description'}
                    </Text>
                    <div className="flex items-center gap-2 mb-4">
                      <i className="las la-vial text-lg" />
                      <Text>{project._count.tests} Tests</Text>
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="primary"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent Card's onClick from triggering
                          navigate(`/organizations/${organizationId}/projects/${project.id}/tests`);
                        }}
                      >
                        View Tests
                      </Button>
                      <Button
                        type="default"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent Card's onClick from triggering
                          navigate(`/organizations/${organizationId}/projects/${project.id}/edit`);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}

            {!projects?.length && (
              <Col span={24}>
                <Card className="text-center py-12">
                  <Space direction="vertical" align="center">
                    <i className="las la-folder-open text-4xl text-gray-400" />
                    <Title level={4}>No Projects Yet</Title>
                    <Text type="secondary">
                      Create your first project or try a different search
                    </Text>
                    <Button
                      type="primary"
                      onClick={() => navigate(`/organizations/${organizationId}/projects/create`)}
                    >
                      Create Project
                    </Button>
                  </Space>
                </Card>
              </Col>
            )}
          </Row>
        </Space>
      </div>

    </PageLayout>
  )
}