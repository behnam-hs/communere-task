import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { ListPaginatorComponent } from './components/list-paginator/list-paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MapComponent,
    HeaderComponent,
    LocationsListComponent,
    ListPaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
