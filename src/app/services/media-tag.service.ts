import { Injectable } from '@angular/core';
// import
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { MediaTag } from '../interfaces/media-tag';

@Injectable({
  providedIn: 'root'
})
export class MediaTagService {


  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<MediaTag[]>{
    const url = `${environment.base_url}/media-tags`;
    return this.http.get<MediaTag[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: MediaTag): Observable<MediaTag>{
    const url =  `${environment.base_url}/media-tags`;
    return this.http.post<MediaTag>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/media-tags/${id}`;
    return this.http.get<MediaTag[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: MediaTag): Observable<MediaTag>{
    const url =  `${environment.base_url}/media-tags/${item.id}`;
    return this.http.put<MediaTag>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: MediaTag): Observable<MediaTag>{
    const url =  `${environment.base_url}/media-tags/${item.id}`;
    return this.http.delete<MediaTag>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<MediaTag[]>{
    return this.http.get<MediaTag[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<MediaTag[]>{
    const url = `${environment.base_url}/unpaginated-items-media-tags`;
    return this.http.get<MediaTag[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: MediaTag): Observable<MediaTag>{
    const url =  `${environment.base_url}/search-media-tags`;
    return this.http.post<MediaTag>(url, item, this.mAppContextService.getHttpOptions());
  }

}
