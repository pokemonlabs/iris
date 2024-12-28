import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { OrganizationRole, User } from '@prisma/client'
import { useState } from 'react'
import { useDesignSystem } from '~/designSystem'

type UserWithOrganizationRoles = User & {
  organizationRoles: OrganizationRole[]
}

type Props = { users: UserWithOrganizationRoles[] }

export const useDelete = ({ users }: Props) => {
  const { message } = useDesignSystem()

  const { user: userLogged, checkOrganizationRole } = useUserContext()

  const [isLoading, setLoading] = useState(false)

  const countOwners = users.filter(user =>
    user.organizationRoles.find(role => role.name === 'owner'),
  ).length

  const { mutateAsync: deleteOrganizationRole } =
    Api.organizationRole.deleteMany.useMutation()

  const canDeleteUser = (user: UserWithOrganizationRoles) => {
    const isOwner = user.organizationRoles.find(
      organizationRole => organizationRole.name === 'owner',
    )

    const isSelf = userLogged.id === user.id

    if (isSelf) {
      return !isOwner || countOwners > 1
    } else {
      return checkOrganizationRole('owner')
    }
  }

  const deleteUser = async (user: UserWithOrganizationRoles) => {
    setLoading(true)

    let isSuccess = false

    if (canDeleteUser(user)) {
      try {
        await deleteOrganizationRole({
          where: {
            userId: user.id,
          },
        })

        isSuccess = true

        if (user.id === userLogged.id) {
          window.location.replace('/')
        } else {
          message.info(`${user.email} has been removed`)
        }
      } catch (error) {
        message.error(error.message)
      }
    }

    setLoading(false)

    return isSuccess
  }

  return {
    deleteUser,
    isLoadingDelete: isLoading,
    canDeleteUser,
  }
}
