import clsx from 'clsx'
import { ImgHTMLAttributes } from 'react'

interface LandingAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'small' | 'medium' | 'large'
}

/**
 * Shows an avatar image.
 */
export const LandingAvatar = ({
  className,
  src,
  width = 128,
  height = 128,
  size = 'medium',
  ...remainingProps
}: LandingAvatarProps) => {
  return (
    <img
      src={src}
      width={width}
      height={height}
      className={clsx(
        'rounded-full border-2 border-solid border-primary-100',
        size === 'small' ? 'w-6 h-6' : '',
        size === 'medium' ? 'h-9 w-9' : '',
        size === 'large' ? 'h-16 w-16' : '',
        className,
      )}
      {...remainingProps}
      alt="Landing avatar"
    />
  )
}
