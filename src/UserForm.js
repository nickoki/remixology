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
              <Button type="submit" onClick={e => logIn(e, this.state.email, this.state.password)}>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={closeModal}>
            Nope
          </Button>
          <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={closeModal} />
        </Modal.Actions>
      </Modal>
    )
  }
}



// ====================
// Exports
// ====================
export default UserForm
