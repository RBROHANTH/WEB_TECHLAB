import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CowsComponent } from './components/cows/cows.component';
import { GoatsComponent } from './components/goats/goats.component';
import { PoultryComponent } from './components/poultry/poultry.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cows', component: CowsComponent },
  { path: 'goats', component: GoatsComponent},
  { path: 'poultry', component: PoultryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
