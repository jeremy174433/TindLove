import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { PeoplesService } from '../../services/peoples-service/peoples.service';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  api = this.PeoplesService.getPeoples();
  data: any;
  private peoples = [];

  constructor(
    private PeoplesService: PeoplesService,
    private modalCtrl: ModalController) { 
      
      this.DisplayData();
      
  }

  ngOnInit() { }

  // Disable back button on tabs page to not return on sign-in page after user authentification
  ionViewCanLeave() {
    return false;
  }

  ionViewWillEnter() {
    // Skeleton screen
    setTimeout(() => {
      this.data = { };
    }, 2000);
  }

  // Call API
  DisplayData() {
    this.api
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
    this.PeoplesService.setPeople(people); // Retrieve data
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
     this.api
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