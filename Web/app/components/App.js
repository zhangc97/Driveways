import React from 'react'
import Nav from './Nav'
import Home from './Home'
import Footer from './Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className = 'main-container'>
          <Nav />
          <Switch>
            <Route exact patch = '/' component = {Home} />
          </Switch>
          <Footer />

        </div>
      </Router>

    )
  }
}

export default App;
