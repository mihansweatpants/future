import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default () => {
  return (
    <Menu pagination>
      <Menu.Item as="a" icon>
        <Icon name="chevron left" />
      </Menu.Item>
      <Menu.Item as="a">1</Menu.Item>
      <Menu.Item as="a">2</Menu.Item>
      <Menu.Item as="a">3</Menu.Item>
      <Menu.Item as="a">4</Menu.Item>
      <Menu.Item as="a" icon>
        <Icon name="chevron right" />
      </Menu.Item>
    </Menu>
  )
}
