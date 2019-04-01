import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PeoplesService } from '../../services/peoples-service/peoples.service';
import { FavoritesService } from '../../services/crud/favorites.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // favorite: boolean = false;
  people = [];

  constructor(
    private modalCtrl: ModalController,
    private PeoplesService: PeoplesService,
    private favoritesService: FavoritesService,
    private toastController: ToastController) { 

      this.people = this.PeoplesService.getPeople();

  }

  ngOnInit() { }

  // Dismiss details page
  dismiss() { 
    this.modalCtrl.dismiss();
  }

  // Adding person to the favorites page
  // addToFavorites():void
  async addToFavorites(people) {
    // this.favorite = !this.favorite; // Icon background favorite
    console.log('Favorites button clicked !');
    this.favoritesService.addNewFavorite(people);
    this.modalCtrl.dismiss();

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
