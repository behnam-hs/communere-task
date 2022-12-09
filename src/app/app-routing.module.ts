import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'locations'
  },
  {
    path: 'locations',
    children: [
      {
        path: '',
        component: LocationsListComponent
      },
      {
        path: 'create',
        component: FormComponent
      },
      {
        path: ':id/edit',
        component: FormComponent
      }    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
