import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  // Save preference Gender
  preferencesGender(gender: string) {
    var userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userProfile/' + userID).update({ gender: gender });
  }
  
}
