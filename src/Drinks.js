// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'



// ====================
// Class Definition & Render
// ====================
class Drinks extends Component {
  render() {
    // Get drink data from props
    let {drinks} = this.props

    // Build each drink
    let results = drinks.map( (drink, i) => {

      // Set inline styles
      let style = {
        drinkContainer: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: 400,
          height: 600,
        },
        glassImage: {
          zIndex: 100,
          pointerEvents: 'none',
          position: 'absolute',
          height: 'inherit',
        },
        ingredients: {
          paddingTop: drink.glass.margin_top,
          paddingBottom: drink.glass.margin_bottom,
        },
        ingredient: {
          height: 0,
          background: 0,
        },
      }

      // Build drink recipe by each ingredient
      let recipe = drink.recipe.map( (ingredient, i) => {

        // Convert ingredient volume
        let height = ((600 - (drink.glass.margin_top + drink.glass.margin_bottom)) * (ingredient.amount / 100))
        console.log(height)
        // Update ingredient styles
        style.ingredient = {
          height: height,
          background: ingredient.ingredient.color,
        }

        // Return ingredient DOM Object
        return(
          <div style={style.ingredient} key={i}></div>
        )
      })

      // Return drink DOM Object, contains recipe
      return(
        <div style={style.drink} key={i}>
          <h3>{drink.name}</h3>
          <div>{drink.user.username}</div>
          <p>{drink.description}</p>
          <p>{drink.instructions}</p>
          <div style={style.drinkContainer}>
            <img style={style.glassImage} src={drink.glass.image_url} alt={drink.glass.name} />
            <div style={style.ingredients}>
              {recipe}
            </div>
          </div>
        </div>
      )
    })

    // Render Return
    return(
      <div>
        {results}
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Drinks)
