import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { useDesignSystem } from '@/designSystem'
import { OrganizationRole, User } from '@prisma/client'
import { useState } from 'react'

type UserWithOrganizationRoles = User & {
  organizationRoles: OrganizationRole[]
}

type Props = { users: UserWithOrganizationRoles[] }

export const useUpdate = ({ users }: Props) => {
  const { checkOrganizationRole } = useUserContext()
  const { message } = useDesignSystem()

  const [isLoading, setLoading] = useState(false)

  const countOwners = users.filter(user =>
    user.organizationRoles.find(role => role.name === 'owner'),
  ).length

  const { mutateAsync: updateOrganizationRole } =
    Api.organizationRole.update.useMutation()

  const canUpdate = () => checkOrganizationRole('owner')

  const update = async (organizationRole: OrganizationRole, name: string) => {
    setLoading(true)

    let isSuccess = false

    if (canUpdate()) {
      try {
        const isDowngrade =
          organizationRole.name === 'owner' && name !== 'owner'

        if (isDowngrade && countOwners < 2) {
          throw new Error(`There must be at least 1 owner`)
        }

        await updateOrganizationRole({
          where: { id: organizationRole.id },
          data: { name },
        })

        isSuccess = true

        message.info(`Role has been updated`)
      } catch (error) {
        message.error(error.message)
      }
    }

    setLoading(false)

    return isSuccess
  }

  return {
    update,
    canUpdate,
    isLoadingUpdate: isLoading,
  }
}
