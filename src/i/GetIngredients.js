// GetIngredients.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { queryApi } from '../Utils'

import Ingredients from './Ingredients'



// ====================
// Class Definition & Render
// ====================
class GetIngredients extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: '',
      ingredients: [],
      hasResponse: false,
    }
  }

  componentWillMount() {
    // API call
    queryApi('/ingredients', 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          ingredients: res,
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

  onEditSubmit = (e, ingredient) => {
    console.log(this.state.hasResponse)
    console.log("WHO CALLED YOU")
    // let data = {
    //   "_id": this.props.params.id,
    //   "user": this.state.userId,
    //   "name": this.state.name,
    //   "description": this.state.description,
    //   "instructions": this.state.instructions,
    //   "glass": this.state.glass,
    //   "recipe": this.state.ingredientInfo,
    // }

    let jwt = JSON.parse(localStorage.getItem('remixologyUser')).authHeader

    queryApi('/ingredients', 'PUT', JSON.stringify(ingredient), jwt).then( res => {
      if (res.success) {
        console.log("Success")
        // window.location.href = (`/i/${res.id}`)
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
        <Ingredients
          ingredients={this.state.ingredients}
          currentUser={this.state.currentUser}
          onEditSubmit={this.onEditSubmit}
        />
      )
    }
  }
}



// ====================
// Exports
// ====================
export default GetIngredients
