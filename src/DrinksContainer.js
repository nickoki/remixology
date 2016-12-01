// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { queryApi } from './Utils'

import GetDrinks from './GetDrinks'



// ====================
// Class Definition & Render
// ====================
class DrinksContainer extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: '',
      drinks: [],
      hasResponse: false,
    }
  }

  componentWillMount() {
    // API call
    queryApi('/drinks', 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          drinks: res,
          hasResponse: true,
        })
      }
    })
    // Set currentUser
    if (localStorage.getItem('remixologyUser')) {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem('remixologyUser')).username
      })
    }
  }

  render() {
    if (!this.state.hasResponse) {
      return(
        null
      )
    } else {
      return(
        <GetDrinks drinks={this.state.drinks} currentUser={this.state.currentUser} />
      )
    }
  }
}



// ====================
// Exports
// ====================
export default DrinksContainer
