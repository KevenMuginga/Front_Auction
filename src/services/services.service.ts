import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, newItem } from '../model/item';
import { NewOffer, Offer } from '../model/offer';
import { newUser, User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  apiUrl = `${environment.apiUrl}api`;

  constructor(private http: HttpClient) { }

  //////// ITENS ///////////////////////////
  getAllItens():Observable<Item[]>{
    return this.http.get<Item[]>(`${this.apiUrl}/Item/GetAll`);
  }

  postItem(item: FormData):Observable<Item>{
    return this.http.post<Item>(`${this.apiUrl}/Item`, item);
  }
  //////// OFFER ///////////////////////////
  postOffer(item: NewOffer):Observable<Offer>{
    return this.http.post<Offer>(`${this.apiUrl}/Offer`, item);
  }

  //////// USER ///////////////////////////
  postUser(item: newUser):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/User`, item);
  }
}
