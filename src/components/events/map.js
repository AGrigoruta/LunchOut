import React from 'react';
import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls } from 'ol/control.js';
import Point from 'ol/geom/Point.js';
//import { fromLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style.js';
//import * as proj from 'ol/proj.js';

export default class Maps extends React.Component {
  render() {
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
      controls: [],
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

    function addMarker(x, y) {
      var coordinatesCenter = [x, y];
      positionFeature.setGeometry(new Point(coordinatesCenter));
    }

    geolocation.on('change:position', function () {
      var coordinates = geolocation.getPosition();
      console.log(coordinates)
      map.getView().setCenter(coordinates);
      map.getView().setZoom(12);
      //positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      addMarker(coordinates[0],coordinates[1]);
    });

    new VectorLayer({
      map: map,
      source: new VectorSource({
        features: [accuracyFeature, positionFeature]
      })
    });
    return(
      <div id="map"></div>
    )
  }
};