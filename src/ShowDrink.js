// ShowDrink.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { queryApi } from './Utils'

import Drink from './Drink'



// ====================
// Class Definition & Render
// ====================
class ShowDrink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drink: [],
      hasResponse: false,
    }
  }

  // Upon component mount
  componentWillMount() {
    // API call
    queryApi(`/drinks/${this.props.params.id}`, 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          drink: res,
          hasResponse: true,
        })
      }
    })
  }

  render() {
    if (!this.state.hasResponse) {
      return(
        <div></div>
      )
    } else {
      return(
        <Drink drink={this.state.drink} />
      )
    }
  }
}



// ====================
// Exports
// ====================
export default ShowDrink
