import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { enhance } from '@zenstackhq/runtime'
import jwt from 'jsonwebtoken'
import { Database } from '../../database'
import { Cookies } from './cookies'

const getSession = async (options: { accessToken: string }) => {
  let user: { id: string; email: string; name?: string }

  try {
    const token = options.accessToken

    if (!token) {
      throw new Error()
    }

    const { userId } = jwt.verify(
      token,
      process.env.SERVER_AUTHENTICATION_SECRET,
    ) as {
      userId: string
    }

    user = await Database.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        globalRole: true,
      },
    })

    return { user }
  } catch (error) {
    return {}
  }
}

const getPrisma = (session: Awaited<ReturnType<typeof getSession>>) => {
  const databaseProtected = enhance(Database, { user: session.user })

  return {
    database: databaseProtected,
    databaseUnprotected: Database,
    prisma: databaseProtected,
    masterPrisma: Database,
  }
}

export const createTrpcContext = async (
  options: FetchCreateContextFnOptions,
) => {
  const accessToken = Cookies.get(options.req, 'IRIS_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const prisma = getPrisma(session)

  return {
    session,
    request: options.req,
    responseHeaders: options.resHeaders,
    ...prisma,
  }
}

export const createHttpContext = async (options: { request: Request }) => {
  const accessToken = Cookies.get(options.request, 'IRIS_ACCESS_TOKEN')

  const session = await getSession({ accessToken })

  const prisma = getPrisma(session)

  return {
    session,
    ...prisma,
  }
}
