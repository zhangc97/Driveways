import React from 'react';
import Modal from 'react-modal';
import SignUp from './Signup';


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
    console.log(event);
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }
  render() {
    const {isOpen} = this.state
    return (
      <div className = 'login-modal'>
        <button className = '' onClick = {this.toggleModal}>Register</button>
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
          }}>
          <SignUp />


          </Modal>
        </div>
    )
  }
}
export default Register;
