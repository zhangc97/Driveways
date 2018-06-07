import React from 'react'
import Credentials from './Credentials'
import Register from './Register'


class Nav extends React.Component {
  render() {
    return (
      <div className = 'nav-bar'>
        <div className = 'title'>
          <h3>Driveways</h3>
        </div>
        <div className = 'account-container'>
          <Register />
          <Credentials />

        </div>
      </div>
    )
  }



}

export default Nav;
