import {
    PushSubscription,
    sendNotifications,
    VapidDetails,
} from '@remix-pwa/push'
import { Utility } from '~/core/helpers/utility'

class Service {
    private vapidDetails: VapidDetails

    constructor() {
        this.setup()
    }

    private setup() {
        try {
            const publicKey = process.env.VITE_WEB_PUSH_PUBLIC_KEY
            const privateKey = process.env.WEB_PUSH_PRIVATE_KEY

            if (Utility.isNull(publicKey) || Utility.isNull(privateKey)) {
                throw new Error(
                    `Set WEB_PUSH_EMAIL && VITE_WEB_PUSH_PUBLIC_KEY && WEB_PUSH_PRIVATE_KEY in your .env to activate`,
                )
            }

            this.vapidDetails = {
                publicKey,
                privateKey,
            }

            console.log(`Pwa service is active`)
        } catch (error) {
            console.error(`Pwa service failed to start: ${error.message}`)
        }
    }

    sendNotifications(
        subscriptions: PushSubscription[],
        title: string,
        message: string,
    ) {
        if (subscriptions.length === 0) {
            return
        }

        sendNotifications({
            subscriptions,
            vapidDetails: this.vapidDetails,
            notification: {
                title,
                options: {
                    body: message,
                },
            },
            options: {},
        })
    }
}

export const PwaService = new Service()
