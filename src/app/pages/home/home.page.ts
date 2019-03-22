import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PeoplesService } from '../../services/peoples-service/peoples.service';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [PeoplesService]
})
export class HomePage {

  peoples = [];

  constructor(
    private PeoplesService: PeoplesService,
    public modalCtrl: ModalController) { 
      this.DisplayData();
    }

  ngOnInit() { }

  DisplayData() {
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

  // Pull to refresh
  doRefresh(event) {
    setTimeout(() => {
      this.DisplayData();
      event.target.complete();
    }, 500);
  }
  
  // Infinite scroll
  loadMore(event) {
     this.PeoplesService.getPeoples()
     .subscribe(
      (data) => {
        // Success
        for(const peoples of data['results']) {
          this.peoples.push(peoples);
        }
        event.target.complete();
      },
      (error) => {
        console.error(error);
      }
    ).unsubscribe;
  }
  
}


