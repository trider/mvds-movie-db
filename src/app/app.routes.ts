import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
 { path: '', redirectTo: '/movies', pathMatch: 'full' },
 { path: 'movies', component: MoviesComponent },
 { path: 'movie/:id', component: MovieDetailsComponent }
 
];
