import { Component } from '@angular/core';

import { PeoplesService } from '../services/peoples-service/peoples.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [PeoplesService]
})
export class Tab1Page {

  public peoples = [];

  constructor(private PeoplesService: PeoplesService) { }

  ngOnInit() {
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

}


