import { Component } from '@angular/core';
import { SuggestionComponent } from '../suggestion/suggestion.component';
import { FilmsComponent } from '../films/films.component';
import { FavoriteActorsComponent } from '../favorite-actors/favorite-actors.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SuggestionComponent,
    FilmsComponent,
    FavoriteActorsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
}
