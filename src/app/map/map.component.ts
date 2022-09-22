import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import { OSM, Vector, XYZ } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj.js';
import Layer from 'ol/layer/Layer';
import {
  Group,
  Group as LayerGroup,
  Tile as TileLayer,
  VectorImage,
} from 'ol/layer';
import VectorImageLayer from 'ol/layer/VectorImage';
import GeoJSON from 'ol/format/GeoJSON';
import { format } from 'ol/coordinate';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import Circle from 'ol/geom/Circle';
import { defaultFillStyle } from 'ol/render/canvas';
import Overlay from 'ol/Overlay';

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
        projection: 'EPSG:3857',
        // rotation: 0.5,
      }),
    });
    //pegar as coordenadas de onde eu clicar /********************************* */
    this.map.on('click', (e: any) => {
      console.log(e.coordinate);
    });

    const openStreetMapStandard = new Tile({
      source: new OSM(),
      visible: true,
      zIndex: 0,
      // title: 'OSMStandard'
    });

    const openStreetmapHumanitarian = new Tile({
      source: new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      }),
      visible: false,
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

    //Layer Group  /********************************************************************* */
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
      baseLayerElement.addEventListener('change', (e: any) => {
        // console.log(e.target.value);
        let baseLayerElementValue = e.target.value;
        baseLayerGroup.getLayers().forEach((element, index, array) => {
          let baseLayerIndex = element.get('zIndex');
          element.setVisible(baseLayerIndex == baseLayerElementValue);
          // console.log(
          //   'baseLayerIndex' + baseLayerIndex,
          //   'baseLayerElementValue' + baseLayerElementValue
          // );
          // console.log(baseLayerIndex == baseLayerElementValue);
          // console.log(element.get('zIndex'), element.get('visible'));
        });
      });
    }

    //Vector Layers /************************************************************* */
    const fillStyle = new Fill({
      color: [84, 118, 255, 1],
    });

    const strokeStyle = new Stroke({
      color: [46, 45, 45, 1],
      width: 1.2,
    });

    const circleStyle = new CircleStyle({
      fill: new Fill({
        color: [245, 49, 5, 1],
      }),
      radius: 7,
      stroke: strokeStyle,
    });

    const UFBrasilGeoJSON = new VectorImage({
      source: new Vector({
        url: 'assets/data/vector_data/UFBrasil.geojson',
        format: new GeoJSON(),
      }),
      visible: true,
      zIndex: 1,
      style: new Style({
        fill: fillStyle,
        stroke: strokeStyle,
        image: circleStyle,
      }),
    });

    this.map.addLayer(UFBrasilGeoJSON);

    // Vector Feature Popup Logic   /************************************* */
    const overlayContainerElement =
      document.querySelector('.overlay-container');
    const overlayLayer = new Overlay({
      element: overlayContainerElement as HTMLElement,
    });

    this.map.addOverlay(overlayLayer);
    const overlayFeatureName = document.getElementById('feature-name');
    const overlayFeatureAdditionalInfo = document.getElementById(
      'feature-additional-info'
    );

    this.map.on('click', (e: any) => {
      overlayLayer.setPosition(undefined); //apagar o popup
      this.map.forEachFeatureAtPixel(
        e.pixel,
        (feature: any, layer: any) => {
          let clickedCoordinate = e.coordinate;
          let clickedFeatureName = feature.get('name');
          let clickedFeatureAdditionalInfo = feature.get('additionalinfo');
          overlayLayer.setPosition(clickedCoordinate);
          overlayFeatureName!.innerHTML = clickedFeatureName;
          overlayFeatureAdditionalInfo!.innerHTML =
            clickedFeatureAdditionalInfo;
        },
        {
          layerFilter: function (layerCandidate: any) {
            return layerCandidate.get('zIndex') == 1;
          },
        }
      );
    });
  }
}

688952;
