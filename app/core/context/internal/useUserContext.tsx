import { Api } from '@/core/trpc'
import { User } from '@prisma/client'
import { ReactNode, createContext, useContext } from 'react'

import { OrganizationClient } from '../../../plugins/organization/client'

/**
 * @provider useUserContext
 * @description A provider to get the relevant user context
 * @attribute {boolean} isLoggedIn - Wether the user is authenticated or not
 * @attribute {User} user - The user object. user.id to access the id for example
 * @attribute {(roleName: string) => boolean} checkOrganizationRole - Check if the logged user match the role name in the organization
 * @attribute {Organization} organization - The current organization of the user. You should use the organization id from the router params as much as possible but you can get the organization id from this object too.
 * @attribute {OrganizationRole[]} organizationRoles - The current organization roles (owner or member) of the user within the current organization
 * @attribute {Organizations} organizations - All the organizations of the user
 * @usage  add 'const { user, organization, organizations, organizationRoles, checkOrganizationRole } = useUserContext()' , then you can access the id, name, email like that 'const userId = user?.id'
 * @import import { useUserContext } from '@/core/context'
 */

type AuthenticationStatus = 'unauthenticated' | 'loading' | 'authenticated'

type UserContextType = {
  user: User
  checkRole: (roleName: string) => boolean
  refetch: () => void
  authenticationStatus: AuthenticationStatus
  isLoggedIn: boolean
  isLoading: boolean
} & OrganizationClient.Context

const UserContext = createContext<UserContextType>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: session,
    refetch,
    ...querySession
  } = Api.authentication.session.useQuery()

  const user = session?.user

  const organizationsData = OrganizationClient.useContext({ user })

  const checkRole = (roleName: string) => {
    return !!(user?.globalRole === roleName)
  }

  const isLoading = querySession.isLoading

  const isLoggedIn = !!session?.user

  let status: AuthenticationStatus = 'unauthenticated'

  if (isLoading) {
    status = 'loading'
  } else if (isLoggedIn) {
    status = 'authenticated'
  }

  return (
    <UserContext.Provider
      value={{
        user: session?.user,
        checkRole,
        refetch,
        authenticationStatus: status,
        isLoggedIn,
        isLoading,

        ...organizationsData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}
