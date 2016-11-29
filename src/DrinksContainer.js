// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { queryApi } from './Utils'

import Drinks from './Drinks'



// ====================
// Class Definition & Render
// ====================
class DrinksContainer extends Component {
  constructor() {
    super()
    this.state = {
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
  }

  render() {
    if (!this.state.hasResponse) {
      return(
        null
      )
    } else {
      return(
        <Drinks drinks={this.state.drinks}/>
      )
    }
  }
}



// ====================
// Exports
// ====================
export default DrinksContainer
