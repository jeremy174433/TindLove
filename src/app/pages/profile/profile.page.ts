import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user: any;
  loading: HTMLIonLoadingElement;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController) { 
    
    this.user = firebase.auth().currentUser;

  }

  ngOnInit() { }

  // Log out
  async logoutUser(): Promise<void> {

    this.loading = await this.loadingCtrl.create();

    const alert = await this.alertCtrl.create({
      message: 'Do you really want to disconnect from the app ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => { 
            this.loading.present();
            setTimeout(() => {
              this.loading.dismiss();
              this.authService.logoutUser();
            }, 1500);
          }  
        }
      ]
    });
    await alert.present();
  }

  // Delete account
  async deleteAccount(): Promise<void> {

    this.loading = await this.loadingCtrl.create();
    
    const toast = await this.toastController.create({
      message: 'Your account has been deleted',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'x',
      duration: 5000
    });

    const alert = await this.alertCtrl.create({
      header: 'WARNING 💣',
      message: 'Do you really want to delete your account ? This action is irreversible.',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.loading.present();
            setTimeout(() => {
              this.loading.dismiss();
              this.authService.deleteAccount();
              this.router.navigateByUrl('sign-in');
              toast.present();
            }, 1500);
          }
        }
      ]
    });
    await alert.present();
  }

}


