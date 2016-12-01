// DrinkGraphic.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'
import { Image } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class DrinkGraphic extends Component {
  render() {

    let style = {
      recipe: {
        marginTop: '1em',
        width: '33%',
        textAlign: 'center',
      },
      drinkGraphic: {
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
        paddingTop: 0,
        paddingBottom: 0,
      },
      ingredient: {
        width: 400,
        height: 0,
        background: 0,
      },
    }

    // Get drink data from props
    let { drink } = this.props

    // Update ingredients styles
    style.ingredients = {
      borderRight: '2px solid #fff',
      borderLeft: '2px solid #fff',
      paddingTop: drink.glass.margin_top,
      paddingBottom: drink.glass.margin_bottom,
    }

    // Order recipe by ingredient amounts
    let sortedRecipe = drink.recipe.sort( (a, b) => {
      return a.amount - b.amount
    })

    // Build drink recipe graphic by each ingredient
    let recipeStack = sortedRecipe.map( (ingredient, i) => {
      // Convert ingredient volume
      let height = ((600 - (drink.glass.margin_top + drink.glass.margin_bottom)) * (ingredient.amount / 100))
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

    // Render Return
    return(
      <div style={style.drinkGraphic}>
        <Image style={style.glassImage} src={drink.glass.image_url} alt={drink.glass.name} />
        <div style={style.ingredients}>
          {recipeStack}
        </div>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(DrinkGraphic)
