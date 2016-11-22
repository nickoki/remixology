// Home.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import {queryApi} from './Utils'
import './Home.css';



// ====================
// Class Definition & Render
// ====================
class Home extends Component {
  // Constructor
  constructor() {
    super()
    // Get current user
    let currentUser = ''
    if (localStorage.getItem('remixologyUser')) {
      currentUser = JSON.parse(localStorage.getItem('remixologyUser')).username
    }
    // Set initial state
    this.state = {
      currentUser: currentUser,
    }
  }

  // User Log In
  logIn(e) {
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

  // User Log Out
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('remixologyUser')
    // Update state
    this.setState({
      currentUser: '',
    })
  }

  render() {
    return(
      <div className="Home">
        <h1>Remixology</h1>
        <p>{this.state.currentUser}</p>
        <a onClick={e => this.logIn(e)}>Log In</a>
        <a onClick={e => this.logOut(e)}>Log Out</a>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Home
