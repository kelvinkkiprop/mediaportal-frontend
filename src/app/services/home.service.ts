import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import
import { AppContextService } from '../core/app-context.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // index
  index():Observable<any[]>{
    const url = `${environment.base_url}/home`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  stream(id:number){
    const url =  `${environment.base_url}/stream/${id}/original`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  streamHls(id:any, file:any){
    const url =  `${environment.base_url}/media/stream/${id}/${file}`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/home/${id}`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

}
