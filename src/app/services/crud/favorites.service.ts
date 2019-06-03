import { Injectable } from '@angular/core';
import { People } from 'src/app/models/peoples';
import { User } from 'src/app/models/users';

import * as firebase from 'firebase/app';
import 'firebase/firestore';  
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

  // Get favorites
  getAllFavorites(): firebase.firestore.DocumentReference {
    const userID = firebase.auth().currentUser.uid;
    return firebase.firestore().doc('userFavorites/' + userID);
  }
  
  // Delete all favorites
  deleteAll(): Promise <any> {
    const userID = firebase.auth().currentUser.uid;
    const favoritesListRef = firebase.firestore().doc('userFavorites/' + userID);
    
    return new Promise<any>((resolve, reject) => {
      favoritesListRef.get()
      .then(data => {
        var peoplesList:{}[] = data.data().peoples;
        peoplesList = [];
        var usersList:{}[] = data.data().users;
        usersList = [];
        favoritesListRef.update({
          peoples: firebase.firestore.FieldValue.delete(),
          users: firebase.firestore.FieldValue.delete()
        }),
        favoritesListRef.update({ 
          peoples: [],
          users: []
        })
        .then(() => {
          resolve(peoplesList);
          resolve(usersList);
        })
        .catch(err => { reject(err); });
      })
      .catch(err => { reject(err); });
    });
  }

  /****************************
  CRUD API USERS :
  ****************************/

  // Save favorite API users
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

  /****************************
  CRUD DATABASE USERS :
  ****************************/

  // Save favorite real users
  addNewRealFavorite(user: User, users: User[]): Promise <any> {
    // First add if not exist
    return new Promise <any> ((resolve, reject) => {
      if (users === undefined) {
        users = [user];
        this.userFavorites.set({users: users})
        .then(() => { resolve(users); })
        .catch((err) => { reject(err); });
      }
      // Next adds
      else {
        users.push(user);
        this.userFavorites.update({users})
        .then(() => { resolve(users); })
        .catch((err) => { reject(err); });
      }
      resolve(users);
    });
  }

  // Delete favorite
  deleteOneRealFavorite(user: User): Promise <any> {
    return new Promise<any>((resolve, reject) => {
      console.log('Delete a specific favorite item');
    });
  } 

}
