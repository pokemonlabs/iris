import React, { CSSProperties, ImgHTMLAttributes, useState } from 'react'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  srcOnError?: string
  isPretty?: boolean
  isHiddenOnError?: boolean
  styleImg?: CSSProperties
  styleWrapper?: CSSProperties
  width?: string
  height?: string
}

export const ImageSafe: React.FC<Props> = ({
  srcOnError,
  style = {},
  isPretty = false,
  isHiddenOnError = false,
  styleImg = {},
  styleWrapper = {},
  width = '200px',
  height = width,
  ...props
}) => {
  const [isHidden, setHidden] = useState(false)
  const [isLoaded, setLoaded] = useState(false)

  const isBackgroundGradient = isHidden && !srcOnError && !isHiddenOnError

  const styleImgPretty: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    opacity: isBackgroundGradient ? 0 : 1,
  }

  const styleWrapperPretty: CSSProperties = {
    width: '100%',
    height: '100%',
    maxWidth: width,
    minWidth: width,
    maxHeight: height,
    minHeight: height,
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.088)',
    transition: 'opacity 0.3s ease',
    aspectRatio: '1',
    overflow: 'hidden',
    background: isBackgroundGradient
      ? 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
      : undefined,
  }

  const onLoad = () => setLoaded(true)

  const srcEnsured = props.src ?? srcOnError

  const onError = srcOnError
    ? event => {
        const target = event.target as HTMLImageElement
        target.onerror = null
        target.src = srcOnError
      }
    : () => setHidden(true)

  if (!srcOnError && isHiddenOnError && isHidden) {
    return <></>
  }

  if (isPretty) {
    return (
      <div
        style={{
          opacity: isLoaded || isBackgroundGradient ? 1 : 0,
          ...styleWrapperPretty,
          ...style,
          ...styleWrapper,
        }}
      >
        <img
          {...props}
          src={srcEnsured}
          alt={props.alt}
          style={{ ...styleImgPretty, ...styleImg }}
          onLoad={onLoad}
          onError={onError}
        />
      </div>
    )
  }

  return (
    <img
      {...props}
      src={srcEnsured}
      alt={props.alt}
      style={{ ...style, ...styleImg }}
      onError={onError}
    />
  )
}
