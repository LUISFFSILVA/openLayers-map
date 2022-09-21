import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LeafetComponent } from './leafet/leafet.component';
import { LeafletModule } from '@asymmetrik//ngx-leaflet';

@NgModule({
  declarations: [AppComponent, MapComponent, LeafetComponent],
  imports: [BrowserModule, AppRoutingModule, LeafletDrawModule, LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
