import { Utility } from '@/core/helpers/utility'
import { MenuOutlined } from '@ant-design/icons'
import { useNavigate } from '@remix-run/react'
import { Avatar, Flex, Menu, Tag } from 'antd'
import { useUserContext } from '~/core/context'
import { useDesignSystem } from '~/designSystem/provider'
import { Theme } from '~/designSystem/theme/theme'
import { NavigationItem } from '../../types'

import { OrganizationClient } from '~/plugins/organization/client'

interface Props {
  keySelected?: string
  items: NavigationItem[]
}

export const Mobilebar: React.FC<Props> = ({ keySelected, items }) => {
  const router = useNavigate()

  const { user, checkRole } = useUserContext()
  const { isMobile } = useDesignSystem()

  if (!isMobile) {
    return <></>
  }

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="px-2"
        style={{
          position: 'relative',
          backgroundColor: Theme.components?.Layout?.headerBg,
          borderBottom: Theme.components?.Layout?.headerBorderBottom,
        }}
      >
        <Flex align="center">
          {user && (
            <Flex>
              <Avatar
                src={user.pictureUrl}
                alt={user.name}
                size="small"
                onClick={() => router('/profile')}
                style={{ cursor: 'pointer' }}
              >
                {Utility.stringToInitials(user.name)}
              </Avatar>
            </Flex>
          )}

          <OrganizationClient.Select />
        </Flex>

        <Flex align="center">
          {checkRole('ADMIN') && (
            <Tag color="red" bordered={false}>
              Admin
            </Tag>
          )}

          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[keySelected]}
            style={{ width: 46 }}
            overflowedIndicator={<MenuOutlined />}
          />
        </Flex>
      </Flex>
    </>
  )
}
