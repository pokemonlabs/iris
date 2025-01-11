import { useUserContext } from '@/core/context'
import { NavigationLayout } from '@/designSystem/layouts/NavigationLayout'
import { Outlet, useNavigate } from '@remix-run/react'
import { Button, Modal, notification } from 'antd'
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

      channel.bind('my-event', (job: Job) => {
        if (job.type === 'urgent') {
          // Show modal for urgent jobs
          setCurrentJob(job)
        } else {
          // Show notification for normal jobs
          notification.info({
            message: 'New Job Available',
            description: job.title,
            placement: 'topRight'
          })
        }
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
      </>
    )
  }
}
