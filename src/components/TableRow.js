import React from 'react'
import { Table } from 'semantic-ui-react'

export default ({ id, firstName, lastName, email, phone }) => {
  return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{firstName}</Table.Cell>
      <Table.Cell>{lastName}</Table.Cell>
      <Table.Cell>{email}</Table.Cell>
      <Table.Cell>{phone}</Table.Cell>
    </Table.Row>
  )
}
