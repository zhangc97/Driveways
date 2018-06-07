import React from 'react'
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import AuthUserContext from './AuthUserContext';
import * as routes from '../constants/routes';
import {auth} from '../firebase/firebase';

const SignInPage = ({history}) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history = {history} />
  </div>
)
const nextPath = (path) => {
    this.props.history.push(path);
  }
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})
const INITIAL_STATE = {
  email : '',
  password: '',
  error: null,
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {INITIAL_STATE};

  }
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;
    const {
      history,
    } = this.props;
    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({INITIAL_STATE}));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
      event.preventDefault();
  }
  render() {
    const {
      email,
      password,
      error,
    } = this.state;
    const isInvalid = (
      password === '' ||
      email === ''
    )
    return (
        <form onSubmit = {this.onSubmit}  className = 'sign-in-container'>
          <input
            value = {email}
            onChange = {event => this.setState(byPropKey('email', event.target.value))}
            type = 'text'
            placeholder = 'Email Address'
          />
          <input
            value = {password}
            onChange = {event => this.setState(byPropKey('password', event.target.value))}
            type = 'password'
            placeholder = 'Password'
          />
          <button disables = {isInvalid} type = 'submit'>
            Sign In
          </button>
          { error && <p>{error.message}</p>}
        </form>
    );
  }
}

export default withRouter(SignInPage);
export {
  SignInForm
};
