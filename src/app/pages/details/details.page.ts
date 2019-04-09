import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { PeoplesService } from '../../services/peoples-service/peoples.service';
import { FavoritesService } from '../../services/crud/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  isFavorite: boolean;
  people = [];
  favoritesList = [];

  constructor(
    private modalCtrl: ModalController,
    private peoplesService: PeoplesService,
    private favoritesService: FavoritesService,
    private toastController: ToastController) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.people = this.peoplesService.getPeople();
      this.favoritesService.getAllFavorites().get()
      .then((favoritesSnapshot) => {
        this.favoritesList = favoritesSnapshot.data().peoples;
    })
  }

  // Dismiss details page
  dismiss() { 
    this.modalCtrl.dismiss();
  }

  // Adding person to the favorites page
  // addToFavorites():void
  async addToFavorites(people) {
    // this.favorite = !this.favorite; // Icon background favorite
    console.log('Favorites button clicked !');
    this.favoritesService.addNewFavorite(people, this.favoritesList);
    this.isFavorite = true;
    // this.modalCtrl.dismiss();

    const toast = await this.toastController.create({
      message: 'Added to favorites',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'x',
      duration: 2000
    });
    toast.present();
  }

}
