import { HTMLAttributes } from 'react'
import { DesignSystemUtility } from '../helpers/utility'

type Testimonial = {
  name: string
  content: string
  designation?: string
  avatar?: string
}

interface Props extends HTMLAttributes<HTMLElement> {
  anchorId?: string
  title: string
  subtitle: string
  testimonials: Testimonial[]
}

export const LandingTestimonials: React.FC<Props> = ({
  title,
  subtitle,
  testimonials,
  className,
  ...props
}) => {
  return (
    <section
      className={DesignSystemUtility.buildClassNames('py-16 px-5', className)}
      {...props}
    >
      <div className="max-w-5xl mx-auto px-4 py-16 relative group overflow-hidden">
        <div className="mt-16 md:mt-0 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
            {title}
          </h2>
          <p className="text-lg mt-4 text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
          {testimonials.map((testimonial: Testimonial, idx: number) => (
            <TestimonialCard key={`testimonial-${idx}`} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({
  name,
  content,
  designation,
  avatar,
}: Testimonial) => {
  return (
    <div className="mb-8 sm:break-inside-avoid">
      <blockquote className="rounded-lg bg-gray-50 dark:bg-slate-800 p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={avatar}
            className="size-14 rounded-full object-cover"
          />

          <div>
            <p className="mt-0.5 text-lg font-medium text-gray-900 dark:text-slate-300">
              {name}
            </p>
            <p className="flex gap-0.5 text-gray-800 dark:text-slate-400">
              {designation}
            </p>
          </div>
        </div>

        <p className="mt-4 text-gray-700 dark:text-slate-400">{content}</p>
      </blockquote>
    </div>
  )
}
