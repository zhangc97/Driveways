import React from 'react'
import MapDisplay from './Map'
import { connect } from 'react-redux';
import { compose } from 'recompose'
import withAuthorization from '../utils/withAuthorization';
import ResultSection from './ListingResults'

class Home extends React.Component {
  render() {
    return(
      <div className = 'home-container'>
          <MapDisplay />
        <div className = 'info-container'>
          <ResultSection />
        </div>
      </div>
    )
  }
}


//const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(Home);
export default Home;
