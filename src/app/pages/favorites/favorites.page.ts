import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  peopleList = []

  constructor(
    private alertCtrl: AlertController,
    private favoritesService: FavoritesService) { }

  ngOnInit() { }

  // Get favorites list
  ionViewWillEnter() {
    this.data = true;
    this.favoritesService.getAllFavorites().get()
    .then((favoritesSnapshot) => {
      this.favoritesList = favoritesSnapshot.data().peoples;
      return this.favoritesList.reverse();
    })
    .catch(() => {
      this.data = false;
    });
  }

  // Delete people
  async deletePeople(people): Promise<void>  {
    const alert = await this.alertCtrl.create({
      message: 'Do you really want to delete this from your favorites list ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.favoritesService.deleteOneFavorite(people)
            .then((res) => {
              this.favoritesList = res.reverse();
            })
            .catch((err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Delete all peoples
  async deleteAllPeoples(): Promise<void> {

    const alert = await this.alertCtrl.create({
      header: 'WARNING 💣',
      message: 'Do you really want to delete all the favorites from your list ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.favoritesService.deleteAll()
            .then((res) => {
              this.favoritesList = res;
            })
            .catch((err) => {
              console.log(err);
            });
          }
        }
      ]
    });
    await alert.present();
  }
  
}
