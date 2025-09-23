import { Injectable } from '@angular/core';
// import
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppContextService } from '../core/app-context.service';
import { Playlist } from '../interfaces/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<Playlist[]>{
    const url = `${environment.base_url}/playlists`;
    return this.http.get<Playlist[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: Playlist): Observable<Playlist>{
    const url =  `${environment.base_url}/playlists`;
    return this.http.post<Playlist>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/playlists/${id}`;
    return this.http.get<Playlist[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: Playlist): Observable<Playlist>{
    const url =  `${environment.base_url}/playlists/${item.id}`;
    return this.http.put<Playlist>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: Playlist): Observable<Playlist>{
    const url =  `${environment.base_url}/playlists/${item.id}`;
    return this.http.delete<Playlist>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<Playlist[]>{
    return this.http.get<Playlist[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<Playlist[]>{
    const url = `${environment.base_url}/unpaginated-items-playlists`;
    return this.http.get<Playlist[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: Playlist): Observable<Playlist>{
    const url =  `${environment.base_url}/search-playlists`;
    return this.http.post<Playlist>(url, item, this.mAppContextService.getHttpOptions());
  }



  addItem(item: Playlist): Observable<Playlist>{
    const url =  `${environment.base_url}/add-item-playlists`;
    return this.http.post<Playlist>(url, item, this.mAppContextService.getHttpOptions());
  }
  removeItem(item: Playlist): Observable<Playlist>{
    const url =  `${environment.base_url}/remove-item-playlists`;
    return this.http.post<Playlist>(url, item, this.mAppContextService.getHttpOptions());
  }

}
