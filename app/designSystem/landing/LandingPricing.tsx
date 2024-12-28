import { CheckCircleFilled } from '@ant-design/icons'
import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'
import LandingButton from './LandingButton'

type Package = {
  title: string
  description: string
  monthly: number
  features: string[]
  className?: string
  type?: string
  highlight?: boolean
}

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle: string
  packages: Package[]
}

export const LandingPricing: React.FC<Props> = ({
  title,
  subtitle,
  packages,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto relative group overflow-hidden text-center">
        <div className="mt-16 md:mt-0">
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
            {title}
          </h2>
          <p className="text-lg mt-4 text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mx-auto max-w-screen-lg mt-12">
          {packages.map((item, idx) => (
            <PricingCard key={idx + 'pricingcard'} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

const PricingCard = (props: Package) => {
  const { title, description, monthly, features, className, type, highlight } =
    props
  return (
    <div>
      <div
        className={`flex flex-col w-full order-first lg:order-none border py-5 px-6 relative rounded-lg ${
          highlight ? 'border-orange-500 ' : 'border-slate-400 '
        }`}
      >
        <div className="text-center">
          {highlight && (
            <span className="inline-flex absolute px-3 py-1 text-xs -top-3 left-1/2 -translate-x-1/2 font-medium rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white ">
              Popular
            </span>
          )}

          <h4 className="text-lg font-medium text-slate-600 dark:text-slate-400">
            {title}
          </h4>
          <p className="mt-3 text-4xl font-bold text-black dark:text-white md:text-4xl">
            <span className="text-sm font-normal">$</span>
            {monthly}
            <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
              /month
            </span>
          </p>
        </div>
        <ul className="grid mt-8 text-left gap-y-4">
          {features.map((item, idx) => (
            <li
              key={idx + 'pricingfeature'}
              className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
            >
              <CheckCircleFilled className="w-6 h-6" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex mt-8">
          <LandingButton
            href={'/register'}
            block
            type={highlight ? 'primary' : 'outline'}
          >
            {'Get Started'}
          </LandingButton>
        </div>
      </div>
    </div>
  )
}
