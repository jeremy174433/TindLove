import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  // Save preference Gender
  updateProfile(firstname: string, lastname: string, phone: string, lookingFor: string) {
    var userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userProfile/' + userID).update({ 
      firstname: firstname, 
      lastname: lastname, 
      phone: phone, 
      lookingFor: lookingFor
    });
  }
  
}
