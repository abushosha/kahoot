import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    loadComponent: () => import('./pages/list-countries/list-countries.component').then(m => m.ListCountriesComponent)
  },
  {
    path: 'countries/:code',
    loadComponent: () => import('./pages/country-view/country-view.component').then(m => m.CountryViewComponent)
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
