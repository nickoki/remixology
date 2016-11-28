// Drinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import Radium from 'radium'
import { Grid, Card, Icon, Image } from 'semantic-ui-react'



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
        <Grid.Column>
          <Card style={{width: 428}} key={i}>
            <Card.Content>
              <div style={style.drinkContainer}>
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
            {/* <Card.Content>
              Extra
            </Card.Content> */}
          </Card>
        </Grid.Column>
      )
    })

    // Render Return
    return(
      <Grid columns={3}>
        <Grid.Row stretched>
          {results}
        </Grid.Row>
      </Grid>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Drinks)
