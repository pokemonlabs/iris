import { ArrowDownOutlined } from '@ant-design/icons'
import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'
import RightArrow from './images/rightArrow.svg'

type PainPointType = {
  emoji: string
  title: string
}

interface Props extends HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  painPoints: PainPointType[]
}

export const LandingPainPoints: React.FC<Props> = ({
  title,
  subtitle,
  painPoints,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          {title}
        </h2>
        <h3 className="text-2xl mt-4 text-slate-600 dark:text-slate-400 mb-12">
          {subtitle}
        </h3>

        <div className="md:flex justify-center items-center md:space-x-8">
          {painPoints?.map((painPoint, idx) => (
            <>
              <div key={idx}>
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-4">{painPoint.emoji}</span>
                  <span className="font-semibold text-lg text-gray-900 dark:text-slate-200">
                    {painPoint.title}
                  </span>
                </div>
              </div>
              {idx < painPoints.length - 1 && (
                <center>
                  <img
                    src={RightArrow}
                    width="50"
                    alt="arrow"
                    className="dark:invert rotate-90 md:rotate-0 mt-5 mb-5 md:mt-0 md:mb-0"
                  />
                </center>
              )}
            </>
          ))}
        </div>
        <div className="text-center pt-20">
          <div className="flex flex-col items-center">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              <ArrowDownOutlined /> there is an easier way
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
