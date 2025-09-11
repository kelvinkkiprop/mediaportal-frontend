import { Injectable } from '@angular/core';
// import
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { MediaCategory } from '../interfaces/media-category';

@Injectable({
  providedIn: 'root'
})
export class MediaCategoryService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<MediaCategory[]>{
    const url = `${environment.base_url}/media-categories`;
    return this.http.get<MediaCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: MediaCategory): Observable<MediaCategory>{
    const url =  `${environment.base_url}/media-categories`;
    return this.http.post<MediaCategory>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/media-categories/${id}`;
    return this.http.get<MediaCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: MediaCategory): Observable<MediaCategory>{
    const url =  `${environment.base_url}/media-categories/${item.id}`;
    return this.http.put<MediaCategory>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: MediaCategory): Observable<MediaCategory>{
    const url =  `${environment.base_url}/media-categories/${item.id}`;
    return this.http.delete<MediaCategory>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<MediaCategory[]>{
    return this.http.get<MediaCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<MediaCategory[]>{
    const url = `${environment.base_url}/unpaginated-items-media-categories`;
    return this.http.get<MediaCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: MediaCategory): Observable<MediaCategory>{
    const url =  `${environment.base_url}/search-media-categories`;
    return this.http.post<MediaCategory>(url, item, this.mAppContextService.getHttpOptions());
  }

}
