// EditIngredient.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class EditIngredient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      let temp = nextProps.data[nextProps.target]
      this.setState({
        data: temp
      })
    }
  }

  handleNameChange = (e) => {
    let temp = this.state.data
    temp.name = e.target.value
    this.setState({
      data: temp,
    })
  }

  handleColorChange = (e) => {
    let temp = this.state.data
    temp.color = e.target.value
    this.setState({
      data: temp,
    })
  }

  render() {
    let { isOpen, closeEditModal, handleEditSubmit } = this.props

    // Render return
    return(
      <Modal open={isOpen} onClose={closeEditModal}>
        <Modal.Header>Edit Ingredient</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input name="name" value={this.state.data.name} onChange={this.handleNameChange} />
              </Form.Field>

              <Form.Field>
                <label>Color</label>
                <input name="name" value={this.state.data.color} onChange={this.handleColorChange} />
              </Form.Field>
            </Form>

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="checkmark" content="Save" color="green" labelPosition="left" onClick={e => handleEditSubmit(e, this.state.data)} />
          <Button icon="remove" content="Cancel" labelPosition="left" onClick={closeEditModal} />
        </Modal.Actions>
      </Modal>
    )
  }
}



// ====================
// Exports
// ====================
export default EditIngredient
