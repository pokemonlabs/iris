import { theme } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { MrbSplashScreen } from '../splashScreen'

const { useToken } = theme
interface Props {
  children: ReactNode
}

export const MrbHtml: React.FC<Props> = ({ children }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true)

  const { token } = useToken()

  useEffect(() => {
    if (isLoading) {
      setLoading(false)
      return
    }

    // Apply styles to the html element
    document.documentElement.style.backgroundColor = token.colorBgBase
    document.documentElement.style.color = token.colorTextBase

    // Optional: Clean up the styles when the component unmounts
    return () => {
      document.documentElement.style.backgroundColor = ''
      document.documentElement.style.color = ''
    }
  }, [isLoading])

  return <>{isLoading ? <MrbSplashScreen /> : children}</>
}
