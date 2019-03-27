import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {

  api = 'https://randomuser.me/api/?';
  model = 'inc=gender, name, location, email, dob, phone, id, picture, nat';
  base = '&nat=us&results=50';

  constructor(private http: HttpClient) { }

  getPeoples() {
    return this.http.get(this.api + this.model + this.base);
  }

  getByGenderM() {
    return this.http.get(this.api + this.model + this.base + '&gender=male');
  }

  getByGenderF() {
    return this.http.get(this.api + this.model + this.base + '&gender=female');
  }
  
}
