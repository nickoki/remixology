// GetDrinks.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import { Card, Button, Icon } from 'semantic-ui-react'

import DrinkGraphic from './DrinkGraphic'



// ====================
// Class Definition & Render
// ====================
class GetDrinks extends Component {
  render() {

    // Set inline styles
    let style = {
      card: {
        display: 'inline-flex',
        margin: '1em',
        width: 428,
        minWidth: 428,
        height: '100%',
        overflow: 'hidden',
      },
    }

    // Get drink data from props
    let { drinks, currentUser } = this.props

    // Build each drink
    let results = drinks.map( (drink, i) => {
      // Return drink DOM Object, contains recipe
      return(
        <Card style={style.card} key={i}>
          <Card.Content>
            <DrinkGraphic drink={drink}/>
            <Card.Header>
              <h3>{drink.name}</h3>
            </Card.Header>
            <Card.Meta>
              <span><Icon name="user" /> {drink.user.username}</span>
            </Card.Meta>
            <Card.Description>
              <p>{drink.description}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Link to={`/d/${drink._id}`}>
              <Button icon="cocktail" content="View Drink" labelPosition="left" />
            </Link>
            {currentUser === drink.user.username ? (
              <Link to={`/d/${drink._id}/edit`}>
                <Button icon="pencil" content="Edit Drink" labelPosition="left" />
              </Link>
            ) : (
              null
            )}
          </Card.Content>
        </Card>
      )
    })

    // Render Return
    return(
      <div id="drinks" className="drinks-container" style={style.drinkContainer}>
        {results}
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(GetDrinks)
