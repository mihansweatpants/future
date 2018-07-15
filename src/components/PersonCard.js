import React from 'react'
import { Segment } from 'semantic-ui-react'

export default ({ firstName, lastName, address, description }) => {
  return (
    <Segment style={{ marginBottom: '3em' }}>
      Выбран пользователь{' '}
      <b>
        {firstName} {lastName}
      </b>
      <br />
      Описание: <br />
      <p>{description}</p>
      <br />
      Адрес проживания: <b>{address.streetAddress}</b>
      <br />
      Город: <b>{address.city}</b>
      <br />
      Провинция/штат: <b>{address.state}</b>
      <br />
      Индекс: <b>{address.zip}</b>
      <br />
    </Segment>
  )
}
