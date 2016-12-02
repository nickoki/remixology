// Navbar.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'
import { Dropdown, Menu } from 'semantic-ui-react'
import { queryApi } from './Utils'

import UserForm from './UserForm'



// ====================
// Class Definition & Render
// ====================
class Navbar extends Component {
  constructor() {
    super()
    // Set initial state
    this.state = {
      currentUser: '',
      isModalOpen: false,
      isSignUp: false,
    }
  }

  // Before component update
  componentWillMount() {
    let currentUser = ''
    if (localStorage.getItem('remixologyUser')) {
      currentUser = JSON.parse(localStorage.getItem('remixologyUser')).username
    }
    this.setState({
      currentUser: currentUser,
    })
  }

  // User Log In
  logIn = (e, email, password) => {
    e.preventDefault()
    // Set payload
    let data = {
      "email": email,
      "password": password,
    }
    // Query the api with user data
    queryApi('/authenticate', 'POST', JSON.stringify(data)).then( res => {
      if (res.success === true) {
        localStorage.setItem('remixologyUser', JSON.stringify({authHeader: res.token, username: res.username}))
        // Update state
        this.setState({
          currentUser: res.username,
          isModalOpen: false,
        })
      }
    })
  }

  // User Sign Up
  signUp(e, username, email, password) {
    e.preventDefault()
    // Set payload
    let data = {
      "username": username,
      "email": email,
      "password": password,
    }
    // Query the api with user data
    queryApi('/signup', 'POST', JSON.stringify(data)).then( res => {
      if (res.success === true) {
        localStorage.setItem('remixologyUser', JSON.stringify({authHeader: res.token, username: res.username}))
        // Update state
        this.setState({
          currentUser: res.username,
          isModalOpen: false,
        })
      }
    })
  }

  // User Log Out
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('remixologyUser')
    // Update state
    this.setState({
      currentUser: '',
    })
  }

  // Open User Form Modal
  openModal = (e, isSignUp) => {
    this.setState({
      isModalOpen: true,
      isSignUp: isSignUp,
    })
  }

  // Close User Form Modal
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  // Toggle between Log In and Sign Up form
  toggleForm = (e) => {
    if (this.state.isSignUp) {
      this.setState({
        isSignUp: false,
      })
    } else {
      this.setState({
        isSignUp: true,
      })
    }
  }

  render() {
    // Build User dropdown
    let dropdown = (
      <Menu.Item as={Dropdown} text={`Welcome, ${this.state.currentUser}`}>
        <Dropdown.Menu>
          <Dropdown.Item href="/d/new">New Drink</Dropdown.Item>
          {/* <Dropdown.Item href="#">Favorites</Dropdown.Item> */}
          {/* <Dropdown.Item href="#">My Drinks</Dropdown.Item> */}
          <Dropdown.Item href="#" onClick={e => this.logOut(e)}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Menu.Item>
    )

    // Render Return
    return(
      <div className="navbar">
        <Menu>
          <Menu.Item href="/"><h1 className="brand">Remixology</h1></Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item href="/d">Drinks</Menu.Item>
            <Menu.Item href="/i">Ingredients</Menu.Item>
            {this.state.currentUser ? (
              dropdown
            ) : (
              <Menu.Item href="#" onClick={e => this.openModal(e, false)}>Log In</Menu.Item>
            )}
            {this.state.currentUser ? null : (
              <Menu.Item href="#" onClick={e => this.openModal(e, true)}>Sign Up</Menu.Item>
            )}
          </Menu.Menu>
        </Menu>

        <UserForm
          isOpen={this.state.isModalOpen}
          isSignUp={this.state.isSignUp}
          closeModal={this.closeModal}
          logIn={this.logIn}
          signUp={this.signUp}
          toggleForm={this.toggleForm}
        />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Navbar)
