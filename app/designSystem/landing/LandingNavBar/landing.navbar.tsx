import { useDesignSystem } from '~/designSystem/provider'
import { LandingDesktopNavbar } from './landing.desktop.navbar'
import { LandingMobileNavbar } from './landing.mobile.navbar'

interface Props {
  navItems: {
    link: string
    title: string
    target?: '_blank'
  }[]
}

export const LandingNavBar: React.FC<Props> = ({ navItems }) => {
  const { isMobile } = useDesignSystem()

  return (
    <div className="max-w-7xl  pt-4 mx-auto inset-x-0 z-50 w-[95%] lg:w-full">
      <div className="hidden lg:block w-full">
        {!isMobile && <LandingDesktopNavbar navItems={navItems} />}
      </div>
      <div className="flex h-full w-full items-center">
        {isMobile && <LandingMobileNavbar navItems={navItems} />}
      </div>
    </div>
  )
}
