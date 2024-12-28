import { LoadingOutlined } from '@ant-design/icons'
import { Col, Flex, Row, Spin } from 'antd'
import { CSSProperties, ReactNode } from 'react'

type LayoutType = 'full-width' | 'narrow' | 'super-narrow'

interface Props {
  id?: string
  children: ReactNode
  gap?: number
  layout?: LayoutType
  style?: CSSProperties
  isFlex?: boolean
  isCentered?: boolean
  isScrollable?: boolean
  isLoading?: boolean
}

const getLayoutBreakpoints = (layout: LayoutType) => {
  const mapping: Record<LayoutType, Record<string, { span: number }>> = {
    'full-width': {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
      xxl: { span: 24 },
    },
    narrow: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 16 },
      xl: { span: 14 },
      xxl: { span: 12 },
    },
    'super-narrow': {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 10 },
      xxl: { span: 8 },
    },
  }

  return mapping[layout] ?? mapping['full-width']
}

export const PageLayout: React.FC<Props> = ({
  id,
  children,
  gap,
  layout = 'full-width',
  isFlex = false,
  isCentered = false,
  isScrollable = true,
  isLoading = false,
  ...props
}) => {
  const breakpoints = getLayoutBreakpoints(layout)

  const isFlexUsed = isFlex || isCentered || isLoading

  return (
    <Row
      id={id}
      justify="center"
      style={{
        flex: 1,
        overflowY: isScrollable ? 'auto' : undefined,
        overflowX: 'hidden',
      }}
    >
      <Col {...props} {...breakpoints}>
        {isFlexUsed && (
          <Flex
            vertical
            className="h-full p-4"
            justify={isCentered || isLoading ? 'center' : undefined}
            align={isCentered || isLoading ? 'center' : undefined}
            gap={gap}
          >
            {isLoading && <Spin indicator={<LoadingOutlined spin />} />}

            {!isLoading && children}
          </Flex>
        )}

        {!isFlexUsed && <div className="h-full p-4">{children}</div>}
      </Col>
    </Row>
  )
}
