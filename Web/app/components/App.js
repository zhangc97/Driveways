import React from 'react'
import Nav from './Nav'
import Home from './Home'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Modal from 'react-modal'
import SignUp from './SignUp'
import SignIn from './SignIn'
import * as routes from '../constants/routes';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className = 'main-container'>
          <Nav />
          <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = {routes.SIGN_UP} component = {SignUp}/>
            <Route exact path = {routes.SIGN_IN} component = {SignIn}/>
          </Switch>
          <Footer />

        </div>
      </Router>

    )
  }
}

export default App;
