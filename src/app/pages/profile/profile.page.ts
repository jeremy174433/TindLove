import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  userEmail;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController) { 

      this.userEmail = firebase.auth().currentUser.email;

    }

  ngOnInit() { }

  // Log out
  async logoutUser(): Promise<void> {
    const alert = await this.alertCtrl.create({
      message: 'Do you really want to disconnect from the app ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => { this.authService.logoutUser(); } // Disconnect the user
        }
      ]
    });
    await alert.present();
  }

}


