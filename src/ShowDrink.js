// ShowDrink.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Link } from 'react-router'
import { queryApi } from './Utils'
import { Button, Icon } from 'semantic-ui-react'

import DrinkGraphic from './DrinkGraphic'



// ====================
// Class Definition & Render
// ====================
class ShowDrink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: '',
      drink: [],
      hasResponse: false,
    }
  }

  componentWillMount() {
    // Get drink
    queryApi(`/drinks/${this.props.params.id}`, 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          drink: res,
          hasResponse: true,
        })
      }
    })
    // Set currentUser
    if (localStorage.getItem('remixologyUser')) {
      this.setState({
        currentUser: JSON.parse(localStorage.getItem('remixologyUser')).username
      })
    }
  }

  render() {

    let style = {
      drinksContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1em',
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
      shadow: {
        display: 'block',
        boxShadow: '0 0 10px 6px #000',
        width: 160,
        height: 15,
        borderRadius: '40%',
        // marginTop: 30,
        margin: '50px auto 0',
        background: '#000',
        opacity: '0.04',
	// animation floating-shadow 2s ease infinite
      },
    }

    if (!this.state.hasResponse) {
      return(
        null
      )
    } else {
      // Build drink recipe list by each ingedient
      var recipeList = this.state.drink.recipe.map( (ingredient, i) => {
        return(
          <div key={i}>
            <p>{ingredient.ingredient.name}</p>
          </div>
        )
      })
      return(
        <div className="drinks-container" style={style.drinksContainer}>
          <div className="info" style={style.info}>
            <h1>{this.state.drink.name}</h1>
            <h3><Icon name="user" /> {this.state.drink.user.username}</h3>
            <p>{this.state.drink.description}</p>
            <p>{this.state.drink.instructions}</p>
            {this.state.currentUser === this.state.drink.user.username ? (
              <Link to={`/drinks/${this.props.params.id}/edit`}>
                <Button icon="pencil" content="Edit Drink" labelPosition="left" />
              </Link>
            ) : (
              null
            )}
          </div>
          <div className="graphic">
            <DrinkGraphic drink={this.state.drink}/>
            <div style={style.shadow}></div>
          </div>
          <div className="recipe" style={style.recipe}>
            {recipeList}
          </div>
        </div>
      )
    }
  }
}



// ====================
// Exports
// ====================
export default ShowDrink
