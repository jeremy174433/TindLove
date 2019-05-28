import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/crud/profile.service';
import { UserService } from '../../services/user/user.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {

  user: any;
  private loading: HTMLIonLoadingElement;
  profilePersoUser: FormGroup;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    public userService: UserService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder) { 

    this.profilePersoUser = this.formBuilder.group({
      firstname: [ '' ],
      lastname: [ '' ],
      age: [ '' ],
      phone: [ '' ],
      lookingForGender: [ '' ]
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

  // Profile informations
  async savePreferences(profilePersoUser: FormGroup) {
    if (!profilePersoUser.valid) {
      console.log('Need to complete the form, current value: ', profilePersoUser.value);
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
      
      let firstname: string;
      if(profilePersoUser.value.firstname !== '' && profilePersoUser.value.firstname) {
        firstname = profilePersoUser.value.firstname;
      }
      else {
        firstname = this.user.firstname;
      }

      let lastname: string;
      if(profilePersoUser.value.lastname !== '' && profilePersoUser.value.lastname) {
        lastname = profilePersoUser.value.lastname;
      }
      else {
        lastname = this.user.lastname;
      }

      let age: string;
      if(profilePersoUser.value.age !== '' && profilePersoUser.value.age) {
        age = profilePersoUser.value.age;
      }
      else {
        age = this.user.age;
      }

      let phone: string;
      if(profilePersoUser.value.phone !== '' && profilePersoUser.value.phone) {
        phone = profilePersoUser.value.phone;
      }
      else {
        phone = this.user.phone;
      }

      let lookingForGender: string;
      if(profilePersoUser.value.lookingForGender !== '' && profilePersoUser.value.lookingForGender) {
        lookingForGender = profilePersoUser.value.lookingForGender;
      }
      else {
        lookingForGender = this.user.lookingForGender;
      }

      this.loading.present();
      setTimeout(() => {
        this.loading.dismiss();
        this.profileService.updateProfile(firstname, lastname, age, phone, lookingForGender);
        this.user.firstname = firstname;
        this.user.lastname = lastname;
        this.user.age = age;
        this.user.phone = phone;
        this.user.lookingForGender = lookingForGender;
        toast.present();
      }, 1000);
    }
  }

}