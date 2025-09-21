import { Injectable } from '@angular/core';
// import
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<Comment[]>{
    const url = `${environment.base_url}/media-comments`;
    return this.http.get<Comment[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: Comment): Observable<Comment>{
    const url =  `${environment.base_url}/media-comments`;
    // return this.http.post<Comment>(url, item, this.mAppContextService.getHttpOptions());
    return this.http.post<Comment>(url, item);
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/media-comments/${id}`;
    return this.http.get<Comment[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: Comment): Observable<Comment>{
    const url =  `${environment.base_url}/media-comments/${item.id}`;
    return this.http.put<Comment>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: Comment): Observable<Comment>{
    const url =  `${environment.base_url}/media-comments/${item.id}`;
    return this.http.delete<Comment>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<Comment[]>{
    return this.http.get<Comment[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<Comment[]>{
    const url = `${environment.base_url}/unpaginated-items-media-comments`;
    return this.http.get<Comment[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: Comment): Observable<Comment>{
    const url =  `${environment.base_url}/search-media-comments`;
    return this.http.post<Comment>(url, item, this.mAppContextService.getHttpOptions());
  }


  filteredItems(page:any, id:any):Observable<Comment[]>{
    const url = `${environment.base_url}/filtered-media-comments/${id}`;
    return this.http.get<Comment[]>(url+page, this.mAppContextService.getHttpOptions());
  }

}
