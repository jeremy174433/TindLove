import { Component } from '@angular/core';
import { FavoritesService } from '../../services/favorites-crud/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage {

  favoritesList: Array<any>; // favorites list

  constructor(public favoritesService: FavoritesService) { }

  ngOnInit() {
    this.favoritesService.getFavorites();
  }

}
