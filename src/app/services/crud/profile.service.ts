import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  // Save profile update
  updateProfile(firstname: string, lastname: string, age: string, phone: string, lookingForGender: string) {
    var userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userProfile/' + userID).update({ 
      firstname: firstname, 
      lastname: lastname,
      age: age,
      phone: phone, 
      lookingForGender: lookingForGender
    });
  }
  
}
