import React from 'react'
import Nav from './Nav'
import Home from './Home'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' //fix this
import Modal from 'react-modal'
import SignUp from './SignUp'
import * as routes from '../constants/routes'
import withAuthentication from '../utils/withAuthentication'
import {firebase} from '../firebase'
import PasswordChange from './PasswordChange'
import PasswordForget from './PasswordForget'

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
