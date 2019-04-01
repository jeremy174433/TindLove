import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser;

  constructor() {

    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`userProfile/${user.uid}`);
      }
    });

  }

  // Get profile
  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }

}
