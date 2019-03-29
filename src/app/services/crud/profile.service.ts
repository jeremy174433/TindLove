import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // newPreferences: any;
  // newPreferences(gender: string): any;
  // [newPreferences: string]: any;
  
  constructor() { }

  // Save preferences
  preferencesForm(gender: string): Promise<any> {
    console.log('service is ready');
    console.log(firebase.auth().currentUser);
    return firebase.auth().signOut();
    /*
    return firebase.auth().newPreferences(gender)
    .then(
      () => {
      firebase
      .firestore()
      .doc('userProfile/gender')
      .set({ gender });
    })
    .catch(err => {
      console.error(err);
      throw new Error(err);
    });
    */
  }

}
