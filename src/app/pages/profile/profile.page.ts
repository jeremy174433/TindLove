import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/crud/profile.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user: any;
  private loading: HTMLIonLoadingElement;
  preferencesForm: FormGroup;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder,) { 
    
    this.user = firebase.auth().currentUser;

    this.preferencesForm = this.formBuilder.group({
      gender: [
        '',
        Validators.compose([Validators.required])
      ]
    });

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

  // Preferences
  async savePreferences(preferencesForm: FormGroup): Promise<void> {
    if (!preferencesForm.valid) {
      console.log('Need to complete the form, current value: ', preferencesForm.value);
    }
    else {
      this.loading = await this.loadingCtrl.create();

      const toast = await this.toastController.create({
        message: 'Your preferences has been saved : ' + preferencesForm.value.gender,
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'x',
        duration: 3000
      });
  
      const gender: string = preferencesForm.value.gender;

      this.loading.present();
      setTimeout(() => {
        this.loading.dismiss();
        console.log('go to profile service...');
        this.profileService.preferencesForm(gender);
        preferencesForm.reset();
        toast.present();
      }, 1000);

    }
  }

}


