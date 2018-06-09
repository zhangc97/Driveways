//Mapbox key : pk.eyJ1IjoiemhhbmdjMTYiLCJhIjoiY2pocXQ4YWpuNGhyNzNkbmd4bmp0NXI3biJ9.YtbhiD-q1KoaRK4uf-9Q6w
import React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'



class MapDisplay extends React.Component {

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdjMTYiLCJhIjoiY2pocXQ4YWpuNGhyNzNkbmd4bmp0NXI3biJ9.YtbhiD-q1KoaRK4uf-9Q6w';
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    });
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
    //this.map.addControl(geocoder);
    var object = this.refs.geocoder;
    object.appendChild(geocoder.onAdd(this.map));
    this.map.on('load', () => {
      var map = this.map;
      this.map.addSource('single-point', {
        "type" : "geojson",
        "data": {
          "type": "FeatureCollection",
          "features" : []
        }
      });

      this.map.addLayer({
        "id": "point",
        "source": "single-point",
        "type" : "circle",
        "paint" : {
          "circle-radius" : 10,
          "circle-color": "#007cbf"
        }
      });
      geocoder.on('result', function (ev) {
        console.log(ev);
        map.getSource('single-point').setData(ev.result.geometry);    
      })
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {

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
