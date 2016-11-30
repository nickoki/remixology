// NewDrink.js

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
class NewDrink extends Component {
  constructor() {
    super()
    this.state = {
      glassware: [],
      glassSearchRes: [],
      glassName: '',
      ingredients: [],
      ingredientSearchRes: [],
      ingredientInfo: [],
    }
  }

  componentWillMount() {
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
      glassName: res
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
    temp.push({name: '', amount: 0})
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

  render() {

    var ingredientForm = []

    for (let i = 0; i < this.state.ingredientInfo.length; i++) {
      ingredientForm.push(
        <Form.Group key={i}>
          <Form.Field>
            <label>Ingredient Name</label>
            <ApiSearch
              resultsIndex={i}
              searchPool={this.state.ingredients}
              handleSearchResults={this.handleIngredientSearchResults}
              value={this.state.ingredientInfo[i].name}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            {this.state.ingredientInfo[i].amount === 0 ? (
              <input type="number" onChange={e => this.handleAmountChange(e, i)} value={''} />
            ) : (
              <input type="number" onChange={e => this.handleAmountChange(e, i)} value={this.state.ingredientInfo[i].amount || ''} />
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
      <div className="drink-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Drink Name</label>
            <input onChange={e => this.handleEmailChange(e)} />
          </Form.Field>

          <Form.Field>
            <label>Drink Description</label>
            <input onChange={e => this.handlePasswordChange(e)} />
          </Form.Field>

          <Form.Field>
            <label>Type of Glass</label>
            <ApiSearch
              searchPool={this.state.glassware}
              handleSearchResults={this.handleGlasswareSearchResults}
            />
            {/* <Search
              loading={this.state.isLoading}
              onChange={this.handleGlassChange}
              onSearchChange={this.handleGlassSearchChange}
              value={this.state.glassValue}
              results={this.state.glassResults}
            /> */}
          </Form.Field>

          {ingredientForm}
          <Form.Field>
            <Button labelPosition="left" icon="add" content="New Ingredient" onClick={this.addIngredient}/>
          </Form.Field>

          <Form.Field>
            <label>Recipe Instructions</label>
            <input />
          </Form.Field>

          <Button type="submit" labelPosition="left" icon="checkmark" color="green" content="Submit" />
        </Form>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default NewDrink
