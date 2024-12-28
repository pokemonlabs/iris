import { Link, useLocation } from '@remix-run/react'
import { ReactNode } from 'react'
import { DesignSystemUtility } from '../../helpers/utility'

type Props = {
  href: string
  children: ReactNode
  active?: boolean
  className?: string
  target?: '_blank'
}

export function LandingNavBarItem({
  children,
  href,
  active,
  target,
  className,
}: Props) {
  const pathname = useLocation().pathname

  return (
    <Link
      to={href}
      className={DesignSystemUtility.buildClassNames(
        'text-lg flex items-center justify-center   leading-[110%] px-4 py-2 rounded-md hover:text-black dark:hover:text-white text-gray-500 dark:text-gray-400 ',
        (active || pathname?.includes(href)) && 'text-black dark:text-white',
        className,
      )}
      target={target}
    >
      {children}
    </Link>
  )
}
