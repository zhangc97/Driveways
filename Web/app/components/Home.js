import React from 'react'
import MapDisplay from './Map'
import { connect } from 'react-redux';
import { compose } from 'recompose'
import withAuthorization from './withAuthorization';

class Home extends React.Component {
  render() {
    return(
      <div className = 'home-container'>
          <MapDisplay />
        <div className = 'info-container'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget rhoncus mi. In hac habitasse platea dictumst. Sed a ullamcorper sapien. Maecenas dui nunc,
          interdum eget elementum sit amet, sollicitudin non dolor.
          Etiam placerat volutpat nunc et vehicula. Vestibulum rhoncus est orci,
          eu viverra diam auctor pulvinar. Suspendisse id semper elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          Morbi sed urna molestie, consequat velit sed, rutrum eros.
        </div>
      </div>
    )
  }
}


//const authCondition = (authUser) => !!authUser;

//export default withAuthorization(authCondition)(Home);
export default Home;
