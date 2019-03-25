import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  constructor(private http: HttpClient) { }

  getPeoples() {
    return this.http.get('https://randomuser.me/api/?nat=us&results=50');
  }
  
}
