import React from 'react'
import Credentials from './Credentials'

class Nav extends React.Component {
  render() {
    return (
      <div className = 'nav-bar'>
        <div className = 'title'>
          <h3>Driveways</h3>
        </div>
        <Credentials />
      </div>
    )
  }



}

export default Nav;
