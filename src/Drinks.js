// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'



// ====================
// Exports
// ====================
class Drinks extends Component {
  render() {
    let {drinks} = this.props
    let results = drinks.map( (drink, i) => {
      return(
        <div className="drink" key={i}>
          <h3>{drink.name}</h3>
          <div>{drink.user.username}</div>
          <p>{drink.description}</p>
          <p>{drink.instructions}</p>
          <div className="drink-graphic">
            <img src={drink.glass.image_url} alt={drink.glass.name} />
          </div>
        </div>
      )
    })

    // Render Return
    return(
      <div>{results}</div>
    )
  }
}

export default Drinks
