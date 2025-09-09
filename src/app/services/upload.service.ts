import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import
import { AppContextService } from '../core/app-context.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }


  createItem(item: any): Observable<any>{
    const url =  `${environment.base_url}/upload`;
    return this.http.post<any>(url, item, this.mAppContextService.getHttpOptions());
    // return this.http.post<any>(url, item);
  }



  initUpload(filename: string, title: string) {
    const url =  `${environment.base_url}/upload/init`;
    return this.http.post<{ uploadId: string }>(url, { filename, title }, this.mAppContextService.getHttpOptions());

    // return this.http.post<any>(url, item, this.mAppContextService.getHttpOptions());
  }

  uploadChunk(uploadId: string, chunkIndex: number, chunk: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('file', chunk, `chunk_${chunkIndex}`);
    const url =  `${environment.base_url}/upload/chunk`;
    // return this.http.post(url, formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // });
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  completeUpload(uploadId: string, totalChunks: number, title: string, description?: string) {
    const url =  `${environment.base_url}/upload/complete`;
    // return this.http.post(url, {uploadId, totalChunks, title, description});
    return this.http.post(url, {uploadId, totalChunks, title, description}, this.mAppContextService.getHttpOptions());
  }

}
