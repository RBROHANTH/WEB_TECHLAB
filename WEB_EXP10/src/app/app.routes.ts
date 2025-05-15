import { Routes } from '@angular/router';
import { CowsComponent } from './components/cows/cows.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cows', pathMatch: 'full' },
    { path: 'cows', component: CowsComponent },
    { path: '**', redirectTo: '/cows' }
];
