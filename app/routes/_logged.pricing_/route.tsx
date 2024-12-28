import { Card, Col, Empty, Flex, Row, Spin, Tag, Typography } from 'antd'

import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Product } from '~/plugins/payment/server'

export default function PricingPage() {
  const { data: products, isLoading: isLoadingProducts } =
    Api.billing.findManyProducts.useQuery({}, { initialData: [] })

  const { mutateAsync: createPaymentLink } =
    Api.billing.createPaymentLink.useMutation()

  const { data: subscriptions } = Api.billing.findManySubscriptions.useQuery(
    {},
    { initialData: [] },
  )

  const handleClick = async (product: Product) => {
    const { url } = await createPaymentLink({ productId: product.id })

    window.open(url, '_blank')
  }

  const getPrice = (product: Product) => {
    if (product.price === 0) {
      return 'Free'
    }

    const mapping = {
      usd: '${{price}}',
    }

    const pattern = mapping[product.currency]

    if (pattern) {
      return pattern.replace('{{price}}', product.price)
    }

    return `${product.currency.toUpperCase()} ${product.price}`
  }

  const isSubscribed = (product: Product) => {
    return subscriptions.find(
      subscription => subscription.productId === product.id,
    )
  }

  return (
    <PageLayout isCentered>
      <Row gutter={[16, 16]} justify="center" className="w-full">
        {products.length === 0 && isLoadingProducts && <Spin />}

        {products.length === 0 && !isLoadingProducts && (
          <Empty
            imageStyle={{ height: 60 }}
            description="No products found on Stripe"
          />
        )}

        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} md={12} lg={12} xl={8}>
            <Card
              style={{ height: '100%', overflow: 'hidden' }}
              hoverable
              onClick={() => handleClick(product)}
              cover={
                <Flex
                  style={{
                    position: 'relative',
                    height: '40vh',
                    width: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                >
                  <img
                    src={product.coverUrl}
                    alt={product.name}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Flex>
              }
            >
              <Flex vertical gap={10}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                  {product.name}
                </Typography.Title>

                <Flex align="center">
                  <Typography.Title level={1} style={{ margin: 0 }}>
                    {getPrice(product)}
                  </Typography.Title>
                  {product.interval && (
                    <Typography.Text className="ml-1">
                      / {product.interval}
                    </Typography.Text>
                  )}
                </Flex>

                {isSubscribed(product) && (
                  <div>
                    <Tag color="success">Active</Tag>
                  </div>
                )}

                <Typography.Text type="secondary">
                  {product.description}
                </Typography.Text>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
