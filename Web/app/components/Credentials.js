import React from 'react'
import avatar from './images/stock.png'

class Credentials extends React.Component {
  render() {
    return (
      <img className = 'avatar-img' src = {avatar} alt = 'Avatar' />
    )
  }
}

export default Credentials;
