import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/crud/profile.service';
import { UserService } from '../../services/user/user.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user: any;
  private loading: HTMLIonLoadingElement;
  preferencesGender: FormGroup;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public userService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder) { 

    this.preferencesGender = this.formBuilder.group({
      gender: [
        '',
        Validators.compose([Validators.required])
      ]
    });

  }

  ngOnInit() { }

  // Get user data
  ionViewWillEnter() {
    this.userService.getUserProfile().get()
    .then((userSnapshot) => {
      this.user = userSnapshot.data();
    });
  }

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
  async savePreferences(preferencesGender: FormGroup) {
    if (!preferencesGender.valid) {
      console.log('Need to complete the form, current value: ', preferencesGender.value);
    }
    else {
      this.loading = await this.loadingCtrl.create();

      const toast = await this.toastController.create({
        message: 'Your preferences has been saved',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'x',
        duration: 3000
      });
  
      const gender: string = preferencesGender.value.gender;

      this.loading.present();
      setTimeout(() => {
        this.loading.dismiss();
        this.profileService.preferencesGender(gender);
        this.user.gender = gender;
        preferencesGender.reset();
        toast.present();
      }, 1000);
    }
  }

}