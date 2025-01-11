import { PwaSubscription } from '@prisma/client'
import { z } from 'zod'
import { Trpc } from '~/core/trpc/base'
import { PwaService } from './pwa.service'

const trpcRouter = Trpc.createRouter({
    onSubscribe: Trpc.procedure
        .input(
            z.object({
                subscription: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = ctx.session.user

            const subscription = JSON.parse(input.subscription) as PushSubscription

            const pwaSubscriptions = await ctx.database.pwaSubscription.findMany({
                where: { userId: user.id },
            })

            const subscriptionFound: PushSubscription = pwaSubscriptions
                .map(item => JSON.parse(item.content) as PushSubscription)
                .find(item => item.endpoint === subscription.endpoint)

            if (subscriptionFound) {
                console.log(
                    `Push notification for user "${user.id}" is already registered.`,
                )
            } else {
                await ctx.database.pwaSubscription.create({
                    data: {
                        content: JSON.stringify(subscription),
                    },
                })

                console.log(
                    `Push notification for user "${user.id}" has been registered.`,
                )
            }

            return { success: true }
        }),

    unsubscribe: Trpc.procedure
        .input(
            z.object({
                subscription: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = ctx.session.user

            const subscription = JSON.parse(input.subscription) as PushSubscription

            const pwaSubscriptions = await ctx.database.pwaSubscription.findMany({
                where: { userId: user.id },
            })

            const subscriptionFound = pwaSubscriptions
                .map(item => ({
                    ...item,
                    content: JSON.parse(item.content) as PushSubscription,
                }))
                .find(item => item.content.endpoint === subscription.endpoint)

            if (subscriptionFound) {
                await ctx.database.pwaSubscription.delete({
                    where: { id: subscriptionFound.id },
                })

                console.log(`Push notification for user "${user.id}" has been deleted.`)
                return { success: true }
            } else {
                console.log(`Could not find notification for user "${user.id}".`)
                return { success: false }
            }
        }),

    sendNotification: Trpc.procedure
        .input(
            z.object({
                title: z.string(),
                message: z.string(),
                userIds: z.array(z.string()).optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const pwaSubscriptions: PwaSubscription[] = []

            if (input.userIds?.length > 0) {
                const items = await ctx.database.pwaSubscription.findMany({
                    where: { userId: { in: input.userIds } },
                })

                pwaSubscriptions.push(...items)
            } else {
                const items = await ctx.database.pwaSubscription.findMany()

                pwaSubscriptions.push(...items)
            }

            const subscriptions = pwaSubscriptions.map(item =>
                JSON.parse(item.content),
            )

            PwaService.sendNotifications(subscriptions, input.title, input.message)

            console.log(`${subscriptions.length} notifications sent`)

            return { success: true }
        }),
})

export const PwaServer = {
    trpcRouter,
    service: PwaService,
}
