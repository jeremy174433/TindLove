import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  // Dismiss details page
  dismiss() { this.modalCtrl.dismiss(); }

  // Adding person to the favorites page
  addToFavorites() {
    console.log('Favorites button clicked !');
  }

}
