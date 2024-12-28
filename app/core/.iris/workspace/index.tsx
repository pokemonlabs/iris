import { ReactNode, useEffect, useState } from 'react'
import { useMessageReceived, useMessageSend } from './hooks'

type Props = {
  children: ReactNode
}

const useWorkspace = () => {
  const [isSetup, setSetup] = useState(false)

  const isActive = !import.meta.env.PROD

  useMessageSend(isActive)

  useMessageReceived(isActive)

  useEffect(() => {
    if (isActive && !isSetup) {
      const scriptToInject = document.createElement('script')

      scriptToInject.src = '/assets/michelangelo.js'

      document.body.appendChild(scriptToInject)

      setSetup(true)
    }
  }, [isActive])

  return {}
}

export const WorkspaceProvider: React.FC<Props> = ({ children }) => {
  useWorkspace()

  return <>{children}</>
}
