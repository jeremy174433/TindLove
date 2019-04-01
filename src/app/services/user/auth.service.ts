import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Sign in
  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Sign up
  signupUser(email: string, password: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
      .firestore()
      .doc(`/userProfile/${newUserCredential.user.uid}`)
      .set({ email: email, gender: 'All' });
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }

  // Reset password
  resetPassword(email:string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Log out
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  // Delete current user
  deleteAccount(): Promise<void> {
    return firebase.auth().currentUser.delete();
  }

}
