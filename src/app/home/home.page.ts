import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation,Position } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Pega a div do html e coloca ela na variável mapRef
  @ViewChild('map') mapRef!: ElementRef;

  //Cria uma variavel para o Maps
  map!: google.maps.Map;

  constructor() {}

    async exibirMapa(){
       // The location of Uluru
  const position = { lat: -5.473844, lng: -45.568046 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  

  // The map, centered at Uluru
  this.map = new Map(
    this.mapRef.nativeElement,
    {
      zoom: 4,
      center: position,
      mapId: 'DEMO_MAP_ID',
    }
  );

  this.buscarLocalizacao();
   
}  

    ionViewWillEnter(){
      this.exibirMapa();
    }
    async buscarLocalizacao(){
      const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy:true});
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      console.log('Current position:', coordinates);
      this.map.setCenter({lat:coordinates.coords.latitude,
      lng:coordinates.coords.longitude});

      this.map.setZoom(18);
      this.adicionarMarcador(coordinates);

      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat:coordinates.coords.latitude,
          lng:coordinates.coords.longitude
        },
        title: 'Minha Localização'
      });
    }
  async  adicionarMarcador(position:Position){
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: {lat:position.coords.latitude,
          lng:position.coords.longitude
      },
        title: 'Marcador'
    });

  }
}
