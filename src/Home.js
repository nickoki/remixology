// Home.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import DrinksContainer from './DrinksContainer'
import {queryApi} from './Utils'
import './Home.css';



// ====================
// Class Definition & Render
// ====================
class Home extends Component {
  // Constructor
  constructor(props) {
    super(props)
    // Get current user
    // TODO check setInitialState function docs
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
        <div className="navbar">
          <div className="navbar-left">
            <h1 className="brand">Remixology</h1>
          </div>
          <div className="navbar-right">
            <a href="#">Home</a>
            <a href="#" onClick={e => this.logIn(e)}>Log In</a>
            <a href="#" onClick={e => this.logOut(e)}>Log Out</a>
          </div>
        </div>
        <p>{this.state.currentUser}</p>
        <DrinksContainer />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Home
