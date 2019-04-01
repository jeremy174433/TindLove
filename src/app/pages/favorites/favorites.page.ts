import { Component } from '@angular/core';
import { FavoritesService } from '../../services/crud/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage {

  favoritesList = [];

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() { }

  ionViewWillEnter() { 
    this.favoritesService.getAllFavorites().get().then((favoritesSnapshot) => {
      this.favoritesList = favoritesSnapshot.data().peoples;
    });
  }

}
