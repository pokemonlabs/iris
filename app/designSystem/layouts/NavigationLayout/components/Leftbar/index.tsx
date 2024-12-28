import { Flex, Menu } from 'antd'
import { useDesignSystem } from '~/designSystem/provider'
import { Theme } from '~/designSystem/theme/theme'
import { NavigationItem } from '../../types'

interface Props {
  keySelected?: string
  items: NavigationItem[]
  itemsBottom?: NavigationItem[]
}

export const Leftbar: React.FC<Props> = ({
  keySelected,
  items,
  itemsBottom,
}) => {
  const { isMobile } = useDesignSystem()

  if (isMobile || items.length === 0) {
    return <></>
  }

  return (
    <Flex
      vertical
      justify="space-between"
      className="py-4"
      style={{
        width: '250px',
        backgroundColor: Theme.components?.Layout?.siderBg,
        borderRight: Theme.components?.Layout?.siderBorderRight,
      }}
    >
      <Menu
        mode="inline"
        inlineIndent={16}
        items={items}
        selectedKeys={[keySelected]}
        style={{ width: '100%' }}
      />
      <Menu
        mode="inline"
        inlineIndent={16}
        items={itemsBottom}
        selectedKeys={[keySelected]}
        style={{ width: '100%' }}
      />
    </Flex>
  )
}
