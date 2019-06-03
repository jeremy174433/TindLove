import { Component, OnInit, Input  } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-users',
  templateUrl: './details-users.page.html',
  styleUrls: ['./details-users.page.scss'],
})
export class DetailsUsersPage implements OnInit {

  @Input() user: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  // Dismiss details page
  dismiss() { 
    this.modalCtrl.dismiss();
  }

  // Add to favorites
  addToFavorites() {
    console.log('Add to favorites');
  }

}
