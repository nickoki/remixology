// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import { Card, Button, Icon, Image } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class Drinks extends Component {
  render() {

    // Set inline styles
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
    let {drinks} = this.props
    console.log(this.props)

    // Build each drink
    let results = drinks.map( (drink, i) => {

      // Update ingredients styles
      style.ingredients = {
        paddingTop: drink.glass.margin_top,
        paddingBottom: drink.glass.margin_bottom,
      }

      // Build drink recipe by each ingredient
      let recipe = drink.recipe.map( (ingredient, j) => {

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

      // Return drink DOM Object, contains recipe
      return(
        <Card style={style.card} key={i}>
          <Card.Content>
            <div style={style.drinkGraphic}>
              <Image style={style.glassImage} src={drink.glass.image_url} alt={drink.glass.name} />
              <div style={style.ingredients}>
                {recipe}
              </div>
            </div>
            <Card.Header>
              <h3>{drink.name}</h3>
            </Card.Header>
            <Card.Meta>
              <span><Icon name="user" /> {drink.user.username}</span>
            </Card.Meta>
            <Card.Description>
              <p>{drink.description}</p>
              <p>{drink.instructions}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Link to={`/drinks/${drink._id}`}>
              <Button icon="cocktail" content="View Drink" labelPosition="left" />
            </Link>
          </Card.Content>
        </Card>
      )
    })

    // Render Return
    return(
      <div className="drinks-container" style={style.drinkContainer}>
        {results}
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Drinks)
