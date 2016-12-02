// Home.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'

import DrinksContainer from './DrinksContainer'
import Jumbotron from './Jumbotron'



// ====================
// Class Definition & Render
// ====================
class Home extends Component {
  render() {
    return(
      <div className="home">
        <Jumbotron />
        {/* <Style scopeSelector=".home" rules={styles} /> */}
        <DrinksContainer />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Home
