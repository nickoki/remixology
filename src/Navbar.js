// Navbar.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'
import { Menu, Dropdown } from 'semantic-ui-react'
import { queryApi } from './Utils'



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
  logIn(e) {
    if (this.state.currentUser) console.log("TRUE")
    e.preventDefault()
    let data = {
      "email": "nick@nick.nick",
      "password": "123123",
    }
    queryApi('/authenticate', 'POST', data).then( res => {
      if (res.success === true) {
        localStorage.setItem('remixologyUser', JSON.stringify({authHeader: res.token, username: res.username}))
        // Update state
        this.setState({
          currentUser: res.username,
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
    console.log(this.state.currentUser)
  }

  render() {
    // Build User dropdown
    let dropdown = (
      <Menu.Item as={Dropdown} text={`Welcome, ${this.state.currentUser}`}>
        <Dropdown.Menu>
          <Dropdown.Item><a href="#">Favorites</a></Dropdown.Item>
          <Dropdown.Item><a href="#">My Drinks</a></Dropdown.Item>
          <Dropdown.Item onClick={e => this.logOut(e)}><a href="#">Log Out</a></Dropdown.Item>
        </Dropdown.Menu>
      </Menu.Item>
    )

    // Render Return
    return(
      <Menu>
        <Menu.Item><a href="/"><h1 className="brand">Remixology</h1></a></Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item><a href="/">Home</a></Menu.Item>
          {this.state.currentUser ? (
            dropdown
          ) : (
            <Menu.Item><a href="#" onClick={e => this.logIn(e)}>Log In</a></Menu.Item>
          )}
          {this.state.currentUser ? null : (
            <Menu.Item><a href="#" onClick={e => this.signUp(e)}>Sign Up</a></Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Navbar)
