// index.js

// ====================
// Dependencies
// ====================
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Navbar from './Navbar'
import Home from './Home'
import EditDrink from './EditDrink'
import NewDrink from './NewDrink'
import ShowDrink from './ShowDrink'
import GetIngredients from './i/GetIngredients'

import './index.css'



// ====================
// Render
// ====================
ReactDOM.render(
  <div>
    <Navbar />
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
        <Route path="/d/new" component={NewDrink} />
        <Route path="/d/:id" component={ShowDrink} />
        <Route path="/d/:id/edit" component={EditDrink} />
        <Route path="/i" component={GetIngredients} />
      {/* </Route> */}
      {/* <Route path="*" component={NoMatch} /> */}
    </Router>
  </div>,
  document.getElementById('root')
)
