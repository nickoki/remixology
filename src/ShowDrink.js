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

  componentWillMount() {
    // Get drink
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

  // Edit Drink
  editDrink() {
    let data = {
      "_id": this.props.params.id,
      "description": "New description.",
    }

    if (localStorage.getItem('remixologyUser')) {
      var jwt = JSON.parse(localStorage.getItem('remixologyUser')).authHeader
    }

    queryApi(`/drinks`, 'PUT', JSON.stringify(data), jwt).then(res => {
      if (res) {
        //Update state
        this.setState({
          drink: res.drink,
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
        <div>
          <a onClick={e => this.editDrink(e)}>Edit!</a>
          <Drink drink={this.state.drink} />
        </div>
      )
    }
  }
}



// ====================
// Exports
// ====================
export default ShowDrink
