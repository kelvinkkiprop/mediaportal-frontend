import { Injectable } from '@angular/core';
// import
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }


  // Functions
  allItems():Observable<User[]>{
    const url = `${environment.base_url}/users`;
    return this.http.get<User[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: User): Observable<User>{
    const url =  `${environment.base_url}/users`;
    return this.http.post<User>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/users/${id}`;
    return this.http.get<User[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: User): Observable<User>{
    const url =  `${environment.base_url}/users/${item.id}`;
    return this.http.put<User>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: User): Observable<User>{
    const url =  `${environment.base_url}/users/${item.id}`;
    return this.http.delete<User>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<User[]>{
    return this.http.get<User[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<User[]>{
    const url = `${environment.base_url}/unpaginated-items-users`;
    return this.http.get<User[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: User): Observable<User>{
    const url =  `${environment.base_url}/search-users`;
    return this.http.post<User>(url, item, this.mAppContextService.getHttpOptions());
  }

}
