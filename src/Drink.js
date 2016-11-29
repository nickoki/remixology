// Drink.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'
import { Icon, Image } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class Drink extends Component {
  render() {

    let style = {
      drinksContainer: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      card: {
        display: 'inline-flex',
        margin: '1em',
        width: 428,
        minWidth: 428,
        height: '100%',
        overflow: 'hidden',
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
        height: 0,
        background: 0,
      },
    }

    // Get drink data from props
    let drink = this.props.drink

    // Build drink recipe by each ingredient
    var recipe = drink.recipe.map( (ingredient, j) => {

      // Convert ingredient volume
      let height = ((600 - (drink.glass.margin_top + drink.glass.margin_bottom)) * (ingredient.amount / 100))

      // Update ingredient styles
      style.ingredient = {
        height: height,
        background: ingredient.ingredient.color,
      }

      // Return ingredient DOM Object
      return(
        <div style={style.ingredient} key={j}></div>
      )
    })

    // Render Return
    return(
      <div>
        <Icon name="cocktail" />
        {drink.name}
        <div style={style.drinkGraphic}>
          <Image style={style.glassImage} src={drink.glass.image_url} alt={drink.glass.name} />
          <div style={style.ingredients}>
            {recipe}
          </div>
        </div>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Drink)
