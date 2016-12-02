// ConfirmDelete.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class ConfirmDelete extends Component {
  render() {
    let { isOpen, closeModal, handleDelete } = this.props

    // Render return
    return(
      <Modal open={isOpen} onClose={closeModal}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Are you sure you'd like to delete?</p>
            <i>This action can't be undone.</i>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="trash outline" content="Delete" color="red" labelPosition="left" onClick={e => handleDelete(e, this.props.target)} />
          <Button icon="remove" content="Cancel" labelPosition="left" onClick={closeModal} />
        </Modal.Actions>
      </Modal>
    )
  }
}



// ====================
// Exports
// ====================
export default ConfirmDelete
