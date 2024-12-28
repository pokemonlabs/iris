import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'

type StepType = {
  heading: string
  description: string | any
}

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle?: string
  steps: StepType[]
}

export const LandingHowItWorks: React.FC<Props> = ({
  title,
  subtitle = '',
  steps,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          {title}
        </h2>
        <div className="max-w-xl space-y-8 mt-12 mx-auto">
          {steps.map((item, idx) => (
            <div key={idx} className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center text-2xl font-bold ">
                {idx + 1}
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-semibold text-lg ">{item.heading}</h3>
                <p className="dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
