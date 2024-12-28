import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
}

export const LandingSocialProof: React.FC<Props> = () => {
  const socialProofImages = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center  text-slate-600 dark:text-slate-400">
          Featured on
        </h2>
        <div className="flex gap-8 md:gap-20 items-center justify-center mt-8 flex-wrap">
          {socialProofImages.map((socialProofImage, idx) => (
            <img
              className="h-6 md:h-10"
              key={`logo-${idx}`}
              src={socialProofImage.url}
              alt="landing social logo"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
