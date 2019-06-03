import { Component, OnInit, Input  } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { FavoritesService } from '../../services/crud/favorites.service';

@Component({
  selector: 'app-details-users',
  templateUrl: './details-users.page.html',
  styleUrls: ['./details-users.page.scss'],
})
export class DetailsUsersPage implements OnInit {

  @Input() user: any;
  isFavorite: boolean;
  favoritesList = [];

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private favoritesService: FavoritesService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    // Add correctly each favorites added
    this.favoritesService.getAllFavorites().get()
      .then((favoritesSnapshot) => {
        this.favoritesList = favoritesSnapshot.data().users;
    })
  }

  // Dismiss details page
  dismiss() { 
    this.modalCtrl.dismiss();
  }

  // Add to favorites
  async addToFavorites(user) {
    // this.favorite = !this.favorite; // Icon background favorite
    this.favoritesService.addNewRealFavorite(user, this.favoritesList);
    this.isFavorite = true;
    this.modalCtrl.dismiss();

    const toast = await this.toastController.create({
      message: 'Added to favorites',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'x',
      duration: 600
    });
    toast.present();
  }

}
