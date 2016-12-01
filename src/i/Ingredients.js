// Ingredients.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'

import EditIngredient from './EditIngredient'
import ConfirmDelete from '../ConfirmDelete'



// ====================
// Class Definition & Render
// ====================
class Ingredients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target: 0,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      console.log("Hello")
    }
  }

  // Open Edit Modal
  openEditModal = (i) => {
    if (this.state.isDeleteModalOpen) this.closeDeleteModal()
    this.setState({
      target: i,
      isEditModalOpen: true
    })
  }

  // Close Edit Modal
  closeEditModal = () => {
    this.setState({
      isEditModalOpen: false
    })
  }

  // Handle Edit Form Submit
  // handleEditSubmit(data) {
  //   console.log("DOING THIS")
  //   this.props.onEditSubmit(data)
  // }

  // Open Delete Modal
  openDeleteModal = () => {
    if (this.state.isEditModalOpen) this.closeEditModal()
    this.setState({
      isDeleteModalOpen: true
    })
  }

  // Close Edit Modal
  closeDeleteModal = () => {
    this.setState({
      isDeleteModalOpen: false
    })
  }

  // Handle Delete Submit
  handleDelete = () => {
    console.log("DELETE")
  }

  render() {
    let { ingredients, currentUser, onEditSubmit} = this.props

    let body = ingredients.map( (ingredient, i) => {
      return(
        <Table.Row key={i}>
          <Table.Cell>{ingredient.name}</Table.Cell>
          <Table.Cell>{ingredient.color}</Table.Cell>
          <Table.Cell>
            {ingredient.user.username === currentUser ? (
              <div>
                <Button icon="pencil" content="Edit" labelPosition="left" onClick={e => this.openEditModal(i)} />
                <Button icon="trash outline" content="Delete" color="red" labelPosition="left" onClick={this.openDeleteModal} />
              </div>
            ) : (
              null
            )}
          </Table.Cell>
          <ConfirmDelete
            isOpen={this.state.isDeleteModalOpen}
            closeModal={this.closeDeleteModal}
            // objectName={this.state.targetData}
            handleDelete={this.handleDelete}
            // target={this.state.target}
          />
        </Table.Row>
      )
    })

    // Render return
    return(
      <div>
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
        <EditIngredient
          isOpen={this.state.isEditModalOpen}
          closeEditModal={this.closeEditModal}
          handleEditSubmit={onEditSubmit}
          data={ingredients}
          target={this.state.target}
        />
      </div>
    )
  }
}



// ====================
// Exports
// ====================
export default Ingredients
