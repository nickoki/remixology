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
  // constructor(props) {
  //   super(props)
  // }

  logIn(e) {
    let data = {
      "email": "nick@nick.nick",
      "password": "123123",
    }
    queryApi('/authenticate', 'POST', data).then( res => {
      if (res.success === true) {
        localStorage.setItem('remixologyUser', res.token)
      }
    })
  }


  render() {
    return(
      <div className="Home">
        <h1>Hello, Nick.</h1>
        <a onClick={e => this.logIn(e)}>Log In</a>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Home
