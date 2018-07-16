import React, { Component, Fragment } from 'react'
import { Table, Button, Pagination, Input } from 'semantic-ui-react'
import generateKey from 'utils/generateKey'
import Loader from './Loader'
import PersonCard from './PersonCard'
import { smallDataURL, bigDataURL } from '../constants'

class App extends Component {
  state = {
    data: [],
    isLoading: false,
    limit: 15,
    offset: 0,
    activePage: 1,
    search: '-',
    activeColumn: null,
    sortDirection: null,
    personCard: null,
    error: null
  }

  fetchData = type => async () => {
    this.setState({ isLoading: true, error: null })

    let url
    if (type === 'small') url = smallDataURL
    if (type === 'big') url = bigDataURL

    try {
      const res = await fetch(url)
      const data = await res.json()
      this.setState({ data })
    } catch (err) {
      this.setState({ error: err.message })
    }

    this.setState({ isLoading: false })
  }

  handleReset = () =>
    this.setState({
      data: [],
      isLoading: false,
      limit: 15,
      offset: 0,
      activePage: 1,
      search: '-',
      activeColumn: null,
      sortDirection: null,
      personCard: null,
      error: null
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
      [e.target.name]: e.target.value,
      personCard: null,
      offset: 0,
      activePage: 1
    })

  handleSort = selectedColumn => () => {
    const { activeColumn, data, sortDirection } = this.state

    if (activeColumn !== selectedColumn) {
      this.setState({
        activeColumn: selectedColumn,
        data: data.sort((a, b) => {
          if (a[selectedColumn] < b[selectedColumn]) return -1
          if (a[selectedColumn] > b[selectedColumn]) return 1
          return 0
        }),
        sortDirection: 'ascending',
        offset: 0,
        activePage: 1
      })

      return
    }

    this.setState({
      data: data.reverse(),
      sortDirection: sortDirection === 'ascending' ? 'descending' : 'ascending',
      offset: 0,
      activePage: 1
    })
  }

  displayPersonCard = person => () =>
    this.setState({
      personCard: person
    })

  render() {
    const {
      data,
      isLoading,
      offset,
      activePage,
      limit,
      search,
      personCard,
      activeColumn,
      sortDirection,
      error
    } = this.state

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
        {error && (
          <div className="err-msg">
            <h2>{error}</h2>
            <p>Something went wrong while fetching data</p>
          </div>
        )}

        {isLoading && <Loader />}

        {data.length === 0 && (
          <div>
            <Button onClick={this.fetchData('small')}>
              Load small dataset
            </Button>
            <Button onClick={this.fetchData('big')}>Load bigger dataset</Button>
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

            <Table sortable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={activeColumn === 'id' ? sortDirection : null}
                    onClick={this.handleSort('id')}
                  >
                    Id
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={activeColumn === 'firstName' ? sortDirection : null}
                    onClick={this.handleSort('firstName')}
                  >
                    First Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={activeColumn === 'lastName' ? sortDirection : null}
                    onClick={this.handleSort('lastName')}
                  >
                    Last Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={activeColumn === 'email' ? sortDirection : null}
                    onClick={this.handleSort('email')}
                  >
                    Email
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={activeColumn === 'phone' ? sortDirection : null}
                    onClick={this.handleSort('phone')}
                  >
                    Phone
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {filteredData.slice(offset, offset + limit).map(person => (
                  <Table.Row
                    key={generateKey()}
                    onClick={this.displayPersonCard(person)}
                  >
                    <Table.Cell>{person.id}</Table.Cell>
                    <Table.Cell>{person.firstName}</Table.Cell>
                    <Table.Cell>{person.lastName}</Table.Cell>
                    <Table.Cell>{person.email}</Table.Cell>
                    <Table.Cell>{person.phone}</Table.Cell>
                  </Table.Row>
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

            {personCard && <PersonCard {...personCard} />}
          </div>
        )}
      </Fragment>
    )
  }
}

export default App
