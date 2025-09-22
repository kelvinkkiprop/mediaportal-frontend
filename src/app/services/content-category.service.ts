import { Injectable } from '@angular/core';
// import
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { ContentCategory } from '../interfaces/content-category';

@Injectable({
  providedIn: 'root'
})
export class ContentCategoryService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems(page:any):Observable<ContentCategory[]>{
    const url = `${environment.base_url}/content-categories`;
    return this.http.get<ContentCategory[]>(url+page, this.mAppContextService.getHttpOptions());
  }

  createItem(item: ContentCategory): Observable<ContentCategory>{
    const url =  `${environment.base_url}/content-categories`;
    return this.http.post<ContentCategory>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/content-categories/${id}`;
    return this.http.get<ContentCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: ContentCategory): Observable<ContentCategory>{
    const url =  `${environment.base_url}/content-categories/${item.id}`;
    return this.http.put<ContentCategory>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: ContentCategory): Observable<ContentCategory>{
    const url =  `${environment.base_url}/content-categories/${item.id}`;
    return this.http.delete<ContentCategory>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<ContentCategory[]>{
    return this.http.get<ContentCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<ContentCategory[]>{
    const url = `${environment.base_url}/unpaginated-items-content-categories`;
    return this.http.get<ContentCategory[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: ContentCategory): Observable<ContentCategory>{
    const url =  `${environment.base_url}/search-content-categories`;
    return this.http.post<ContentCategory>(url, item, this.mAppContextService.getHttpOptions());
  }



  categorizedItems(page:any, id:any):Observable<ContentCategory[]>{
    const url = `${environment.base_url}/categorized-items-content-categories/${id}`;
    return this.http.get<ContentCategory[]>(url+page, this.mAppContextService.getHttpOptions());
  }

}
