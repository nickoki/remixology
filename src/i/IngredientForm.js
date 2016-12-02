// IngredientForm.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'



// ====================
// Class Definition & Render
// ====================
class IngredientForm extends Component {
  render() {
    let { isOpen, closeModal, handleSubmit, handleNameChange, handleColorChange } = this.props

    // Data helper
    let data = {
      name: '',
      color: '',
    }
    if (this.props.data.length) {
      if (this.props.data[this.props.target]) {
        data = this.props.data[this.props.target]
      }
    }

    // Render return
    return(
      <Modal open={isOpen} onClose={closeModal}>
        {this.props.isNewIngredient ? (
          <Modal.Header>New Ingredient</Modal.Header>
        ) : (
          <Modal.Header>Edit Ingredient</Modal.Header>
        )}
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input name="name" value={data.name} onChange={e => handleNameChange(e, this.props.target)} />
              </Form.Field>

              <Form.Field>
                <label>Color</label>
                <SketchPicker disableRGB={true} width={400} color={data.color} onChange={e => handleColorChange(data.color, e, this.props.target)} />
                {/* <input name="color" value={data.color} onChange={e => handleColorChange(e, this.props.target)} /> */}
              </Form.Field>
            </Form>

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon="checkmark" content="Save" color="green" labelPosition="left" onClick={e => handleSubmit(e, this.props.target)} />
          <Button icon="remove" content="Cancel" labelPosition="left" onClick={e => closeModal(this.props.target)} />
        </Modal.Actions>
      </Modal>
    )
  }
}



// ====================
// Exports
// ====================
export default IngredientForm
