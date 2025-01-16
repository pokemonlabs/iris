import { useUserContext } from '@/core/context'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { Outlet, useNavigate } from '@remix-run/react'
import { Button, Input, Modal, notification } from 'antd'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { MrbSplashScreen } from '~/designSystem'

type Job = {
  id: string
  type: 'urgent' | 'normal'
  title: string
  description: string
}

export default function LoggedLayout() {
  const { isLoggedIn, isLoading } = useUserContext()
  const [currentJob, setCurrentJob] = useState<Job | null>(null)
  const [otp, setOtp] = useState<string>('')
  const [otpNotification, setOtpNotification] = useState<{ key: string, message: string } | null>(null)
  const router = useNavigate()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router('/login')
      return
    }

    if (isLoggedIn) {
      // Initialize Pusher
      const pusher = new Pusher('4801420944db61b44651', {
        cluster: 'ap2'
      })

      // Subscribe to jobs channel
      const channel = pusher.subscribe('my-channel')

      // Listen for OTP event
      channel.bind('otp-event', (data: { otp: string }) => {
        const notificationKey = `otp-notification-${Date.now()}`
        notification.info({
          message: 'New OTP Received',
          description: `OTP: ${data.otp}`,
          duration: 0, // Makes it persistent
          key: notificationKey,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.destroy(notificationKey)
                setOtpNotification(null)
              }}
            >
              Close
            </Button>
          )
        })
        setOtpNotification({ key: notificationKey, message: data.otp })
      })

      return () => {
        channel.unbind_all()
        channel.unsubscribe()
      }
    }
  }, [isLoading, isLoggedIn])

  const handleAcceptJob = () => {
    // Handle job acceptance logic here
    console.log('Job accepted:', currentJob?.id)
    setCurrentJob(null)
  }

  const handleRejectJob = () => {
    // Handle job rejection logic here
    console.log('Job rejected:', currentJob?.id)
    setCurrentJob(null)
  }

  const handleSendOtp = () => {
    // Handle sending OTP logic here
    console.log('OTP sent:', otp)
    setOtp('')
    if (otpNotification) {
      notification.destroy(otpNotification.key)
      setOtpNotification(null)
    }
  }

  if (isLoading) {
    return <MrbSplashScreen />
  }

  if (isLoggedIn) {
    return (
      <>
        <NavigationLayout>
          <Outlet />
        </NavigationLayout>

        <Modal
          title="Urgent Job Available"
          open={currentJob !== null}
          onCancel={() => setCurrentJob(null)}
          footer={[
            <Button key="reject" onClick={handleRejectJob}>
              Reject
            </Button>,
            <Button key="accept" type="primary" onClick={handleAcceptJob}>
              Accept
            </Button>
          ]}
        >
          {currentJob && (
            <>
              <h3>{currentJob.title}</h3>
              <p>{currentJob.description}</p>
            </>
          )}
        </Modal>

        {otpNotification && (
          <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Button
              type="primary"
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          </div>
        )}
      </>
    )
  }
}