import { ConfigProvider, message } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MessageInstance } from 'antd/es/message/interface'
import { ErrorBoundary, MrbHtml } from './core'
import { Theme } from './theme/theme'

export type DesignSystemContext = {
  isMobile: boolean
  message: MessageInstance
}

const DesignSystemContext = createContext<DesignSystemContext>({
  isMobile: false,
  message: null,
})

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

const ProviderGeneral = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [isMobile, setMobile] = useState(false)

  const isWindow = typeof window !== 'undefined'

  const theme = Theme as any

  useEffect(() => {
    if (!isWindow) {
      return
    }

    setMobile(window.innerWidth < 992)

    const handleResize = () => {
      setMobile(window.innerWidth < 992)
    }

    window.addEventListener('resize', handleResize)

    setLoading(false)

    return () => {
      if (!isWindow) {
        return
      }

      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (!isWindow) {
      return
    }

    const setVhVariable = () => {
      document.documentElement.style.setProperty(
        '--100vh',
        `${window.innerHeight}px`,
      )
    }

    setVhVariable()

    window.addEventListener('resize', setVhVariable)

    return () => window.removeEventListener('resize', setVhVariable)
  }, [])

  if (isLoading) {
    return <></>
  }

  return (
    <ConfigProvider theme={theme}>
      <DesignSystemContext.Provider value={{ isMobile, message }}>
        {children}
      </DesignSystemContext.Provider>
    </ConfigProvider>
  )
}

type Props = {
  children: ReactNode
}

export const DesignSystemProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ProviderGeneral>
        <MrbHtml>{children}</MrbHtml>
      </ProviderGeneral>
    </ErrorBoundary>
  )
}
