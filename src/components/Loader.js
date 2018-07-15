import React from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

export default () => {
  return (
    <Dimmer active inverted>
      <Loader inverted size="huge">
        Loading content...
      </Loader>
    </Dimmer>
  )
}
