import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor() { }

  // Retrieve users from database
  getUsersData() {
    console.log('test');
    console.log(firebase.firestore().collection('userProfile').doc());
    return firebase.firestore().collection('userProfile').get();
  }

}
