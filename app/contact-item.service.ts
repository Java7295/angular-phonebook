import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactItemService {
  constructor(private http: Http) {}

  get(name) {
    let searchParams = new URLSearchParams();
    searchParams.append('name', name);
    return this.http.get('contactitems', { search: searchParams })
      .map(response => {
        return response.json().contactItems;
      });
  }
  
  add(contactItem) {
    return this.http.post('contactitems', contactItem)
      .map(response => {});
  }
  
  delete(contactItem) {
    return this.http.delete(`contactitems/${contactItem.id}`)
      .map(response => {});
  }
}
