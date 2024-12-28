import { HTMLAttributes, ReactNode } from 'react'
import { DesignSystemUtility } from '../helpers/utility'
import LandingButton from './LandingButton'

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle: string
  buttonText: string
  pictureUrl?: string
  socialProof?: ReactNode
}

export const LandingHero: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  pictureUrl,
  socialProof = '',
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('', className)}
      {...props}
    >
      <div className="py-8 lg:py-44 px-5  max-w-7xl mx-auto  grid lg:grid-cols-2 place-items-center relative">
        <div className="relative z-10 p-4 md:p-0">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold lg:tracking-tight xl:tracking-tighter">
            {title}
          </h1>
          <p className="text-lg mt-4 text-slate-600 dark:text-slate-400 max-w-xl">
            {subtitle}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <LandingButton
              href={'/login'}
              className="flex gap-1 items-center justify-center "
              rel="noopener"
              size="lg"
            >
              {buttonText}
            </LandingButton>
          </div>
          {socialProof && <div className="mt-6">{socialProof}</div>}
        </div>

        <div className="lg:absolute right-0 top-0 w-4/5 lg:w-1/2 h-full">
          <img
            src={pictureUrl}
            className="mask-stripes object-cover w-full h-full"
            alt="Landing cover"
          />
        </div>
      </div>
    </section>
  )
}
