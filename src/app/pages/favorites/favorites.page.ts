import { Component } from '@angular/core';
import { FavoritesService } from '../../services/crud/favorites.service';

import 'firebase/firestore';


@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage {

  data: boolean;
  favoritesList = [];

  constructor(
    private favoritesService: FavoritesService) { }

  ngOnInit() { }

  // Get favorites list
  ionViewWillEnter() {
    this.data = true;
    this.favoritesService.getAllFavorites().get().then((favoritesSnapshot) => {
      this.favoritesList = favoritesSnapshot.data().peoples;
      return this.favoritesList.reverse();
    })
    .catch((err) => {
      this.data = false;
    });
  }

  // Delete people
  deletePeople(people) {
    console.log('delete people');
  }

}
