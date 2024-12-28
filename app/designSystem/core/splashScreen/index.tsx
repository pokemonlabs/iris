import { LoadingOutlined } from '@ant-design/icons'
import { Layout, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

export const MrbSplashScreen: React.FC = () => {
  const [isPageInitialised, setPageInitialised] = useState(false)

  useEffect(() => {
    setPageInitialised(true)
  }, [])

  if (!isPageInitialised) {
    return <div></div>
  }

  return (
    <Layout
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Layout>
  )
}
