// Jumbotron.js

// ====================
// Dependencies
// ====================
import React, { Component } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import { Button } from 'semantic-ui-react'



// ====================
// Class Definition & Render
// ====================
class Jumbotron extends Component {
  constructor(props) {
    super(props)
    this.state = {
      greeting: '',
      greetingIndex: 0,
    }
  }

  componentWillMount() {
    this.setState({
      greeting: 'Cheers!',
    })
  }

  handleGreetingClick = () => {
    let greetings = [
      'Cheers!',
      'Salute!',
      'Kanpai!',
      'Santé!',
      'Prost!',
      'Cent\'anni!',
      // '乾杯!',
      // '干杯!',
      // '건배!',
      'Na Zdravi!',
      'Nazdravlje!',
      'Skål!',
      'Saúde!',
    ]
    let isSameGreeting = true
    let newIndex = 0
    while (isSameGreeting) {
      newIndex = Math.floor(Math.random() * greetings.length)
      if (newIndex !== this.state.greetingIndex) {
        isSameGreeting = false
      }
    }
    this.setState({
      greeting: greetings[newIndex],
      greetingIndes: newIndex,
    })
  }



  render() {

    let style = {
      jumbotron: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(http://res.cloudinary.com/ln4ekgvyc/image/upload/v1480697717/remixology/ebsvxw5atk8-patrick-schopflin.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '1em',
        width: '100vw',
        height: '50vh',
        minHeight: 300,
        padding: '0 6em',
        cursor: 'pointer',
        userSelect: 'none',
      },
      h1: {
        fontSize: '48pt',
        color: '#fff',
      },
      p: {
        color: '#fff',
      }
    }

    return(
      <div className="jumbotron" style={style.jumbotron}>
        <div>
          <h1 className="greeting" onClick={this.handleGreetingClick} style={style.h1}>
            {this.state.greeting}
          </h1>
          <p style={style.p}>Remixology is the home for cocktail & drink recipes &mdash; from the classics to creative new concoctions!</p>
          <a href='#drinks'><Button inverted content="Find a Drink" /></a>
          { this.props.currentUser ? (
            <Link to='/d/new'><Button inverted content="Make Your Own" /></Link>
          ) : (
            null
          )}
        </div>
      </div>
    )
  }
}



// ====================
// Exports
// ====================
module.exports = Radium(Jumbotron)
