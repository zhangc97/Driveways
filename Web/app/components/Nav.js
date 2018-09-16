import React from 'react'
import Credentials from './Credentials'
import Register from './Register'
import avatar from './images/stock.png';
import AuthUserContext from '../utils/AuthUserContext';
import { connect } from 'react-redux';
import SignOut from './SignOutButton'


const Nav = () => (
  <div className = 'nav-bar'>
    <div className = 'title'>
      <h3>Driveways</h3>
    </div>
    <AuthUserContext.Consumer>
      {authUser => authUser
        ? <NavAuthed />
        : <NavNonAuthed />}
    </AuthUserContext.Consumer>
  </div>
)

const NavAuthed = () => (
  <div>
    <img src = {avatar} className = 'avatar-img'/>
    <SignOut />
  </div>

)
const NavNonAuthed = () => (
  <div className = 'account-container'>
    <Credentials />
  </div>
)



export default Nav
