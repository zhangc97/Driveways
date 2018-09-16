import React from 'react'
import avatar from './images/stock.png'
import Modal from 'react-modal';
import SignInPage from './BaseLoginPage'
import PasswordForget from './PasswordForget'
import PasswordChange from './PasswordChange'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import {withRouter, browserHistory} from 'react-router'
import SignUp from './Signup';
import FAQSection from './FAQ'

const MODAL_A = 'modal_a';

function Selector({result}) {
  switch (result.redirect){
    case '/register':
      return  <SignUp />
    case '/sign-in':
      return <SignInPage />
    case '/FAQ':
      return <FAQSection />
    default :
      return null;
  }
}
class Credentials extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen : false, redirect: ''};
  }

  componentWillMount() {
    const appElement = document.getElementById('body')
    Modal.setAppElement('body')
  }

  toggleModal = event => {
    const { isOpen } = this.state;
    this.setState({ isOpen: true, redirect: event.currentTarget.value});

    event.preventDefault();
  }
  toggleModalClose = () => {
    if(this.state.isOpen){
      this.props.history.push('/')
    }

    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen})
  }
  render() {
    const {isOpen, redirect} = this.state

    return (
      /*<img className = 'avatar-img' src = {avatar} alt = 'Avatar' />*/
      <div className= 'nav-bar-container'>

          <button className = 'nav-btn' onClick = {this.toggleModal} value = '/register'><h3>Register</h3></button>
          <button className = 'nav-btn' onClick = {this.toggleModal} value = '/sign-in'><h3>Sign In</h3></button>
          <button className = 'nav-btn' onClick = {this.toggleModal} value = '/FAQ' ><h3>FAQ</h3></button>

        <Modal
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#0000007d',
              zIndex: 5,
            },
            content: {
              position: 'absolute',
              top: '12.5%',
              left: '33%',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fffefe',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
              width: '25%',
              height: '50%',
            }
          }}
          id = "modal_with_forms"
          isOpen = {isOpen}
          closeTimeoutMS = {150}
          contentLabel = "modalB"
          shouldCloseOnOverlayClick = {true}
          onRequestClose = {this.toggleModalClose}
          aria = {{
            labelledby: "heading",
            describedby: "fulldescription"
          }}>

            <Selector result = {this.state} />
          </Modal>

      </div>
    )
  }
}

export default withRouter(Credentials);
