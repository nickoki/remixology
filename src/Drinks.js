// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import {queryApi} from './Utils'



// ====================
// Class Definition & Render
// ====================
class Drinks extends Component {
  // Constructor
  constructor() {
    super()
    this.state = {
      drinks: {},
    }
  }

  // API
  getDrinks(e) {
    queryApi('/drinks', 'GET').then( res => {
      console.log(res)
      // Update state
      this.setState({
        drinks: res,
      })
    })
  }

  render() {
    return(
      <div className="drinks-container">
        <a href="#" onClick={e => this.getDrinks(e)}>Get Drinks (Console)</a>
        <h2>{this.state.name}</h2>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Drinks
