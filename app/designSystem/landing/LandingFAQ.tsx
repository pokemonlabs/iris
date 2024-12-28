import { ArrowRightOutlined } from '@ant-design/icons'
import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  subtitle: string
  questionAnswers: { question: string; answer: string }[]
}

export const LandingFAQ: React.FC<Props> = ({
  title,
  subtitle,
  questionAnswers,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <h3 className="text-3xl lg:text-4xl font-bold lg:tracking-tight">
              {title}
            </h3>
            <p className="text-lg mt-4 text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
          <div className="w-full md:w-1/2 max-w-xl mx-auto">
            <div className="grid divide-y divide-neutral-200 dark:divide-slate-400">
              {questionAnswers.map((item, index) => (
                <div className="py-5" key={index}>
                  <details className="group">
                    <summary className="flex justify-between text-lg items-center font-medium cursor-pointer list-none">
                      <span>{item.question}</span>
                      <span className="transition group-open:rotate-180">
                        <ArrowRightOutlined />
                      </span>
                    </summary>
                    <p className="text-slate-600 dark:text-slate-400 mt-3 group-open:animate-fadeIn">
                      {item.answer}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
