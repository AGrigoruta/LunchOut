// import 'ol/ol.css';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';

// var lng;
// var lat;

// const map = new Map({
//   projection: 'EPSG:25832',
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new OSM()
//     })
//   ],
//   view: new View({
//     center: [47, 27],
//     zoom: 13
//   })
// });

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     // lat = Promise.resolve(position.coords.latitude);
//     // lng = Promise.resolve(position.coords.longitude);
//     // Promise.all([lat, lng]).then((res) => {
//     //   console.log(res);
//     //   var degrees2meters = function (lon, lat) {
//     //     var x = lon * 20037508.34 / 180;
//     //     var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
//     //     y = y * 20037508.34 / 180;
//     //     return [x, y]
//     //   }
//     // })
//     console.log(position)
//     // map.getView().setCenter(ol.proj.transform([position.coords.longitude, position.coords.latitude]));
//     // map.getView().setZoom(5);
//   })
// }

import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls } from 'ol/control.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style.js';
import * as proj from 'ol/proj.js';

var view = new View({
  center: [0, 0],
  maxZoom: 20,
  minZoom: 0
});

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  controls: defaultControls({
    attributionOptions: {
      collapsible: false
    }
  }),
  view: view
});

var geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: view.getProjection()
});


geolocation.setTracking(true);



// handle geolocation error.
geolocation.on('error', function (error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});

var accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new Feature();
positionFeature.setStyle(new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#3399CC'
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function () {
  var coordinates = geolocation.getPosition();
  console.log(coordinates)
  map.getView().setCenter(coordinates);
  map.getView().setZoom(12);
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
  var coordinatesCenter = [0,0]
  positionFeature.setGeometry(coordinatesCenter ? new Point(coordinatesCenter) : null);
});


new VectorLayer({
  map: map,
  source: new VectorSource({
    features: [accuracyFeature, positionFeature]
  })
});
