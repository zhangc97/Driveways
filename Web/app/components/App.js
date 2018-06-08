import React from 'react'
import Nav from './Nav'
import Home from './Home'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Modal from 'react-modal'
import SignUp from './SignUp'
import * as routes from '../constants/routes'
import withAuthentication from './withAuthentication'
import {firebase} from '../firebase'

const App = () => (
  <Router>
    <div className = 'main-container'>
      <Nav />

      <Route path = {routes.HOME} component = {Home} />

      <Footer />

    </div>
  </Router>
)

export default withAuthentication(App);
