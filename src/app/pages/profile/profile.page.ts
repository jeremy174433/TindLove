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
      image: [ '', Validators.compose([Validators.required]) ],
      fullname: [ '', Validators.compose([Validators.required]) ],
      gender: [ '', Validators.compose([Validators.required]) ],
      age: [ '', Validators.compose([Validators.required]) ],
      phone: [ '', Validators.compose([Validators.required]) ],
      lookingForGender: [ '', Validators.compose([Validators.required]) ]
    });
  }

  ngOnInit() {
    // Launch FileReader
    document.getElementById('file').addEventListener('change', this.handleFileSelect, false);
  }

  // Define profile image
  handleFileSelect(image) {
    let files = image.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => {

      // Image preview after upload
      const imgTag = document.getElementById('img-preview') as HTMLInputElement;
      const imgBase64: string = reader.result as string;
      const imgPreview = imgTag.setAttribute('src', imgBase64);
      imgPreview;
      
      // Put base64 code on the hidden input
      const inputBase64 = document.getElementById('base64code') as HTMLInputElement;
      const res: string = reader.result as string;
      inputBase64.value = res;
    };

    reader.onerror = (err) => {
      console.log(err);
    };
  }

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
  async saveProfile(profilePersoUser: FormGroup) {
    if (!profilePersoUser.valid || profilePersoUser.untouched) {
      console.log('Need to complete the form, current value: ', profilePersoUser.value);
    }
    else {
      this.loading = await this.loadingCtrl.create();

      const toast = await this.toastController.create({
        message: 'Your modifications has been saved',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'x',
        duration: 3000
      });

      // image
      let image: string;
      if(profilePersoUser.value.image !== '' && profilePersoUser.value.image) {
        image = profilePersoUser.value.image;
      }
      else {
        image = this.user.image;
      }

      // fullname
      let fullname: string;
      if(profilePersoUser.value.fullname !== '' && profilePersoUser.value.fullname) {
        fullname = profilePersoUser.value.fullname;
      }
      else {
        fullname = this.user.fullname;
      }

      // lastname
      let gender: string;
      if(profilePersoUser.value.gender !== '' && profilePersoUser.value.gender) {
        gender = profilePersoUser.value.gender;
      }
      else {
        gender = this.user.gender;
      }

      // age
      let age: string;
      if(profilePersoUser.value.age !== '' && profilePersoUser.value.age) {
        age = profilePersoUser.value.age;
      }
      else {
        age = this.user.age;
      }

      // phone
      let phone: string;
      if(profilePersoUser.value.phone !== '' && profilePersoUser.value.phone) {
        phone = profilePersoUser.value.phone;
      }
      else {
        phone = this.user.phone;
      }

      // lookingForGender
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
        this.profileService.updateProfile(image, fullname, gender, age, phone, lookingForGender);
        this.user.image = image;
        this.user.fullname = fullname;
        this.user.gender = gender;
        this.user.age = age;
        this.user.phone = phone;
        this.user.lookingForGender = lookingForGender;
        toast.present();
      }, 1000);
    }
  }

}