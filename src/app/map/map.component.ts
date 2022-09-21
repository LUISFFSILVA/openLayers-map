import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import { OSM, XYZ } from 'ol/source';
import { fromLonLat } from 'ol/proj.js';
import Layer from 'ol/layer/Layer';
import { Group, Group as LayerGroup, Tile as TileLayer } from 'ol/layer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.initilizeMap();
  }

  initilizeMap() {
    this.map = new Map({
      target: 'map',
      // controls: [],
      view: new View({
        center: [-5182189.112945075, -2717804.3312814706],
        // center: [0, 0],
        zoom: 3,
        maxZoom: 18,
        minZoom: 1,
        // rotation: 0.5,
      }),
    });
    //pegar as coordenadas de onde eu clicar
    this.map.on('click', (e: any) => {
      console.log(e.coordinate);
    });

    const openStreetMapStandard = new Tile({
      source: new OSM(),
      visible: false,
      zIndex: 0,
      // title: 'OSMStandard'
    });

    const openStreetmapHumanitarian = new Tile({
      source: new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      }),
      visible: true,
      zIndex: 1,
      // title: 'OSMHumanitarian',
    });

    const stamenTerrain = new Tile({
      source: new XYZ({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
        attributions:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under',
      }),
      visible: false,
      zIndex: 2,
      // title: 'StamenTerrain'
    });

    //Layer Group
    const baseLayerGroup = new Group({
      layers: [openStreetMapStandard, openStreetmapHumanitarian, stamenTerrain],
    });
    this.map.addLayer(baseLayerGroup);

    //Layer Switcher Logic for Basemaps
    const baseLayerElements = document.querySelectorAll(
      '.sidebar > input[type=radio]'
    );
    // console.log(baseLayerElements);
    for (let baseLayerElement of baseLayerElements) {
      baseLayerElement.addEventListener('change', () => {
        console.log();
      });
    }
  }
}
