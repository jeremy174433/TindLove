import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // favorite: boolean = false;
  
  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController) { }

  ngOnInit() { }

  // Dismiss details page
  dismiss() { 
    this.modalCtrl.dismiss();
  }

  // Adding person to the favorites page
  // addToFavorites():void
  async addToFavorites() {
    // this.favorite = !this.favorite; // Icon background favorite
    console.log('Favorites button clicked !');

    
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
