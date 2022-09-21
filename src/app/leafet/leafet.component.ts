import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { circle, latLng, polygon, tileLayer } from 'leaflet';
import Map from 'ol/Map';

@Component({
  selector: 'app-leafet',
  templateUrl: './leafet.component.html',
  styleUrls: ['./leafet.component.scss'],
})
export class LeafetComponent implements OnInit {
  coordinateModel: any;

  constructor() {}

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }),
    ],
    zoom: 4,
    center: latLng(-23.9048854, -46.2644216),
  };

  layersControl = {
    baseLayers: {
      // 'Open Street Map': tileLayer(
      //   'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      //   { maxZoom: 18, attribution: '...' }
      // ),
      // 'Open Cycle Map': tileLayer(
      //   'http://{s}.tile.opencyclemap.org/{z}/{x}/{y}.png',
      //   { maxZoom: 18, attribution: '...' }
      // ),
    },
    overlays: {
      'Big Circle': circle([-23.688934389231584, -46.54258821798811], {
        radius: 500,
      }),
      'Big Square': polygon([
        [-23.9048854, -46.2644216],
        [-23.7048854, -46.2644216],
        [-23.7048854, -46.4644216],
        [-23.9048854, -46.4644216],
      ]),
    },
  };

  drawOptions = {
    position: 'topleft',
    draw: {
      marker: {
        icon: L.icon({
          iconSize: [40, 50],
          iconAnchor: [50, 80],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      },
      polyline: false,
      circle: {
        shapeOptions: {
          color: '#aaaaaa',
        },
      },
    },
  };

  //    onMapReady(map:Map){
  //   map.on('draw:created', (e: any) => {
  //     const type = (e as any).layerType,
  //       layer = (e as any).layer;

  //     if (type === 'polygon') {
  //       let polygonCoordinates = layer._latlngs;
  //       this.coordinateModel.coordinates = [];
  //       this.coordinateModel.coordinates = polygonCoordinates[0] ;
  //       this.coordinateModel.geoFenceMode = 'POLYGON';

  //     }
  //   }
  // }

  ngOnInit(): void {}
}
