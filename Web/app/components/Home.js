import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose'
import withAuthorization from '../utils/withAuthorization';
import ResultSection from './ListingResults'
import Map from './Map';

class Home extends React.Component {
  render() {
    return(
      <div className = 'home-container'>
          <Map />

      </div>
    )
  }
}


//const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(Home);
export default Home;
