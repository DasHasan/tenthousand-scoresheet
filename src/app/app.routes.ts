import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: 'player-creation',
        loadChildren: () => import('./pages/player-creation/player-creation.component').then(m => m.PlayerCreationComponent)
    },
    {
        path: '',
        redirectTo: 'player-creation',
        pathMatch: 'full'
    }
];
