import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(public db: AngularFirestore) { }

  getFavorites() {
    console.log('get favorites');
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/favoritesProfile').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }

}

