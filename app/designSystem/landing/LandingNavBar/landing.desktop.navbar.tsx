import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'

import { useUserContext } from '@/core/context'
import { ArrowRightOutlined } from '@ant-design/icons'
import LandingButton from '../LandingButton'
import { LandingNavBarItem } from './landing.navbar.items'

type Props = {
  navItems: {
    link: string
    title: string
    target?: '_blank'
  }[]
}

export const LandingDesktopNavbar = ({ navItems }: Props) => {
  const { isLoggedIn } = useUserContext()

  return (
    <div className="w-full flex relative justify-between px-4 py-2 rounded-full bg-transparent transition duration-200">
      <div className="flex flex-row gap-2 items-center">
        <Logo isLabel height={40} />
        <div className="flex items-center gap-1.5 pl-8">
          {navItems.map(item => (
            <LandingNavBarItem
              href={item.link}
              key={item.title}
              target={item.target}
            >
              {item.title}
            </LandingNavBarItem>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        {isLoggedIn && (
          <LandingButton size="sm" href="/home">
            Dashboard <ArrowRightOutlined />
          </LandingButton>
        )}
        {!isLoggedIn && (
          <LandingButton size="sm" href="/login">
            Get Started
          </LandingButton>
        )}
      </div>
    </div>
  )
}
