import { Api } from '@/core/trpc'
import { LoadingOutlined } from '@ant-design/icons'
import { usePush } from '@remix-pwa/push/client'
import { Flex, message, Switch, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const webPushPublicKey = import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY

type Props = { onSubcribe?(susbcription: PushSubscription): void }

const Toggle: React.FC<Props> = ({ onSubcribe }) => {
    const [isLoading, setLoading] = useState(false)
    const [isSupported, setIsSupported] = useState(false)

    const status: NotificationPermission =
        typeof Notification !== 'undefined' ? Notification.permission : 'default'

    const {
        subscribeToPush,
        unsubscribeFromPush,
        pushSubscription,
        isSubscribed,
        canSendPush,
    } = usePush()

    const { mutateAsync: saveSubscription } = Api.pwa.onSubscribe.useMutation()
    const { mutateAsync: deleteSubscription } = Api.pwa.unsubscribe.useMutation()

    useEffect(() => {
        const checkSupport = () => {
            if (
                'serviceWorker' in navigator &&
                'PushManager' in window &&
                'Notification' in window
            ) {
                setIsSupported(true)
            } else {
                setIsSupported(false)
            }
        }

        checkSupport()
    }, [])

    const handleChange = () => {
        setLoading(true)

        if (isSubscribed) {
            unsubscribeFromPush(async () => {
                await deleteSubscription({
                    subscription: JSON.stringify(pushSubscription),
                })

                message.info(`Notifications disabled`)

                setLoading(false)
            })
        } else {
            subscribeToPush(webPushPublicKey, async subscription => {
                try {
                    await saveSubscription({
                        subscription: JSON.stringify(subscription),
                    })

                    onSubcribe?.(subscription)

                    message.success(`Notifications activated`)
                } catch (error) {
                    message.error(`Could not activate notifications: ${error.message}`)
                }

                setLoading(false)
            })
        }
    }

    return (
        <>
            {isSupported && (
                <Flex vertical gap={20} className="py-10">
                    <Typography.Title level={3}>Notification</Typography.Title>

                    {status === 'denied' ||
                        (!canSendPush && (
                            <Typography.Text type="secondary">
                                Notifications are disabled and can be turned on in your device
                                settings.
                            </Typography.Text>
                        ))}

                    {status !== 'denied' && (
                        <>
                            <Flex justify="space-between" align="center">
                                <Typography.Text>Allow Notifications</Typography.Text>
                                <Flex gap={20}>
                                    {isLoading && <LoadingOutlined />}
                                    <Switch
                                        value={isSubscribed}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </Flex>
                            </Flex>
                        </>
                    )}
                </Flex>
            )}
        </>
    )
}

export const PwaClient = {
    Toggle,
}
