// NewDrink.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { queryApi } from './Utils'
import { Button, Form, Search } from 'semantic-ui-react'
import _ from 'lodash'

// import Drink from './Drink'



// ====================
// Class Definition & Render
// ====================
class NewDrink extends Component {

  constructor(props) {
    super(props)
    this.state = {
      glassware: [],
      isLoading: false,
      value: '',
      results: [],
    }
  }

  componentWillMount() {
    this.resetComponent()
    queryApi('/glassware', 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          glassware: res,
        })
      }
    })
  }

  // Return Search to original state
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  // Update Search value on change
  handleChange = (e, result) => this.setState({ value: result.title })

  // Update Search results
  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name)

      var searchResults = _.filter(this.state.glassware, isMatch)
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
        results: results
      })
    }, 500)
  }

  render() {
    return(
      <div className="drink-form">
        <Form>
          <Form.Field>
            <label>Drink Name</label>
            <input onChange={e => this.handleEmailChange(e)} />
          </Form.Field>

          <Form.Field>
            <label>Drink Description</label>
            <input onChange={e => this.handlePasswordChange(e)} />
          </Form.Field>

          <Form.Field>
            <label>Type of Glass</label>
            <Search
              loading={this.state.isLoading}
              onChange={this.handleChange}
              onSearchChange={this.handleSearchChange}
              value={this.state.value}
              results={this.state.results}
            />
          </Form.Field>

          <Form.Field>
            <label>Ingredient Name</label>
            <input onChange={e => this.handlePasswordVerifyChange(e)} />
          </Form.Field>
        </Form>
        <Button labelPosition="left" icon="checkmark" color="green" content="Submit" />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default NewDrink
