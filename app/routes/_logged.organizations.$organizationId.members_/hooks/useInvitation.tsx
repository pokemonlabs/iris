import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { Organization } from '@prisma/client'
import { useState } from 'react'
import { useDesignSystem } from '~/designSystem'

type Props = {
  email: string
  organization: Organization
}

export const useInvitation = ({ organization, email }: Props) => {
  const { message } = useDesignSystem()

  const [isLoading, setLoading] = useState(false)

  const emailEnsured = email?.trim()?.toLowerCase()

  const { refetch: fetchOrganizationRole } =
    Api.organizationRole.findFirst.useQuery(
      {
        where: {
          organizationId: organization.id,
          user: {
            email: emailEnsured,
          },
        },
      },
      { enabled: false },
    )

  const { mutateAsync: inviteToOrganization } =
    Api.authentication.inviteToOrganization.useMutation()

  const invite = async () => {
    setLoading(true)

    let isSuccess = false

    if (Utility.isDefined(email)) {
      try {
        const organizationRole = await fetchOrganizationRole().then(
          response => response.data,
        )

        if (!organizationRole) {
          await inviteToOrganization({
            organizationId: organization.id,
            email: emailEnsured,
          })

          message.info(`${emailEnsured} has been added`)
        }

        isSuccess = true
      } catch (error) {
        message.error(error.message)
      }
    }

    setLoading(false)

    return isSuccess
  }

  return {
    invite,
    isLoadingInvitation: isLoading,
  }
}
