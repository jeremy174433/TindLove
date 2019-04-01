import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  public currentUser;
  public userFavoritesPeoples;
  public userFavorites: firebase.firestore.DocumentReference;
  favoritesList = [];

  constructor() {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.currentUser = user;
        this.userFavorites = firebase.firestore().doc(`userFavorites/${user.uid}`);
        
        firebase.firestore().doc(`userFavorites/${user.uid}`).get()
        .then((favoriteSnapshot) => {
          this.userFavoritesPeoples = favoriteSnapshot.get('peoples');
        });
      }
    });
  }

  // Save favorite
  addNewFavorite(people: string) {
    // First add if not exist
    if (this.userFavoritesPeoples === undefined) {
      this.userFavoritesPeoples = [people];
      this.userFavorites.set({peoples: [people]});
    }
    // Next adds
    else {
      this.userFavoritesPeoples.push(people);
      let peoples = this.userFavoritesPeoples;
      this.userFavorites.update({peoples});
    }
    return this.userFavoritesPeoples;
  }

  // Get favorites
  getAllFavorites(): firebase.firestore.DocumentReference {
    const userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userFavorites/' + userID);
  }

}
