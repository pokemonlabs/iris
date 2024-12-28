import { useUserContext } from '@/core/context'
import { MrbSplashScreen } from '@/designSystem'
import { Outlet } from '@remix-run/react'
import { useEffect } from 'react'

export default function OrganizationsLayout() {
  const { isLoadingOrganization, organization } = useUserContext()

  useEffect(() => {
    if (!isLoadingOrganization && !organization) {
      window.location.replace('/')
    }
  }, [isLoadingOrganization, organization])

  if (isLoadingOrganization) {
    return <MrbSplashScreen />
  }

  if (organization) {
    return <Outlet />
  }
}
