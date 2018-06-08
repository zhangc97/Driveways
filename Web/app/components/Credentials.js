import React from 'react'
import avatar from './images/stock.png'
import Modal from 'react-modal';
import SignInPage from './BaseLoginPage'

const MODAL_A = 'modal_a';


class Credentials extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen : false};
  }

  componentWillMount() {
    const appElement = document.getElementById('body')
    Modal.setAppElement('body')
  }
  toggleModal = event => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }
  render() {
    const {isOpen} = this.state
    return (
      /*<img className = 'avatar-img' src = {avatar} alt = 'Avatar' />*/
      <div className = 'login-modal'>
        <button className = '' onClick = {this.toggleModal}>Sign In</button>
        <Modal
          style={{overlay: {zIndex: 1000},
                  display: 'flex',
                  flexdirection: 'column'}}
          id = "modal_with_forms"
          isOpen = {isOpen}
          closeTimeoutMS = {150}
          contentLabel = "modalB"
          shouldCloseOnOverlayClick = {true}
          onRequestClose = {this.toggleModal}
          aria = {{
            labelledby: "heading",
            describedby: "fulldescription"
          }}
          >
            <SignInPage />
          </Modal>

      </div>
    )
  }
}

export default Credentials;
