import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useEffect } from 'react'

const restoreUrl = (route: string, params: Record<string, string>) => {
  let routeRestored = route

  Object.entries(params).forEach(
    ([key, value]) => (routeRestored = routeRestored.replace(value, `:${key}`)),
  )

  return routeRestored
}

/**
 * Emit request when the path changed
 */
export const useMessageSend = (isActive = false) => {
  const pathname = useLocation().pathname
  const params = useParams()

  useEffect(() => {
    if (!isActive) {
      return
    }

    window.parent.postMessage({ type: 'ready' }, '*')
  }, [isActive])

  useEffect(() => {
    if (!isActive) {
      return
    }

    const url = `${window.location.origin}${pathname}`

    const pathPure = restoreUrl(pathname, params)

    window.parent.postMessage({ type: 'navigation', url, pathPure }, '*')
  }, [isActive, pathname, params])
}

/**
 * Change the path on request
 */
export const useMessageReceived = (isActive = false) => {
  const router = useNavigate()

  const handleMessage = event => {
    const canContinue = event?.data?.type === 'navigation'

    if (canContinue) {
      const path = event.data.path?.trim()

      if (path && path !== '') {
        router(path)
      }
    }
  }

  useEffect(() => {
    if (!isActive) {
      return
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [isActive])
}
