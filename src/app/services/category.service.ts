import { Injectable } from '@angular/core';
// import
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems(page:any):Observable<Category[]>{
    const url = `${environment.base_url}/categories`;
    return this.http.get<Category[]>(url+page, this.mAppContextService.getHttpOptions());
  }

  createItem(item: Category): Observable<Category>{
    const url =  `${environment.base_url}/categories`;
    return this.http.post<Category>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/categories/${id}`;
    return this.http.get<Category[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: Category): Observable<Category>{
    const url =  `${environment.base_url}/categories/${item.id}`;
    return this.http.put<Category>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: Category): Observable<Category>{
    const url =  `${environment.base_url}/categories/${item.id}`;
    return this.http.delete<Category>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<Category[]>{
    return this.http.get<Category[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<Category[]>{
    const url = `${environment.base_url}/unpaginated-items-categories`;
    return this.http.get<Category[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: Category): Observable<Category>{
    const url =  `${environment.base_url}/search-categories`;
    return this.http.post<Category>(url, item, this.mAppContextService.getHttpOptions());
  }



  categorizedItems(page:any, id:any):Observable<Category[]>{
    const url = `${environment.base_url}/categorized-items-categories/${id}`;
    return this.http.get<Category[]>(url+page, this.mAppContextService.getHttpOptions());
  }

}
