// index.js

// ====================
// Dependencies
// ====================
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Navbar from './Navbar'
import Home from './Home'
import ShowDrink from './ShowDrink'

import './index.css'



// ====================
// Render
// ====================
ReactDOM.render(
  <div>
    <Navbar />
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/drinks/:id" component={ShowDrink} />
      {/* <Route path="*" component={NoMatch} /> */}
    </Router>
  </div>,
  document.getElementById('root')
)
