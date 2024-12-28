import { Button, Divider, Flex, Result, Typography } from 'antd'
import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI with error info
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to reporting service or console
    console.error('Error caught in ErrorBoundary: ', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Display the actual error message
      return (
        <Result
          status="error"
          title="Something went wrong in your code."
          subTitle="There was an unexpected error in the application. Check the details below for debugging."
          style={{ background: 'white' }}
          extra={
            <>
              <Button type="primary" onClick={this.handleReload}>
                Reload Page
              </Button>
              <Button type="primary" onClick={this.handleGoHome}>
                Back Home
              </Button>

              <Flex vertical className="mt-5" style={{ textAlign: 'left' }}>
                <Typography.Title level={5}>Error Message</Typography.Title>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.message}
                </pre>
                <Divider />
                <Typography.Title level={5}>Stack Trace</Typography.Title>
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.stack}
                </pre>
              </Flex>
            </>
          }
        />
      )
    }

    return this.props.children
  }
}
