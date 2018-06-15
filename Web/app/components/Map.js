//Mapbox key : pk.eyJ1IjoiemhhbmdjMTYiLCJhIjoiY2pocXQ4YWpuNGhyNzNkbmd4bmp0NXI3biJ9.YtbhiD-q1KoaRK4uf-9Q6w
import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { db } from '../firebase'
import icon from './images/stock.png'
import LocationProfile from '../utils/LocationProfile'
import ResultSection from './ListingResults'
//Park Whiz Api key: 4d67353220071845681dada0140330c14df5b394
export const withinRange = (searched, database) => (
    (Math.abs(searched[0] - database[0]) <= 0.2 &&
    Math.abs(searched[1] - database[1]) <= 0.2)
)
var displaycoords = [];
var mapui;

function geoJsonArray(coords){
  var arrayGeoJson = []

  coords.map(function(data){
    var myGeoJson = {};
    myGeoJson.type = "Feature"
    myGeoJson.geometry = {
      "type": "Point",
      "coordinates": data,
    }
    myGeoJson.properties = {
      "description": "123",
    }
    arrayGeoJson.push(myGeoJson)
  })

  return (
    arrayGeoJson
  )
}

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbResults: [],
      loading: true,
      withinRangeResults: []
    }
  }


  componentWillMount() {
    db.onceGetCoords().then(snapshot =>
      this.setState(()=> ({ dbResults: snapshot.val(), loading: false}))
      //console.log(snapshot.val())
    );


  }
  componentWillUnmount() {
    this.map.remove();
  }
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdjMTYiLCJhIjoiY2pocXQ4YWpuNGhyNzNkbmd4bmp0NXI3biJ9.YtbhiD-q1KoaRK4uf-9Q6w';
     this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    this.map.loadImage(icon, function( error, image){
      //if (error) throw error;
      this.map.addImage('resultIcon', image);

    }.bind(this))
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });
    var object = this.refs.geocoder;
    object.appendChild(geocoder.onAdd(this.map));


    geocoder.on('result', function(ev) {
      this.setState({
        childcoords: [ev.result.center],
      })
      this.map.getLayer(function(layer){
        this.map.removeLayer(layer);
      }.bind(this))
      Object.keys(this.state.dbResults).map(function(data) {
        if(withinRange(ev.result.center, this.state.dbResults[data].center) === true ){
          displaycoords.push(this.state.dbResults[data].center);
          this.setState({
            withinRangeResults: [...this.state.withinRangeResults, this.state.dbResults[data]],
          })
          this.state.dbResults[data].IdKey = data;
        }

      }.bind(this));
      //add Map layer here and done
      //LocationProfile.setLocation(ev.result.center);
      //need to add state and diff id for layer
      this.map.addLayer({
         "id": "points",
         "type": "circle",
         "source": {
             "type": "geojson",
             "data": {
                 "type": "FeatureCollection",
                 "features": geoJsonArray(displaycoords)
             }
         },
         "paint": {
             "circle-radius" : 10,
             "circle-color": "#007cbf"
         }
     });
     //console.log(displaycoords);
   }.bind(this))
  }



  render() {
    const style = {
      height: "100%",
      width: "75%",
    };
    const geocoderStyle = {
        position: 'absolute',
        width: '50%',
        padding: '1%',
        zIndex: '5',

    };

    const mapstyle = {
      flexdirection: 'row',
      display:'flex',
      width: '100%'
    };
    //send via state boolean to refresh

    //document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
    return (
      <div style = {mapstyle} >
        <div style = {style} ref = {el => this.mapContainer = el} >
          <div ref = 'geocoder' style = {geocoderStyle} />
        </div>
        <div className = 'info-container'>
          <ResultSection results = {this.state.withinRangeResults} />
        </div>
      </div>


    )
  }
}

export default MapDisplay;
