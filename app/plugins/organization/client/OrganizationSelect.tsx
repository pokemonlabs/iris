import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import {
  CheckOutlined,
  DownOutlined,
  PlusOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Organization } from '@prisma/client'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  MenuProps,
  message,
  Typography,
} from 'antd'
import { Api } from '~/core/trpc'

const OrganizationItem = ({
  organization,
  isSelected = false,
}: {
  organization: Organization
  isSelected?: boolean
}) => {
  const initial = Utility.stringToInitials(organization.name)[0]

  return (
    <Flex
      align="center"
      gap={8}
      style={{
        width: '100%',
        maxWidth: '243px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <Avatar shape="square" size={20} src={organization.pictureUrl}>
        {initial}
      </Avatar>

      <Flex flex={1} style={{ overflow: 'hidden' }}>
        <Typography.Text ellipsis={true}>{organization.name}</Typography.Text>
      </Flex>

      {isSelected && (
        <Typography.Text type="secondary">
          <CheckOutlined />
        </Typography.Text>
      )}
    </Flex>
  )
}

export const OrganizationSelect: React.FC = () => {
  const router = useNavigate()
  const params = useParams()
  const pathname = useLocation()?.pathname

  const {
    user,
    organization: organizationSelected,
    organizations,
    refetchOrganizations,
    checkOrganizationRole,
  } = useUserContext()

  const {
    mutateAsync: createOrganization,
    isLoading: isLoadingCreateOrganization,
  } = Api.organization.create.useMutation()

  const handleClickCreate = async () => {
    try {
      const organization = await createOrganization({
        data: {
          name: 'My Team',
          roles: { create: { userId: user.id, name: 'owner' } },
        },
      })

      refetchOrganizations()

      router(`/organizations/${organization.id}/settings`)
    } catch (error) {
      message.error(error.message)
    }
  }

  const items: MenuProps['items'] = [
    ...organizations.map(organization => ({
      key: organization.id,
      label: (
        <OrganizationItem
          organization={organization}
          isSelected={organization.id === organizationSelected?.id}
        />
      ),
      onClick: () => {
        const keys = Object.keys(params)
        const canReplace = keys.length === 1 && keys[0] === 'organizationId'

        if (canReplace) {
          const path = pathname.replace(
            params.organizationId as string,
            organization.id,
          )
          router(path)
        } else {
          router(`/organizations/${organization.id}/members`)
        }
      },
    })),
    {
      key: 'create',
      disabled: true,
      label: (
        <Flex gap={4} justify="center" align="center" className="w-full">
          <Button
            type="text"
            size="small"
            block
            onClick={handleClickCreate}
            loading={isLoadingCreateOrganization}
          >
            <PlusOutlined />
            Create
          </Button>
        </Flex>
      ),
    },
  ]

  if (organizationSelected) {
    items.unshift({
      key: 'settings',
      disabled: true,
      label: (
        <Flex gap={4} className="pb-4 w-full" style={{ cursor: 'default' }}>
          {checkOrganizationRole('owner') && (
            <Button
              size="small"
              type="text"
              icon={<SettingOutlined />}
              block
              onClick={() =>
                router(`/organizations/${organizationSelected.id}/settings`)
              }
            >
              Settings
            </Button>
          )}

          <Button
            size="small"
            type="text"
            icon={<UserAddOutlined />}
            block
            onClick={() =>
              router(`/organizations/${organizationSelected.id}/members`)
            }
          >
            Invite
          </Button>
        </Flex>
      ),
    })
  }

  return (
    <Dropdown
      menu={{
        items,
        className: 'organization-select__menu',
        style: { width: '275px' },
        selectable: false,
      }}
      trigger={['click']}
    >
      <Button type="text" block size="small">
        <Flex style={{ width: '100%', overflow: 'hidden' }} justify="start">
          {organizationSelected && (
            <OrganizationItem organization={organizationSelected} />
          )}

          {!organizationSelected && <>Organizations</>}
        </Flex>

        <Typography.Text type="secondary">
          <DownOutlined />
        </Typography.Text>
      </Button>
    </Dropdown>
  )
}
