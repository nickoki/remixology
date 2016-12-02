// Ingredients.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'

import IngredientForm from './IngredientForm'
import ConfirmDelete from '../ConfirmDelete'



// ====================
// Class Definition & Render
// ====================
class Ingredients extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     target: 0,
  //   }
  // }

  render() {
    let {
      currentUser,
      ingredients,
      handleEditSubmit,
      handleNewSubmit,
      handleNameChange,
      handleColorChange,
    } = this.props

    let body = ingredients.map( (ingredient, i) => {
      return(
        <Table.Row key={i}>
          <Table.Cell>{ingredient.name}</Table.Cell>
          <Table.Cell>{ingredient.color}</Table.Cell>
          <Table.Cell>
            {ingredient.user.username === currentUser ? (
              <div>
                <Button icon="pencil" content="Edit" labelPosition="left" onClick={e => this.props.toggleEditModal(i)} />
                <Button icon="trash outline" content="Delete" color="red" labelPosition="left" onClick={e => this.props.toggleDeleteModal(i)} />
              </div>
            ) : (
              null
            )}
          </Table.Cell>
        </Table.Row>
      )
    })

    // Render return
    return(
      <div className="ingredients-container">
        { currentUser ? (
          <Button icon="add" content="New Ingredient" color="yellow" labelPosition="left" onClick={e => this.props.toggleNewModal(this.props.nextNewIndex)} />
        ) : (
          null
        )}
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Color</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {body}
          </Table.Body>
        </Table>

        <ConfirmDelete
          isOpen={this.props.isDeleteModalOpen}
          closeModal={this.props.toggleDeleteModal}
          target={this.props.target}
          // objectName={this.state.targetData}
          handleDelete={this.props.handleDeleteSubmit}
        />

        <IngredientForm
          isOpen={this.props.isEditModalOpen}
          closeModal={this.props.toggleEditModal}
          handleSubmit={handleEditSubmit}
          data={ingredients}
          target={this.props.target}
          handleNameChange={handleNameChange}
          handleColorChange={handleColorChange}
        />

        <IngredientForm
          isOpen={this.props.isNewModalOpen}
          closeModal={this.props.toggleNewModal}
          handleSubmit={handleNewSubmit}
          data={ingredients}
          target={this.props.target}
          handleNameChange={handleNameChange}
          handleColorChange={handleColorChange}
          isNewIngredient={true}
        />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Ingredients
