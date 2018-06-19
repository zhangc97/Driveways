import React, {Component} from 'react';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react';
import { db } from '../firebase'
import ResultSection from './ListingResults'
import $ from 'jquery'

//AIzaSyAcTBusDrvdVgj-PGIqcvhNwBwhjZqwG-k google api
export const withinRange = (searched, database) => (
    (Math.abs(searched[0] - database[0]) <= 0.2 &&
    Math.abs(searched[1] - database[1]) <= 0.2)
)


var displaycoords = [];
var withinRangeResults =[];
class Contents extends Component {
  constructor(props){
    super(props);
    this.state = {
      position: null,
      loading: true,
      zoom: 15
    }


  }



  componentWillMount() {
    db.onceGetCoords().then(snapshot =>
      this.setState(()=> ({ dbResults: snapshot.val()}))
      //console.log(snapshot.val())
    );

  }


  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }
  markerClick(e) {
    console.log('clicked');
  }

  renderAutoComplete() {

    const { google, map } = this.props;
    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    google.maps.event.addListener(map,'bounds_changed', function() {
      autocomplete.bindTo('bounds', map);
    });
    //autocomplete.bindTo();

    autocomplete.addListener('place_changed', () => {
      $(".pac-container").remove();
      const place = autocomplete.getPlace();
      var markerPosition = [];
      //console.log(map.getBounds());
      if (!place.geometry) return;

      if (place.geometry.viewport) {
        //console.log(place.geometry.viewport);

        map.fitBounds(place.geometry.viewport);
        map.setCenter(place.geometry.location);
      } else {
        map.setCenter(place.geometry.location);

      }
    //  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
      const request = {
        location: place.geometry.location,
        radius: 3000,
        type: ['parking']
      }
      const callback = (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.map((data) => (
            markerPosition.push(data)
          ))
        }
        this.setState({loading: false, zoom: 16})
      }
      const service = new google.maps.places.PlacesService(map);
      //console.log(service.nearbySearch(request, callback)) //error because map has not loaded yet, typical, need to fix
      //add a api call here for Places closes to place.geometry.location
      service.nearbySearch(request, callback)


      this.props.map.setCenter(place.geometry.location);
      this.setState({ position: place.geometry.location, markerPos: markerPosition });
    });


  }
//<Marker position = {data.geometry.location} key = {data.geometry.reference}/>
  render() {
    //position.lat() to get latitude

    if(this.state.position === null && this.props.map) {
      navigator.geolocation.getCurrentPosition(function(result) {
          this.props.map.setCenter(new google.maps.LatLng(result.coords.latitude, result.coords.longitude))
      }.bind(this))
    } else if(this.state.loading === false ){
      this.props.map.setCenter(this.state.position)
    }
    const { position, loading,  markerPos, zoom } = this.state;
    withinRangeResults = markerPos
    //console.log(this.state);
    return (
      <div className = 'map'>
        <div className = 'geocoder-style-container' >
          <form onSubmit={this.onSubmit} className = "geocoder-form" >
            <input
              placeholder="Enter a Location"
              ref={ref => (this.autocomplete = ref)}
              type="text"
              className = 'location-input'
            />

          <input  type="submit" value="Go" className = 'go-btn' />
          </form>
        </div>

        <div >
          <Map
            {...this.props}
            zoom = {zoom}
            mapTypeControl = {false}
            fullscreenControl = {false}
            center={position}
            centerAroundCurrentLocation={true}
            containerStyle={{
              height: '93vh',
              position: 'relative',
              width: '75vw'
            }}>
            <Marker position={position} onClick = {this.markerClick} />
            {(!this.state.loading)
              ? markerPos.map((data, index) => (
                  <Marker position = {data.geometry.location} key = {index} />
              )): null}
          </Map>
        </div>
        <div className = 'info-container'>
          <ResultSection result = {withinRangeResults} />
        </div>
      </div>
    );
  }
}



const MapWrapper = props => (
  <Map className="map" google={props.google} visible={false} >
    <Contents {...props}  />
  </Map>
);
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCL7GLKUCWcApbK_5-j3Ry9rMRGVspVA2s',
})(MapWrapper)
