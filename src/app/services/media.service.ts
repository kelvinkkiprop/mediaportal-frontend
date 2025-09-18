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
export class MediaService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<Media[]>{
    const url = `${environment.base_url}/media`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/media`;
    return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/media/${id}`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/media/${item.id}`;
    return this.http.put<Media>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/media/${item.id}`;
    return this.http.delete<Media>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<Media[]>{
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<Media[]>{
    const url = `${environment.base_url}/unpaginated-items-media`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: Media): Observable<Media>{
    const url =  `${environment.base_url}/search-media`;
    return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
  }



  myMedia(id:number){
    const url =  `${environment.base_url}/my-media/${id}`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  likedMediaItems():Observable<Media[]>{
    const url = `${environment.base_url}/liked-media`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }

  historyMediaItems():Observable<Media[]>{
    const url = `${environment.base_url}/history-media`;
    return this.http.get<Media[]>(url, this.mAppContextService.getHttpOptions());
  }


  reactItem(item: any): Observable<Media>{
    const url =  `${environment.base_url}/media/${item.id}/react`;
    return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
  }

  commentItem(item: any): Observable<Media>{
    const url =  `${environment.base_url}/media/${item.id}/comment`;
    return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
  }
  processItem(item: any): Observable<Media>{
    const url =  `${environment.base_url}/media/${item.id}/process`;
    return this.http.post<Media>(url, item, this.mAppContextService.getHttpOptions());
  }



  upload(item: any): Observable<any>{
    const url =  `${environment.base_url}/upload`;
    // return this.http.post<any>(url, item, this.mAppContextService.getHttpOptions());
    return this.http.post<any>(url, item);
  }

  initUpload(filename: string, title: string) {
    const url =  `${environment.base_url}/upload/init`;
    return this.http.post<{ uploadId: string }>(url, { filename, title });
    // return this.http.post<any>(url, item, this.mAppContextService.getHttpOptions());
  }

  uploadChunk(uploadId: string, chunkIndex: number, chunk: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('file', chunk, `chunk_${chunkIndex}`);
    const url =  `${environment.base_url}/upload/chunk`;
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  completeUpload(uploadId: string, totalChunks: number, title: string, description?: string) {
    const url =  `${environment.base_url}/upload/complete`;
    return this.http.post(url, {
      uploadId, totalChunks, title, description
    });
  }

}
