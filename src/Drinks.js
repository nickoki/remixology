// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium, { Style } from 'radium'
// import Radium, { Style } from 'radium'



// ====================
// Styles (Radium)
// ====================
// const styles = {
//   '.drink-graphic': {
//     width: 400,
//     height: 600,
//   },
//   '.glass-image': {
//     zIndex: 100,
//     pointerEvents: 'none',
//     position: 'absolute',
//     strokeOpacity: '0'
//   },
// }



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

        // Update ingredient styles
        style.ingredient = {
          height: ingredient.amount,
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

// export default Drinks
module.exports = Radium(Drinks)
