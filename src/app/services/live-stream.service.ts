import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { Media } from '../interfaces/media';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService {


  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<Media[]>{
    const url = `${environment.base_url}/live-stream`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/live-stream`;
    // return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
    return this.http.post<Media>(url, item);
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/live-stream/${id}`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/live-stream/${item.id}`;
    return this.http.put<Media>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/live-stream/${item.id}`;
    return this.http.delete<Media>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<Media[]>{
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<Media[]>{
    const url = `${environment.base_url}/unpaginated-items-live-stream`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/search-live-stream`;
    return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
  }

}
