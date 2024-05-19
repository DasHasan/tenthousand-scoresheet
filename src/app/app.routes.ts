import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'setup',
        loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent)
    },
    {
        path: 'game',
        loadComponent: () => import('./game/game.component').then(m => m.GameComponent)
    }
];
