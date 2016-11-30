// ApiSearch.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
// import { queryApi } from './Utils'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

// import Drink from './Drink'



// ====================
// Class Definition & Render
// ====================
class ApiSearch extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
      searchValue: '',
      searchResults: [],
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        searchValue: nextProps.value
      })
    }
  }

  // Return Search to original state
  resetComponent = () => this.setState({ isLoading: false, searchResults: [], searchValue: '' })

  // Update Search value on change
  handleChange = (e, result) => {
    this.setState({ searchValue: result.title })
    // Pass results to parent
    this.props.handleSearchResults(result.title, this.props.resultsIndex)
  }

  // Update Search results
  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, searchValue: value })

    setTimeout(() => {
      if (this.state.searchValue.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i')
      const isMatch = (result) => re.test(result.name)

      var searchResults = _.filter(this.props.searchPool, isMatch)
      var results = []
      for (let i = 0; i < searchResults.length; i++) {
        let result = {
          key: i,
          title: searchResults[i].name,
          data: searchResults[i],
        }
        results.push(result)
      }
      this.setState({
        isLoading: false,
        searchResults: results
      })
    }, 500)
  }

  render() {
    return(
      <Search
        loading={this.state.isLoading}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        value={this.state.searchValue}
        results={this.state.searchResults}
      />
    )
  }
}



// ====================
// Exports
// ====================
export default ApiSearch
