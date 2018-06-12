//Mapbox key : pk.eyJ1IjoiemhhbmdjMTYiLCJhIjoiY2pocXQ4YWpuNGhyNzNkbmd4bmp0NXI3biJ9.YtbhiD-q1KoaRK4uf-9Q6w
import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import { db } from '../firebase'
import icon from './images/stock.png'

const withinRange = (searched, database) => (
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
      dbcoordinates: [],
      loading: true
    }
  }


  componentWillMount() {
    db.onceGetCoords().then(snapshot =>
      this.setState(()=> ({ dbcoordinates: snapshot.val(), loading: false}))
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

  }



  render() {
    //console.log(this.state.coordinates);
    /*if (this.state.loading === false) {
      Object.keys(this.state.coordinates).map((data) => (
        console.log(this.state.coordinates[data])
      ))
    }*/


    if(this.state.loading === false) {
      var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
      });
      var object = this.refs.geocoder;
      object.appendChild(geocoder.onAdd(this.map));


      geocoder.on('result', function(ev) {
        Object.keys(this.state.dbcoordinates).map(function(data) {
          if(withinRange(ev.result.center, this.state.dbcoordinates[data]) === true ){
            displaycoords.push(this.state.dbcoordinates[data]);
            //console.log(this.state.dbcoordinates[data]);
          }

        }.bind(this));
        //add Map layer here and done
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



    const style = {
      height: "100%",
      width: "75vw",
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
    };


    //document.getElementById('geocoder').appendChild(geocoder.onAdd(this.map));
    return (
      <div style = {mapstyle} >
        <div style = {style} ref = {el => this.mapContainer = el} >
          <div ref = 'geocoder' style = {geocoderStyle} ></div>
        </div>
      </div>


    )
  }
}

export default MapDisplay;
