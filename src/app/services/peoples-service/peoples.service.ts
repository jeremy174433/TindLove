import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeoplesService {
  
  private api = 'https://randomuser.me/api/?';
  private model = 'inc=gender, name, location, email, dob, phone, id, picture, nat';
  private base = '&nat=us&results=50';
  private people: any;

  constructor(private http: HttpClient) { }

  // Getter & setter 
  setPeople(people) {
    this.people = people;
  }

  getPeople() {
    return this.people;
  }

  // Get all peoples
  getPeoples() {
    return this.http.get(this.api + this.model + this.base);
  }

  // Get by male
  getByGenderM() {
    return this.http.get(this.api + this.model + this.base + '&gender=male');
  }

  // Get by female
  getByGenderF() {
    return this.http.get(this.api + this.model + this.base + '&gender=female');
  }
  
}
