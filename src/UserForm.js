// UserForm.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
// import { queryApi } from './Utils'



// ====================
// Class Definition & Render
// ====================
class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    })
  }

  render() {
    // Define Props
    let { isOpen, closeModal, logIn } = this.props

    return(
      <Modal dimmer={'inverted'} open={isOpen} onClose={closeModal}>
        <Modal.Header>Log In</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder="Email" onChange={e => this.handleEmailChange(e)} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder="Password" type="password" onChange={e => this.handlePasswordChange(e)} />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button labelPosition="left" icon="checkmark" color="green" onClick={e => logIn(e, this.state.email, this.state.password)} content="Submit" />
          <Button labelPosition="left" icon="add" color="blue" content="Sign Up" />
          <Button labelPosition="left" icon="remove" onClick={closeModal} content="Cancel" />
        </Modal.Actions>
      </Modal>
    )
  }
}



// ====================
// Exports
// ====================
export default UserForm
