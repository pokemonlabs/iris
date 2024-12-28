import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'
import LandingButton from './LandingButton'

interface Props extends HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

export const LandingCTA: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto ">
        <div className="bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg flex flex-col items-center text-center">
          <h2 className="text-white text-4xl lg:text-5xl font-bold lg:tracking-tight">
            {title}
          </h2>
          <p className="text-slate-400 mt-4 text-lg md:text-xl">{subtitle}</p>
          <div className="flex mt-10">
            <LandingButton href={buttonLink ?? '/register'} size="lg">
              {buttonText}
            </LandingButton>
          </div>
        </div>
      </div>
    </section>
  )
}
