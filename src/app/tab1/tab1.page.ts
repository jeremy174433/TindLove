import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PeoplesService } from '../services/peoples-service/peoples.service';
import { DetailsPage } from '../pages/details/details.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [PeoplesService]
})
export class Tab1Page {

  peoples = [];

  constructor(
    private PeoplesService: PeoplesService,
    public modalCtrl: ModalController) { }

  ngOnInit() {
    // Call API
    this.PeoplesService.getPeoples()
    .subscribe(
      (data) => {
        // Success
        this.peoples = data['results'];
      },
      (error) => {
        console.error(error);
      }
    ).unsubscribe;
  }

  // Display details page modal
  async DetailsPeople(people) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { people: people }
    });
    return await modal.present();
  }

}


