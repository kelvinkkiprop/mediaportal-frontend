import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import
import { AppContextService } from '../core/app-context.service';
import { environment } from '../../environments/environment';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }


  // Functions
  allItems():Observable<Profile[]>{
    const url = `${environment.base_url}/profiles`;
    return this.http.get<Profile[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: Profile): Observable<Profile>{
    const url =  `${environment.base_url}/profiles`;
    return this.http.post<Profile>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/profiles/${id}`;
    return this.http.get<Profile[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: Profile): Observable<Profile>{
    const url =  `${environment.base_url}/profiles/${item.id}`;
    return this.http.put<Profile>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: Profile): Observable<Profile>{
    const url =  `${environment.base_url}/profiles/${item.id}`;
    return this.http.delete<Profile>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<Profile[]>{
    return this.http.get<Profile[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<Profile[]>{
    const url = `${environment.base_url}/unpaginated-items-profiles`;
    return this.http.get<Profile[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: Profile): Observable<Profile>{
    const url =  `${environment.base_url}/search-profiles`;
    return this.http.post<Profile>(url, item, this.mAppContextService.getHttpOptions());
  }



  filterConstituencies(id:number){
    const url = `${environment.base_url}/filter-constituencies/${id}`;
    return this.http.get<Profile[]>(url, this.mAppContextService.getHttpOptions());
  }

  filterWards(id:number, constituency_id:number){
    const url = `${environment.base_url}/filter-wards/${id}/${constituency_id}`;
    return this.http.get<Profile[]>(url, this.mAppContextService.getHttpOptions());
  }


  updateNotifications(item: Profile): Observable<Profile>{
    const url =  `${environment.base_url}/update-notification-profiles`;
    return this.http.post<Profile>(url, item, this.mAppContextService.getHttpOptions());
  }
  updateAutoplay(item: Profile): Observable<Profile>{
    const url =  `${environment.base_url}/update-autoplay-profiles`;
    return this.http.post<Profile>(url, item, this.mAppContextService.getHttpOptions());
  }

}
