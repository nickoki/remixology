// Home.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import DrinksContainer from './DrinksContainer'



// ====================
// Class Definition & Render
// ====================
class Home extends Component {
  render() {
    return(
      <div className="home">
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
