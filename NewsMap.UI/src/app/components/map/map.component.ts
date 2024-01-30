/* import { Component, AfterViewInit } from '@angular/core';

import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    const map = L.map('map').setView([49.0275, 31.4828], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 6,
      maxZoom: 6,

      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Додайте обробник кліків на карту
    map.on('click', this.onMapClick.bind(this));
  }

  private onMapClick(e: any): void {
    // Тут ви можете додати код для переходу на іншу сторінку Angular
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // Перевірка, чи знаходиться точка всередині меж України
    if (this.isInsideUkraine(lat, lng)) {
      // Відкрити посилання у новому вікні
      window.open('https://translate.google.com/?hl=ru', '_blank');
    }
    console.log(e.latlng); // Приклад виведення координат кліку в консоль
  }
  private isInsideUkraine(lat: number, lng: number): boolean {
    // Географічні координати кордону України
    const ukraineBorder: L.LatLngExpression[] = [
      [51.505, 24.5],
      [51.505, 40.15],
      [45.35, 40.15],
      [45.35, 22.2],
      [48.7, 22.2],
      [48.7, 26.6],
      [47.4, 26.6],
      [47.4, 24.5],
      [51.505, 24.5],
    ];

    // Створення полігону, що представляє кордон України
    const ukrainePolygon = L.polygon(ukraineBorder);

    // Перевірка, чи знаходиться точка на кордоні України
    return ukrainePolygon.getBounds().contains([lat, lng]);
  }
}
 */
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as topojson from 'topojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: any;
  regionsDataUri = '../../../assets/data/regionsData.json';
  regionsCoordinatesUri = '../../../assets/data/regionsCoordinates.topojson';
  initialCoordinates = [48.47, 31.39];
  initialScale = 6;

  constructor() {}

  ngOnInit(): void {
    this.loadJSON(this.regionsDataUri, (s: string) => {
      const regionsData = JSON.parse(s);
      this.loadJSON(this.regionsCoordinatesUri, (topoJsonString: string) => {
        const regionsCoordinates = JSON.parse(topoJsonString);
        const features = topojson.feature(
          regionsCoordinates,
          regionsCoordinates.objects.regionsCoordinates
        );

        this.initializeMap();
        this.addTileLayer();
        this.addGeoJsonLayer(features, regionsData);
      });
    });
  }

  loadJSON(uri: string, callback: (response: string) => void): void {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', uri, true);
    xobj.send(null);

    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == 200) {
        callback(xobj.responseText);
      }
    };
  }

  initializeMap(): void {
    this.map = L.map('map').setView([49.0275, 31.4828], 6);
  }

  addTileLayer(): void {
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
      id: 'shevchuk.i8eh460b',
      maxZoom: 6.5,
      minZoom: 6.5,
    }).addTo(this.map);
  }

  addGeoJsonLayer(features: any, regionsData: any): void {
    const grp = Object.keys(regionsData).map(
      (regionId) => regionsData[regionId].grp
    );
    const grpMin = Math.min(...grp);
    const grpMax = Math.max(...grp);

    const style = (feature: any) => {
      const regionId = feature.properties.iso_3166_2;
      const region = regionsData[regionId];
      const fillOpacity = region.grp / grpMax;

      return {
        color: '#fff',
        opacity: 1,
        weight: 1,
        fillColor: '#000',
        fillOpacity: fillOpacity,
      };
    };

    const highlightFeature = (e: any) => {
      const layer = e.target;

      layer.setStyle({
        weight: 2,
        color: '#ff4',
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }
    };

    const resetHighlight = (e: any) => {
      geojson.resetStyle(e.target);
    };

    const onEachFeature = (feature: any, layer: any) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      });
    };

    const geojson = L.geoJson(features, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(this.map);
  }
}
