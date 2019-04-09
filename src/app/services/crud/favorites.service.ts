import { Injectable } from '@angular/core';
import { People } from 'src/app/models/peoples';

import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  
  public currentUser;
  public userFavorites: firebase.firestore.DocumentReference;

  constructor() {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      if (user) {
        this.currentUser = user;
        this.userFavorites = firebase.firestore().doc(`userFavorites/${user.uid}`);
      }
    });
  }

  // Save favorite
  addNewFavorite(people: People, peoples: People[]): Promise <any> {
    // First add if not exist
    return new Promise <any> ((resolve, reject) => {
      if (peoples === undefined) {
        peoples = [people];
        this.userFavorites.set({peoples: peoples})
        .then(() => { resolve(peoples); })
        .catch((err) => { reject(err); });
      }
      // Next adds
      else {
        peoples.push(people);
        this.userFavorites.update({peoples})
        .then(() => { resolve(peoples); })
        .catch((err) => { reject(err); });
      }
      resolve(peoples);
    });
  }

  // Get favorites
  getAllFavorites(): firebase.firestore.DocumentReference {
    const userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userFavorites/' + userID);
  }

  // Delete favorite
  deleteOneFavorite(people: People): Promise <any> {
    const userID = firebase.auth().currentUser.uid;
    return new Promise<any>((resolve, reject) => {
      firebase.firestore().doc('userFavorites/' + userID).get()
      .then(data => {
        var peoplesList:{}[] = data.data().peoples;
        const indexElement = peoplesList.findIndex((p: People) => p.id.value === people.id.value);
        peoplesList.splice(indexElement, 1)
        firebase.firestore().doc('userFavorites/' + userID).update({ peoples: peoplesList })
        .then(() => { resolve(peoplesList) })
        .catch(err => { reject(err); });
      })
      .catch(err => { reject(err); });
    });
  } 

}
