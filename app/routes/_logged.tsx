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
  const [otpNotification, setOtpNotification] = useState<{
    key: string
    message: string
  } | null>(null)
  const router = useNavigate()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router('/login')
      return
    }

    if (isLoggedIn) {
      // Initialize Pusher
      const pusher = new Pusher('4801420944db61b44651', {
        cluster: 'ap2',
      })

      // Subscribe to jobs channel
      const channel = pusher.subscribe('channel')

      // Listen for OTP event
      // Listen for OTP event
      // Listen for OTP event
      channel.bind('otp-event', (data: { otp: string }) => {
        const notificationKey = `otp-notification-${Date.now()}`

        let otpValue = '' // Local variable to hold OTP input

        const handleOtpChange = e => {
          otpValue = e.target.value // Update the local variable
        }

        const handleOtpSubmit = () => {
          console.log('OtpSubmit', { otpValue, otp })
          if (otpValue.trim()) {
            channel.trigger('client-otp-response', { otp: otpValue }) // Trigger OTP response
            notification.destroy(notificationKey) // Close the notification
            setOtpNotification(null) // Reset OTP notification state
            // handleSendOtp()
          } else {
            notification.warning({
              message: 'Validation Error',
              description: 'Please enter the OTP before submitting.',
            })
          }
        }

        notification.open({
          message: 'New OTP Received',
          description: (
            <div>
              <p>Please enter the OTP sent to you:</p>
              <Input
                placeholder="Enter OTP"
                onChange={handleOtpChange}
                style={{ marginBottom: 10 }}
              />
              <Button type="primary" onClick={handleOtpSubmit}>
                Submit OTP
              </Button>
            </div>
          ),
          duration: 0, // Makes the notification persistent
          key: notificationKey,
        })

        setOtpNotification({ key: notificationKey, message: data.otp })
      })


      // Listen for browser session preview URL
      channel.bind('browser-session', (data: {
        type: string,
        live_agent_preview_url: string,
        worker_id: string,
        timestamp: string
      }) => {
        if (data.type === 'live_agent_preview_url') {
          const notificationKey = `preview-notification-${Date.now()}`

          notification.info({
            message: 'Browser Session Preview Available',
            description: (
              <div>
                <p>A live preview session is available at:</p>
                <a href={data.live_agent_preview_url} target="_blank" rel="noopener noreferrer">
                  {data.live_agent_preview_url}
                </a>
              </div>
            ),
            duration: null,
            key: notificationKey,
            btn: (
              <Button type="primary" size="small" onClick={() => notification.destroy(notificationKey)}>
                Close
              </Button>
            )
          });
        }
      });

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

  // const handleSendOtp = () => {
  //   // Handle sending OTP logic here
  //   console.log('OTP sent:', otp)
  //   setOtp('')
  //   if (otpNotification) {
  //     notification.destroy(otpNotification.key)
  //     setOtpNotification(null)
  //   }
  // }

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
            </Button>,
          ]}
        >
          {currentJob && (
            <>
              <h3>{currentJob.title}</h3>
              <p>{currentJob.description}</p>
            </>
          )}
        </Modal>

        {/* {otpNotification && (
          <div
            style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
          >
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Button type="primary" onClick={handleSendOtp}>
              Send OTP
            </Button>
          </div>
        )} */}
      </>
    )
  }
}
