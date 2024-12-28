import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'

type FeatureType = {
  heading: string
  description: string | any
  icon: any
}

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle: string
  features: FeatureType[]
}

export const LandingFeatures: React.FC<Props> = ({
  title,
  subtitle,
  features,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          {title}
        </h2>
        <p className="text-lg mt-4 text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 mt-16 gap-16">
          {features.map((item, idx) => (
            <div key={idx + 'feature'} className="flex  gap-4 items-start">
              <div className=" bg-black dark:bg-slate-800 rounded-full flex justify-center items-center w-8 h-8 text-white text-lg">
                {item.icon}
              </div>
              <div className="flex-1 ">
                <h3 className="font-semibold text-lg">{item.heading}</h3>{' '}
                <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
