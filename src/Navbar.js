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
  // Constructor
  constructor() {
    super()
    // Get current user
    // TODO check setInitialState function docs
    // Set initial state
    this.state = {
      currentUser: '',
      isModalOpen: false,
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

    let data = {
      "email": email,
      "password": password,
    }
    queryApi('/authenticate', 'POST', data).then( res => {
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
  signUp(e) {
    console.log("SIGN UP")
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
  openModal = () => {
    this.setState({
      isModalOpen: true,
    })
  }

  // Close User Form Modal
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  render() {
    // Build User dropdown
    let dropdown = (
      <Menu.Item as={Dropdown} text={`Welcome, ${this.state.currentUser}`}>
        <Dropdown.Menu>
          <Dropdown.Item href="#">Favorites</Dropdown.Item>
          <Dropdown.Item href="#">My Drinks</Dropdown.Item>
          <Dropdown.Item href="#" onClick={e => this.logOut(e)}>Log Out</Dropdown.Item>
        </Dropdown.Menu>
      </Menu.Item>
    )

    // Render Return
    return(
      <div>
      <Menu>
        <Menu.Item href="/"><h1 className="brand">Remixology</h1></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item href="/">Home</Menu.Item>
          {this.state.currentUser ? (
            dropdown
          ) : (
            <Menu.Item href="#" onClick={e => this.openModal(e)}>Log In</Menu.Item>
          )}
          {this.state.currentUser ? null : (
            <Menu.Item href="#" onClick={e => this.signUp(e)}>Sign Up</Menu.Item>
          )}
        </Menu.Menu>
      </Menu>

      <UserForm
        isOpen={this.state.isModalOpen}
        closeModal={this.closeModal}
        logIn={this.logIn}
      />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Navbar)
