import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: 'char-match',
        loadComponent: () =>
            import('./views/char-match/char-match.component').then(
                (m) => m.CharMatchComponent
            ),
    },
    {
        path: 'contains-match',
        loadComponent: () =>
            import('./views/contains-match/contains-match.component').then(
                (m) => m.ContainsMatchComponent
            ),
    },
    {
        path: 'words-match',
        loadComponent: () =>
            import('./views/words-match/words-match.component').then(
                (m) => m.WordsMatchComponent
            ),
    },
    {
        path: '',
        redirectTo: 'char-match',
        pathMatch: 'full',
    },
];
