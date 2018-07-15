import React, { Component, Fragment } from 'react'
import { Table, Button, Pagination, Input } from 'semantic-ui-react'
import generateKey from 'utils/generateKey'
import TableRow from './TableRow'
import Loader from './Loader'
import { smallDataURL, bigDataURL } from '../constants'

class App extends Component {
  state = {
    data: [],
    isLoading: false,
    activePage: 1,
    offset: 0,
    limit: 15,
    search: '-'
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
      ...this.state,
      data: [],
      isLoading: false,
      activePage: 1,
      offset: 0,
      search: '-'
    })

  handlePageChange = (e, { activePage }) => {
    const { limit } = this.state
    const diff = activePage - this.state.activePage

    if (activePage > this.state.activePage) {
      this.setState(prevState => ({
        offset: prevState.offset + limit * diff,
        activePage: activePage
      }))
    } else {
      this.setState(prevState => ({
        offset: prevState.offset + limit * diff,
        activePage: activePage
      }))
    }
  }

  handleInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    })

  render() {
    const { data, isLoading, offset, activePage, limit, search } = this.state

    let filteredData = this.state.data.filter(elem =>
      Object.values(elem)
        .slice(0, 5)
        .some(
          value =>
            value
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1
        )
    )

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
            <div className="table-menu">
              <Button
                color="red"
                onClick={this.handleReset}
                className="reset btn"
              >
                Reset
              </Button>

              <Input
                placeholder="Search..."
                value={search}
                name="search"
                onChange={this.handleInputChange}
                icon="search"
              />
            </div>

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
                {filteredData
                  .slice(offset, offset + limit)
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
                      totalPages={Math.ceil(filteredData.length / limit)}
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
