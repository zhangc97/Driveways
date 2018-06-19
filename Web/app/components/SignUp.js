import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import * as routes from '../constants/routes';
import {auth, db} from '../firebase';

const SignUpPage = ( {history} ) => (
  <div className = 'input-container'>
    <h1>Sign Up</h1>
    <SignUpForm history = {history} />
  </div>
)

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]:value,
})

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { INITIAL_STATE }
  }
  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

  const { history } = this.props;
  auth.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      db.doCreateUser(authUser.user.uid, username, email)
        .then(() => {
          this.setState(() => ({INITIAL_STATE}));
          //redirect route?
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        })
    })
    .catch(error => {
      this.setState(byPropKey('error',error))
    })
    event.preventDefault();
  }
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = (
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''
    )
    return (
        <form onSubmit = {this.onSubmit} className = 'sign-in-container'>

            <input
              value = {username}
              onChange = {event => this.setState(byPropKey('username', event.target.value))}
              type = 'text'
              placeholder = 'Full Name'
              className = 'input-style'
            />


          <input
            value = {email}
            onChange = {event => this.setState(byPropKey('email', event.target.value))}
            type = 'text'
            placeholder = 'Email Address'
            className = 'input-style'
          />
          <input
            value = {passwordOne}
            onChange = {event => this.setState(byPropKey('passwordOne', event.target.value))}
            type = 'password'
            placeholder = 'Password'
            className = 'input-style'
          />
          <input
            value = {passwordTwo}
            onChange = {event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type = 'password'
            placeholder = 'Confirm Password'
            className = 'input-style'
          />
          <button disabled = {isInvalid} type = 'submit' className = 'btn'>
            Register
          </button>
          {error && <p>{error.message}</p>}
        </form>

    )
  }
}

export default withRouter(SignUpPage);

export {
  SignUpForm,
};
