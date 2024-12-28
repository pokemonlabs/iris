import { useLocation, useNavigate, useParams } from '@remix-run/react';
import { Flex } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { useUserContext } from '~/core/context';
import { useOrganizationSubscription } from '~/plugins/organization/client/organization.context';
import { AccessBlockedOverlay } from '../AccessBlockedOverlay';
import { Leftbar } from './components/Leftbar';
import { Mobilebar } from './components/Mobilebar';
import { Topbar } from './components/Topbar';
import { NavigationItem } from './types';

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const params: Record<string, string> = useParams()
  const { organization } = useUserContext()
  const { hasActiveSubscription: currentHasActiveSubscription } = useOrganizationSubscription()
  const [hasActiveSubscription, setHasActiveSubscription] = useState(currentHasActiveSubscription)

  useEffect(() => {
    setHasActiveSubscription(currentHasActiveSubscription)
  }, [currentHasActiveSubscription, location.pathname])

  const goTo = (url: string) => {
    router(url)
  }

  const items: NavigationItem[] = [
    {
      id: 'welcome',
      key: '/home',
      label: 'Welcome',
      position: 'leftbar',
      onClick: () => goTo('/home'),
      requiresSubscription: false,
    },
    {
      id: 'org-home',
      key: '/organizations/:organizationId/home',
      label: 'Home',
      position: 'leftbar',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/home'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
      requiresSubscription: false,
    },
    {
      id: 'org-projects',
      key: '/organizations/:organizationId/projects',
      label: 'Projects',
      position: 'leftbar',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/projects'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
      requiresSubscription: false,
    },
    {
      id: 'org-pricing',
      key: '/organizations/:organizationId/pricing',
      label: 'Pricing',
      position: 'leftbar',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/pricing'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
      requiresSubscription: false,
    },
    {
      id: 'org-integrations',
      key: '/organizations/:organizationId/integrations',
      label: 'Integrations',
      position: 'leftbar',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/integrations'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
      requiresSubscription: false,
    },
    {
      id: 'org-agent',
      key: '/organizations/:organizationId/agent',
      label: 'Agent',
      position: 'leftbar',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/agent'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
      requiresSubscription: false,
    },
    {
      id: 'org-vnc',
      key: '/organizations/:organizationId/vnc',
      label: 'VNC',
      position: 'leftbar',
      isVisible: !!organization,
      onClick: () =>
        goTo(
          '/organizations/:organizationId/vnc'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
      requiresSubscription: false,
    },
  ]

  const itemsVisible = items
    .filter(item => item.isVisible !== false)
    .map(item => ({
      id: item.id,
      key: item.key,
      label: item.label,
      icon: item.icon,
      position: item.position,
      onClick: item.onClick,
      requiresSubscription: item.requiresSubscription,
    }))

  const itemsTopbar = itemsVisible.filter(item => item.position === 'topbar')
  const itemsLeftbar = itemsVisible.filter(item => item.position === 'leftbar')
  const itemsLeftbottom = itemsVisible.filter(
    item => item.position === 'leftbar-bottom',
  )
  const itemsMobile = itemsVisible

  let keySelected = pathname
  Object.entries(params).forEach(([key, value]) => {
    keySelected = keySelected.replace(`/${value}`, `/:${key}`)
  })

  // Check if current route requires subscription and user doesn't have one
  const currentRoute = items.find(item => item.key === keySelected)
  const shouldBlockAccess = currentRoute?.requiresSubscription && !hasActiveSubscription

  return (
    <>
      <Topbar
        keySelected={keySelected}
        items={itemsTopbar.map(item => ({
          ...item,
          id: `topbar-${item.id}`,
          className: 'topbar-item'
        }))}
      />
      <Mobilebar
        keySelected={keySelected}
        items={itemsMobile.map(item => ({
          ...item,
          id: `mobile-${item.id}`,
          className: 'mobile-item'
        }))}
      />
      <Flex
        flex={1}
        style={{ overflowY: 'hidden' }}
        className="navigation-container"
        id="main-navigation-container"
      >
        <Leftbar
          keySelected={keySelected}
          items={itemsLeftbar.map(item => ({
            ...item,
            id: `leftbar-${item.id}`,
            className: 'leftbar-item'
          }))}
          itemsBottom={itemsLeftbottom.map(item => ({
            ...item,
            id: `leftbar-bottom-${item.id}`,
            className: 'leftbar-bottom-item'
          }))}
        />
        <Flex
          flex={1}
          vertical
          style={{ overflowY: 'hidden', position: 'relative' }}
          className="content-container"
          id="main-content"
        >
          {children}
          {shouldBlockAccess && (
            <AccessBlockedOverlay
              message="An active subscription is required to access this feature."
              redirectPath={`/organizations/${organization?.id}/pricing`}
              buttonText="Go to Payments"
            />
          )}
        </Flex>
      </Flex>
    </>
  )
}