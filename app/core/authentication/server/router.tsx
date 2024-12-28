import { User } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import Bcrypt from 'bcryptjs'
import Jwt from 'jsonwebtoken'
import { z } from 'zod'
import { Configuration } from '~/core/configuration'
import { Utility } from '~/core/helpers/utility'
import { EmailServer } from '../../../plugins/email/server'
import { Trpc } from '../../trpc/base'
import { COOKIE_MAX_AGE, Cookies } from './cookies'
import { AuthenticationService } from './service'

export const AuthenticationRouter = Trpc.createRouter({
  session: Trpc.procedure.query(async ({ ctx }) => {
    const user = await ctx.database.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
    })

    return { user }
  }),

  logout: Trpc.procedurePublic.mutation(async ({ ctx }) => {
    Cookies.delete(ctx.responseHeaders, 'IRIS_ACCESS_TOKEN')

    ctx.responseHeaders.set('Location', '/login')

    return {
      success: true,
      redirect: '/login',
    }
  }),

  login: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
          where: { email: input.email },
        })

        const isValid = await Bcrypt.compare(input.password, user.password)

        if (!isValid) {
          return {
            success: false,
            redirect: '/login?error=CredentialsSignin',
          }
        }

        const secret = Configuration.getAuthenticationSecret()

        const jwtToken = Jwt.sign({ userId: user.id }, secret, {
          expiresIn: COOKIE_MAX_AGE,
        })

        Cookies.set(ctx.responseHeaders, 'IRIS_ACCESS_TOKEN', jwtToken)

        return {
          success: true,
          redirect: '/home',
        }
      } catch (error) {
        console.log(error)
        return { success: false, redirect: '/login?error=default' }
      }
    }),

  register: Trpc.procedurePublic
    .input(
      z.object({
        email: z.string().email(),
        name: z.string(),
        pictureUrl: z.string().optional(),
        password: z.string(),
        globalRole: z
          .string()
          .refine(value => value !== 'ADMIN', {
            message: 'globalRole cannot be ADMIN',
          })
          .optional(),

        tokenInvitation: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password)

      const payload = checkTokenInvitation(input.tokenInvitation)

      const email = input.email.trim().toLowerCase()

      let user: User

      if (payload?.userId) {
        user = await ctx.databaseUnprotected.user.findUnique({
          where: { id: payload.userId, status: 'INVITED' },
        })

        if (!user) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User was not found',
          })
        }
      } else {
        const userExisting = await ctx.databaseUnprotected.user.findUnique({
          where: { email },
        })

        if (userExisting) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email is not available',
          })
        }
      }

      const passwordHashed = hashPassword(input.password)

      if (user) {
        user = await ctx.databaseUnprotected.user.update({
          where: { id: user.id },
          data: { ...input, password: passwordHashed, status: 'VERIFIED' },
        })
      } else {
        user = await ctx.databaseUnprotected.user.create({
          data: {
            email: input.email,
            name: input.name,
            pictureUrl: input.pictureUrl,
            password: passwordHashed,
          },
        })
      }

      await AuthenticationService.onRegistration(ctx, user.id)

      return { id: user.id }
    }),

  inviteToOrganization: Trpc.procedure
    .input(
      z.object({
        email: z.string().email(),
        organizationId: z.string(),
        roleName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { organizationId, roleName = 'member' } = input

      const email = input.email.trim().toLowerCase()

      const organization = await ctx.database.organization.findUniqueOrThrow({
        where: { id: organizationId },
      })

      let user = await ctx.database.user.findUnique({
        where: { email },
      })

      if (!user) {
        user = await ctx.databaseUnprotected.user.create({
          data: { email, status: 'INVITED' },
        })
      }

      const payload = { userId: user.id }

      const secret = Configuration.getAuthenticationSecret()

      const token = Jwt.sign(payload, secret)

      user = await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: { tokenInvitation: token },
      })

      let organizationRole = await ctx.database.organizationRole.findFirst({
        where: { organizationId: organization.id, userId: user.id },
      })

      if (organizationRole) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: `${email} is already in your organization`,
        })
      }

      organizationRole = await ctx.database.organizationRole.create({
        data: {
          organizationId: organization.id,
          userId: user.id,
          name: roleName,
        },
      })

      try {
        const url = Configuration.getBaseUrl()
        const email = user.email
        const token = user.tokenInvitation

        const urlInvitation = `${url}/register?tokenInvitation=${encodeURIComponent(
          token,
        )}&email=${encodeURIComponent(email)}`

        await EmailServer.service.send({
          templateKey: 'invitationToOrganization',
          email: email,
          name: email,
          subject: `Invitation to ${organization.name}`,
          variables: {
            url_invitation: urlInvitation,
            organization_name: organization.name,
          },
        })
      } catch (error) {
        console.error('Could not send invitation email to organization')
        console.error(error.message)
      }

      return { user, organizationRole }
    }),

  sendResetPasswordEmail: Trpc.procedurePublic
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const email = input.email.trim().toLowerCase()

      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { email },
      })

      const payload = { userId: user.id }

      const secret = Configuration.getAuthenticationSecret()

      const TIME_24_HOURS = 60 * 60 * 24

      const token = Jwt.sign(payload, secret, { expiresIn: TIME_24_HOURS })

      const url = Configuration.getBaseUrl()

      const urlResetPassword = `${url}/reset-password/${token}`

      try {
        await EmailServer.service.send({
          templateKey: 'resetPassword',
          email: user.email,
          name: user.name ?? user.email,
          subject: `Reset your password`,
          variables: {
            url_password_reset: urlResetPassword,
          },
        })

        return { success: true }
      } catch (error) {
        console.error(error.message)

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not send the email',
        })
      }
    }),

  resetPassword: Trpc.procedurePublic
    .input(z.object({ token: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      checkPassword(input.password)

      const secret = Configuration.getAuthenticationSecret()

      let decoded: { userId: string }

      try {
        decoded = Jwt.verify(input.token, secret) as { userId: string }
      } catch (error) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Token is invalid',
        })
      }

      const user = await ctx.databaseUnprotected.user.findUniqueOrThrow({
        where: { id: decoded.userId },
      })

      const passwordHashed = hashPassword(input.password)

      await ctx.databaseUnprotected.user.update({
        where: { id: user.id },
        data: {
          password: passwordHashed,
        },
      })

      return { success: true }
    }),
})

const checkPassword = (password: string) => {
  const isValid = password?.length >= 6

  if (isValid) {
    return
  }

  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Password must have at least 6 characters.',
  })
}

const checkTokenInvitation = (token?: string) => {
  if (Utility.isNull(token)) {
    return
  }

  const secret = Configuration.getAuthenticationSecret()

  let decoded: { userId: string }

  try {
    decoded = Jwt.verify(token, secret) as { userId: string }
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token is invalid',
    })
  }

  return decoded
}

const hashPassword = (password: string) => {
  const saltRounds = 10
  const salt = Bcrypt.genSaltSync(saltRounds)
  const passwordHashed = Bcrypt.hashSync(password, salt)

  return passwordHashed
}
