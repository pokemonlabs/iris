import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Form,
  Input,
  MenuProps,
  Popconfirm,
  Row,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout, useDesignSystem } from '@/designSystem'
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditFilled,
  HourglassOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { OrganizationRole, User } from '@prisma/client'
import { useState } from 'react'
import { useDelete } from './hooks/useDelete'
import { useInvitation } from './hooks/useInvitation'
import { useUpdate } from './hooks/useUpdate'

type UserWithOrganizationRoles = User & {
  organizationRoles: OrganizationRole[]
}

export default function OrganizationTeamPage() {
  const { organization } = useUserContext()
  const { message } = useDesignSystem()

  const [form] = Form.useForm()

  const [email, setEmail] = useState<string>('')

  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = Api.user.findMany.useQuery(
    {
      where: {
        organizationRoles: { some: { organizationId: organization.id } },
      },
      include: {
        organizationRoles: { where: { organizationId: organization.id } },
      },
      orderBy: { createdAt: 'desc' },
    },
    { initialData: [] },
  )

  const { invite, isLoadingInvitation } = useInvitation({ organization, email })

  const { update, canUpdate, isLoadingUpdate } = useUpdate({ users })

  const { deleteUser, canDeleteUser, isLoadingDelete } = useDelete({ users })

  const handleInvite = async () => {
    const isSuccess = await invite()

    if (isSuccess) {
      setEmail('')
      form.setFieldsValue({ email: '' })
      refetchUsers()
    }
  }

  const handleUpdate = async (
    organizationRole: OrganizationRole,
    name: string,
  ) => {
    const isSuccess = await update(organizationRole, name)

    if (isSuccess) {
      refetchUsers()
    }
  }

  const handleDeleteUser = async (user: UserWithOrganizationRoles) => {
    const isSuccess = await deleteUser(user)

    if (isSuccess) {
      refetchUsers()
    }
  }

  const dataSource = users
    .map(item => ({ ...item, key: item.id }))
    .filter(item => {
      const search = email.trim().toLowerCase()
      const userEmail = item.email.trim().toLowerCase()
      const userName = item.name?.trim().toLowerCase() ?? ''

      return userEmail.includes(search) || userName.includes(search)
    })

  const columns: TableProps['columns'] = [
    {
      title: `${dataSource.length} Members`,
      key: 'id',
      render: (user: UserWithOrganizationRoles) => (
        <Flex gap={8} align="center">
          <Avatar src={user.pictureUrl}>
            {Utility.stringToInitials(user.name ?? user.email)}
          </Avatar>

          <Flex vertical style={{ overflow: 'hidden' }}>
            <Typography.Text ellipsis>{user.name}</Typography.Text>
            <Typography.Text ellipsis type="secondary">
              {user.email}
            </Typography.Text>
          </Flex>
        </Flex>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (user: UserWithOrganizationRoles) => (
        <Row gutter={[16, 16]}>
          {user.organizationRoles.map(role => {
            const isInvited = user.status === 'INVITED'

            const isUserOwner = role.name === 'owner'

            const itemsDropdown: MenuProps['items'] = [
              {
                key: 'owner',
                label: (
                  <Flex gap={8}>Owner {isUserOwner && <CheckOutlined />}</Flex>
                ),
                onClick: () => handleUpdate(role, 'owner'),
              },
              {
                key: 'member',
                label: (
                  <Flex gap={8}>
                    Member {!isUserOwner && <CheckOutlined />}
                  </Flex>
                ),
                onClick: () => handleUpdate(role, 'member'),
              },
            ]

            return (
              <Tag
                key={role.id}
                style={{ textTransform: 'capitalize' }}
                bordered={false}
                color={isInvited ? 'warning' : undefined}
              >
                <Flex gap={10} align="center">
                  {isInvited && <HourglassOutlined />}

                  {role.name}

                  {canUpdate() && (
                    <Dropdown
                      trigger={['click']}
                      placement="topRight"
                      menu={{
                        items: itemsDropdown,
                        selectable: false,
                      }}
                    >
                      <Button
                        loading={isLoadingUpdate}
                        size="small"
                        type="text"
                        style={{ color: 'inherit' }}
                      >
                        <EditFilled />
                      </Button>
                    </Dropdown>
                  )}
                </Flex>
              </Tag>
            )
          })}
        </Row>
      ),
    },
    {
      title: '',
      key: 'invite',
      width: '50px',
      render: (user: UserWithOrganizationRoles) => {
        return (
          <Flex gap={8} justify="end">
            {user.status === 'INVITED' && (
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${
                      window.location.origin
                    }/register?tokenInvitation=${encodeURIComponent(
                      user.tokenInvitation,
                    )}&email=${encodeURIComponent(user.email)}`,
                  )
                  message.info('Invitation URL copied')
                }}
              />
            )}
          </Flex>
        )
      },
    },
    {
      title: '',
      key: 'delete',
      width: '50px',
      render: (user: UserWithOrganizationRoles) => {
        return (
          <Flex gap={8} justify="end">
            {canDeleteUser(user) && (
              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => handleDeleteUser(user)}
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
            )}
          </Flex>
        )
      },
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
        <Typography.Title level={1}>Members</Typography.Title>

        <Form
          form={form}
          onFinish={handleInvite}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item name="email">
            <Input
              placeholder="User email"
              style={{ width: 300 }}
              type="email"
              disabled={isLoadingInvitation}
              onChange={event => setEmail(event.target.value)}
              suffix={
                <Tooltip title="Invite">
                  <Button
                    type="text"
                    htmlType="submit"
                    loading={isLoadingInvitation}
                    icon={<UserAddOutlined />}
                  ></Button>
                </Tooltip>
              }
            />
          </Form.Item>
        </Form>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoadingUsers}
          style={{ width: '100%' }}
        />
      </Flex>
    </PageLayout>
  )
}
