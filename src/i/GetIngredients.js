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
  constructor(props) {
    super(props)
    this.state = {
      currentUser: '',
      hasResponse: false,
      ingredients: [],
      target: 0,
      nextNewIndex: 0,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      isNewModalOpen: false,
    }
  }

  componentWillMount() {
    // API call
    queryApi('/ingredients', 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          ingredients: res,
          nextNewIndex: res.length,
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

  // Open Delete Modal
  toggleDeleteModal = (i) => {
    this.setState({
      target: i,
      isDeleteModalOpen: !this.state.isDeleteModalOpen,
    })
  }

  // Open Edit Modal
  toggleEditModal = (i) => {
    this.setState({
      target: i,
      isEditModalOpen: !this.state.isEditModalOpen,
    })
  }

  // Open New Modal
  toggleNewModal = (i) => {
    let temp = this.state.ingredients
    if (!temp[i]) {
      let newIngredient = {
        name: '',
        color: '',
        user: {
          username: this.state.currentUser,
        },
      }
      temp.push(newIngredient)
    }
    this.setState({
      target: i,
      ingredients: temp,
    })
    this.setState({
      target: i,
      isNewModalOpen: !this.state.isNewModalOpen,
    })
  }

  // Handle Ingredient Name Change in Form
  onNameChange = (e, i) => {
    let temp = this.state.ingredients
    temp[i].name = e.target.value
    this.setState({
      ingredients: temp,
    })
  }

  // Handle Ingredient Name Change in Form
  onColorChange = (e, i) => {
    let temp = this.state.ingredients
    temp[i].color = e.target.value
    this.setState({
      ingredients: temp,
    })
  }

  // Delete Submit
  onDeleteSubmit = (e, i) => {
    // Get json web token
    let jwt = JSON.parse(localStorage.getItem('remixologyUser')).authHeader
    // Set data
    let data = this.state.ingredients[i]
    // Query API
    queryApi('/ingredients', 'DELETE', JSON.stringify(data), jwt).then( res => {
      if (res.success) {
        let temp = this.state.ingredients
        temp.splice(i, 1)
        this.setState({
          ingredients: temp,
          nextNewIndex: temp.length,
        })
        this.toggleDeleteModal(i)
      }
    })
  }

  // Edit Submit
  onEditSubmit = (e, i) => {
    // Get json web token
    let jwt = JSON.parse(localStorage.getItem('remixologyUser')).authHeader
    // Set data
    let data = this.state.ingredients[i]
    // Query API
    queryApi('/ingredients', 'PUT', JSON.stringify(data), jwt).then( res => {
      if (res.success) {
        this.toggleEditModal(i)
      }
    })
  }

  // New Submit
  onNewSubmit = (e, i) => {
    // Get json web token
    let jwt = JSON.parse(localStorage.getItem('remixologyUser')).authHeader
    // Set data
    let data = this.state.ingredients[i]
    // Query API
    queryApi('/ingredients', 'POST', JSON.stringify(data), jwt).then( res => {
      if (res.success) {
        let temp = this.state.ingredients
        this.setState({
          nextNewIndex: temp.length
        })
        this.toggleNewModal(i)
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
          currentUser={this.state.currentUser}

          ingredients={this.state.ingredients}
          target={this.state.target}
          nextNewIndex={this.state.nextNewIndex}

          handleDeleteSubmit={this.onDeleteSubmit}

          handleEditSubmit={this.onEditSubmit}
          handleNewSubmit={this.onNewSubmit}

          handleNameChange={this.onNameChange}
          handleColorChange={this.onColorChange}

          toggleDeleteModal={this.toggleDeleteModal}
          toggleEditModal={this.toggleEditModal}
          toggleNewModal={this.toggleNewModal}

          isDeleteModalOpen={this.state.isDeleteModalOpen}
          isEditModalOpen={this.state.isEditModalOpen}
          isNewModalOpen={this.state.isNewModalOpen}
        />
      )
    }
  }
}



// ====================
// Exports
// ====================
export default GetIngredients
