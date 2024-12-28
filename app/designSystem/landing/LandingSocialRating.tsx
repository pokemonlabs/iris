import clsx from 'clsx'
import { LandingAvatar } from './LandingAvatar'
import { LandingRating } from './LandingRating'

export const LandingSocialRating = ({
  children,
  numberOfUsers = 100,
  suffixText = 'happy users',
}: {
  children?: React.ReactNode
  numberOfUsers: number
  suffixText?: string
}) => {
  const numberText =
    numberOfUsers > 1000
      ? `${(numberOfUsers / 1000).toFixed(0)}k`
      : `${numberOfUsers}`

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]
  return (
    <div className="group flex flex-wrap gap-2">
      <div className="flex gap-1">
        {avatarItems.map((avatarItem, index) => (
          <LandingAvatar
            key={index}
            src={avatarItem.src}
            className={clsx(
              'relative',
              index === 1 || index === 2 ? `-ml-4` : '',
              index === 3 ? `-ml-5` : '',
              index > 3 ? `-ml-6` : '',
            )}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center gap-1">
        <LandingRating />

        {!children ? (
          <p className="text-xs max-w-sm text-slate-600 dark:text-slate-400 ">
            {numberText}+ {suffixText}
          </p>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
