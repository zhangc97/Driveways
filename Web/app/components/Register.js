import React from 'react';
import Modal from 'react-modal';
import SignUp from './Signup';
import { Link, withRouter} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen : false};
  }

  componentWillMount() {
    const appElement = document.getElementById('body')
    Modal.setAppElement('body')
  }
  toggleModal = event => {
    if(this.state.isOpen){
      this.props.history.push('/')
    }
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }
  render() {
    const {isOpen} = this.state
    return (
      <div className = 'login-modal'>
        <Link className = 'nav-btn' onClick = {this.toggleModal} to = '/register'>Register</Link>
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
              width: '30%',
              height: '50%',


            }
          }}
          id = "modal_with_forms"
          isOpen = {isOpen}
          closeTimeoutMS = {150}
          contentLabel = "modalB"
          shouldCloseOnOverlayClick = {true}
          onRequestClose = {this.toggleModal}
          aria = {{
            labelledby: "heading",
            describedby: "fulldescription"
          }}>
            <Route exact path = '/register' component = {SignUp} />



          </Modal>
        </div>
    )
  }
}
export default withRouter(Register);
