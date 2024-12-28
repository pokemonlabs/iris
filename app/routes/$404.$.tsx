import { Link } from '@remix-run/react'
import { Button, Result } from 'antd'
import { PageLayout } from '~/designSystem'

export default function NotFound() {
  return (
    <>
      <PageLayout isCentered>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary">
              <Link to="/">Back Home</Link>
            </Button>
          }
        />
      </PageLayout>
    </>
  )
}
