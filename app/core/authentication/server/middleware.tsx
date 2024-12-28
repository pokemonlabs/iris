import { createHttpContext } from './context'

export const getHttpContext = async (options: { request: Request }) => {
  const context = await createHttpContext(options)

  if (!context?.session?.user?.id) {
    throw new Response('Unauthorized', { status: 401 })
  }

  return context
}

export const getHttpContextPublic = async (options: { request: Request }) => {
  const context = await createHttpContext(options)

  return context
}
