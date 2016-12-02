// UserForm.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class UserForm extends Component {

  render() {
    // Define Props
    let { isOpen, closeModal, logIn, signUp, toggleForm, username, email, password, passwordVerify } = this.props

    return(
      <Modal open={isOpen} onClose={closeModal}>

        {this.props.isSignUp ? (
          <Modal.Header>Sign Up</Modal.Header>
        ) : (
          <Modal.Header>Log In</Modal.Header>
        )}

        <Modal.Content>
          <Modal.Description>
            <Form>
              {this.props.isSignUp ? (
                <Form.Field>
                  <label>Username</label>
                  <input value={username} placeholder="Username" onChange={e => this.props.handleUsernameChange(e)} />
                </Form.Field>
              ) : (
                null
              )}
              <Form.Field>
                <label>Email</label>
                <input value={email} placeholder="Email" onChange={e => this.props.handleEmailChange(e)} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input value={password} placeholder="Password" type="password" onChange={e => this.props.handlePasswordChange(e)} />
              </Form.Field>

              {this.props.isSignUp ? (
                <Form.Field>
                  <label>Confirm Password</label>
                  <input value={passwordVerify} placeholder="Confirm Password" type="password" onChange={e => this.props.handlePasswordVerifyChange(e)} />
                </Form.Field>
              ) : (
                null
              )}

            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {this.props.isSignUp ? (
            <Button labelPosition="left" icon="checkmark" color="green" onClick={e => signUp(e)} content="Sign Up" />
          ) : (
            <Button labelPosition="left" icon="checkmark" color="green" onClick={e => logIn(e)} content="Log In" />
          )}
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
