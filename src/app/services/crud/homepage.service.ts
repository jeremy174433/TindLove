import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  
  constructor() { }

  // Retrieve users from database
  getUsersData(): firebase.firestore.CollectionReference {
    return firebase.firestore().collection('userProfile/');
  }

}
