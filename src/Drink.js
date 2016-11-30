// Drink.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'
import { Button, Form, Icon, Image } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class Drink extends Component {
  constructor() {
    super()
    this.state = {
      newIngredients: []
    }
  }

  newIngredient = (e) => {
    let arr = this.state.newIngredients
    arr.push(
      <Form.Field>
        <label>New Ingredient</label>
        <input placeholder="Search Ingredients" />
      </Form.Field>
    )
    this.setState({
      newIngredients: arr,
    })
  }


  render() {

    let style = {
      drinksContainer: {
        display: 'flex',
        flexDirection: 'row',
      },
      info: {
        marginTop: '1em',
        width: '33%',
        textAlign: 'center',
      },
      recipe: {
        marginTop: '1em',
        width: '33%',
        textAlign: 'center',
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
    console.log(drink)

    // Build drink recipe graphic by each ingredient
    var recipeGraphic = drink.recipe.map( (ingredient, j) => {

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

    // Build drink recipe list by each ingedient
    var recipeList = drink.recipe.map( (ingredient, j) => {
      return(
        <Form.Field>
          <label>Name</label>
          <input placeholder="Search Ingredients" value={ingredient.ingredient.name} />
        </Form.Field>
      )
    })

    // Render Return
    return(
      <div className="drinks-container" style={style.drinksContainer}>
        <div className="info" style={style.info}>
          <h1>{drink.name}</h1>
          <h3><Icon name="user" /> {drink.user.username}</h3>
          <p>{drink.description}</p>
          <p>{drink.instructions}</p>
        </div>
        <div className="graphic">
          <div style={style.drinkGraphic}>
            <Image style={style.glassImage} src={drink.glass.image_url} alt={drink.glass.name} />
            <div style={style.ingredients}>
              {recipeGraphic}
            </div>
          </div>
        </div>
        <div className="recipe" style={style.recipe}>
          <Form>
            {recipeList}
            {this.state.newIngredients}
          </Form>
          <Button onClick={e => this.newIngredient(e)}>New Ingredient</Button>
        </div>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Drink)
