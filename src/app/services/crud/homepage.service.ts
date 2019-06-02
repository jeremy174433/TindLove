import { Injectable } from '@angular/core';
import { User } from 'src/app/models/users';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  users: User[];
  
  constructor() { }

  // Retrieve users from database
  getUsersData(): firebase.firestore.DocumentReference {

    /*
    var docRef = firebase.firestore().collection('userProfile');

    docRef.get()
    .then(doc => {
      // console.log(doc.data());
      console.log(doc);
    })
    .catch(err => {
      console.log('Error getting document : ', err);
    });
    */

    const userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userFavorites/' + userID);
  }

}
