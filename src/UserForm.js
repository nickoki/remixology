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
      passwordVerify: '',
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

  handlePasswordVarifyChange = (e) => {
    this.setState({
      passwordVerify: e.target.value,
    })
  }

  render() {
    // Define Props
    let { isOpen, isSignUp, closeModal, logIn, toggleForm } = this.props

    return(
      <Modal dimmer={'inverted'} open={isOpen} onClose={closeModal}>

        {this.props.isSignUp ? (
          <Modal.Header>Sign Up</Modal.Header>
        ) : (
          <Modal.Header>Log In</Modal.Header>
        )}

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

              {this.props.isSignUp ? (
                <Form.Field>
                  <label>Confirm Password</label>
                  <input placeholder="Confirm Password" type="password" onChange={e => this.handlePasswordVerifyChange(e)} />
                </Form.Field>
              ) : (
                null
              )}

            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button labelPosition="left" icon="checkmark" color="green" onClick={e => logIn(e, this.state.email, this.state.password)} content="Submit" />

          {this.props.isSignUp ? (
            <Button labelPosition="left" icon="cocktail" color="blue" onClick={e => toggleForm(e)} content="Log In" />
          ) : (
            <Button labelPosition="left" icon="add" color="blue" onClick={e => toggleForm(e)} content="Sign Up" />
          )}

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
