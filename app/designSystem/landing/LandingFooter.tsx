import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'
import { LinkedinFilled, TwitterCircleFilled } from '@ant-design/icons'
import { Link } from '@remix-run/react'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {}

export const LandingFooter: React.FC<Props> = ({ ...props }) => {
  const socials = [
    {
      name: 'X',
      icon: <TwitterCircleFilled />,
      link: 'https://twitter.com/',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinFilled />,
      link: 'https://linkedin.com/',
    },
  ]
  return (
    <div className="relative mt-16" {...props}>
      <div className="border-t border-neutral-100  dark:border-neutral-800 px-8 pt-20 pb-32 relative bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto  flex sm:flex-row flex-col justify-between items-start ">
          <div>
            <div className="mr-4  md:flex mb-4">
              <Logo height={50} isLabel />
            </div>
            <div>Copyright &copy; 2024</div>
            <div className="mt-2">All rights reserved</div>
          </div>
          <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {socials.map(link => (
                <Link
                  key={link.name}
                  className="transition-colors  text-xs sm:text-sm"
                  to={link.link}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
