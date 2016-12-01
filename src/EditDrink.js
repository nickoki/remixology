// EditDrink.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { queryApi } from './Utils'
import { Button, Form } from 'semantic-ui-react'

// import Drink from './Drink'
import ApiSearch from './ApiSearch'



// ====================
// Class Definition & Render
// ====================
class EditDrink extends Component {
  constructor() {
    super()
    this.state = {
      hasResponse: false,
      id: '',
      name: '',
      description: '',
      instructions: '',
      glassware: [],
      glassSearchRes: [],
      glass: '',
      ingredients: [],
      ingredientSearchRes: [],
      ingredientInfo: [],
    }
  }

  componentWillMount() {
    // Get drink
    queryApi(`/drinks/${this.props.params.id}`, 'GET').then( res => {
      if (res) {
        let formatRecipe = []
        for (let i = 0; i < res.recipe.length; i++) {
          let temp = {
            amount: res.recipe[i].amount,
            name: res.recipe[i].ingredient.name,
          }
          formatRecipe.push(temp)
        }
        console.log(formatRecipe)
        // Update state
        this.setState({
          id: res._id,
          name: res.name,
          description: res.description,
          instructions: res.instructions,
          glass: res.glass.name,
          ingredientInfo: formatRecipe,
          hasResponse: true,
        })
      }
    })
    queryApi('/glassware', 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          glassware: res,
        })
      }
    })
    queryApi('/ingredients', 'GET').then( res => {
      if (res) {
        // Update state
        this.setState({
          ingredients: res,
        })
      }
    })
  }

  handleGlasswareSearchResults = (res) => {
    this.setState({
      glass: res
    })
  }

  handleIngredientSearchResults = (res, index) => {
    let temp = this.state.ingredientInfo
    temp[index].name = res
    this.setState({
      ingredientInfo: temp
    })
    console.log(temp)
  }

  addIngredient = (e) => {
    e.preventDefault()
    let temp = this.state.ingredientInfo
    temp.push({amount: 0, name: ''})
    this.setState({
      ingredientInfo: temp
    })
    console.log(temp)
  }

  removeIngredient = (e, i) => {
    e.preventDefault()
    let temp = this.state.ingredientInfo
    temp.splice(i, 1)
    this.setState({
      ingredientInfo: temp
    })
  }

  handleAmountChange = (e, i) => {
    e.preventDefault()
    let temp = this.state.ingredientInfo
    temp[i].amount = e.target.value
    this.setState({
      ingredientInfo: temp
    })
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleInstructionsChange = (e) => {
    this.setState({
      instructions: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      "_id": this.state.id,
      "name": this.state.name,
      "description": this.state.description,
      "instructions": this.state.instructions,
      "glass": this.state.glass,
      "recipe": this.state.ingredientInfo,
    }

    let jwt = JSON.parse(localStorage.getItem('remixologyUser')).authHeader

    queryApi('/drinks', 'PUT', JSON.stringify(data), jwt).then( res => {
      if (res.success) {
        window.location.href = (`/drinks/${res.id}`)
      }
    })
  }

  render() {

    let style = {
      container:{
        display: 'flex',
        justifyContent: 'center',
      },
      form: {
        width: 428,
      }
    }


    if (!this.state.hasResponse) {
      return(
        null
      )
    } else {

      let ingredientForm = []

      for (let i = 0; i < this.state.ingredientInfo.length; i++) {
        ingredientForm.push(
          <Form.Group key={i}>
            <Form.Field>
              <label>Ingredient Name</label>
              <ApiSearch
                name="ingredient"
                resultsIndex={i}
                searchPool={this.state.ingredients}
                handleSearchResults={this.handleIngredientSearchResults}
                value={this.state.ingredientInfo[i].name}
                defaultValue={this.state.ingredientInfo[i].name}
              />
            </Form.Field>
            <Form.Field>
              <label>Amount</label>
              {this.state.ingredientInfo[i].amount === 0 ? (
                <input name="amount" type="number" onChange={e => this.handleAmountChange(e, i)} value={''} />
              ) : (
                <input name="amount" type="number" onChange={e => this.handleAmountChange(e, i)} value={this.state.ingredientInfo[i].amount || ''} />
              )}
            </Form.Field>
            <Form.Field>
              <label>&nbsp;</label>
              <Button icon="remove" color="red" onClick={e => this.removeIngredient(e, i)} />
            </Form.Field>
          </Form.Group>
        )
      }

      return(
        <div className="container" style={style.container}>
          <div className="drink-form" style={style.form}>
            <h1>New Drink</h1>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Drink Name</label>
                <input name="name" value={this.state.name} onChange={this.handleNameChange} />
              </Form.Field>

              <Form.Field label="Drink Description" name="description" value={this.state.description} control="textarea" rows="2" onChange={this.handleDescriptionChange} />

              <Form.Field>
                <label>Type of Glass</label>
                <ApiSearch
                  name="glass"
                  searchPool={this.state.glassware}
                  handleSearchResults={this.handleGlasswareSearchResults}
                  value={this.state.glass}
                  defaultValue={this.state.glass}
                />
              </Form.Field>

              {ingredientForm}

              <Form.Field>
                <Button labelPosition="left" icon="add" content="New Ingredient" onClick={this.addIngredient}/>
              </Form.Field>

              <Form.Field label="Recipe Instructions" name="instructions" value={this.state.instructions} control="textarea" rows="5" onChange={this.handleInstructionsChange} />

              <Button type="submit" labelPosition="left" icon="checkmark" color="green" content="Submit" />
            </Form>
          </div>
        </div>
      )
    }
  }
}



// ====================
// Exports
// ====================
export default EditDrink
