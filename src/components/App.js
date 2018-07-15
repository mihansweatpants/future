import React, { Component, Fragment } from 'react'
import { Table, Button, Pagination } from 'semantic-ui-react'
import generateKey from 'utils/generateKey'
import TableRow from './TableRow'
import Loader from './Loader'
import { smallDataURL, bigDataURL } from '../constants'

class App extends Component {
  state = {
    data: [],
    isLoading: false,
    activePage: 1,
    offset: 0
  }

  fetchData = async type => {
    this.setState({ isLoading: true })

    let url
    if (type === 'small') url = smallDataURL
    if (type === 'big') url = bigDataURL

    try {
      const res = await fetch(url)
      const data = await res.json()
      this.setState({ data })
    } catch (err) {
      console.log(err)
    }

    this.setState({ isLoading: false })
  }

  handleReset = () =>
    this.setState({
      data: [],
      isLoading: false,
      activePage: 1,
      offset: 0
    })

  handlePageChange = (e, { activePage }) => {
    const diff = activePage - this.state.activePage

    if (activePage > this.state.activePage) {
      this.setState(prevState => ({
        offset: prevState.offset + 50 * diff,
        activePage: activePage
      }))
    } else {
      this.setState(prevState => ({
        offset: prevState.offset + 50 * diff,
        activePage: activePage
      }))
    }
  }

  render() {
    const { data, isLoading, offset, activePage } = this.state

    return (
      <Fragment>
        {isLoading && <Loader />}

        {data.length === 0 && (
          <div>
            <Button onClick={() => this.fetchData('small')}>
              Load small data
            </Button>
            <Button onClick={() => this.fetchData('big')}>Load big data</Button>
          </div>
        )}

        {data.length !== 0 && (
          <div>
            <Button color="red" onClick={this.handleReset}>
              Reset
            </Button>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data
                  .slice(offset, offset + 50)
                  .map(person => (
                    <TableRow
                      key={generateKey()}
                      id={person.id}
                      firstName={person.firstName}
                      lastName={person.lastName}
                      email={person.email}
                      phone={person.phone}
                    />
                  ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5">
                    <Pagination
                      activePage={activePage}
                      onPageChange={this.handlePageChange}
                      totalPages={data.length / 50}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </div>
        )}
      </Fragment>
    )
  }
}

export default App
