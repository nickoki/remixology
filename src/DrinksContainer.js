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
  // Before compenent mounts
  constructor() {
    super()
    this.state = {
      drinks: []
    }
  }

  // Upon component mount
  componentDidMount() {
    // API call
    queryApi('/drinks', 'GET').then( res => {
      // Update state
      this.setState({
        drinks: res,
      })
    })
  }

  // Render single React element
  render() {
    return(
      <div className="drinks-container">
        <Drinks drinks={this.state.drinks}/>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default DrinksContainer
