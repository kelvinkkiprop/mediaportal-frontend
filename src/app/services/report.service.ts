import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import
import { AppContextService } from '../core/app-context.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }


  // Functions
  allItems():Observable<any[]>{
    const url = `${environment.base_url}/reports`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  createItem(item: any): Observable<any>{
    const url =  `${environment.base_url}/reports`;
    return this.http.post<any>(url, item, this.mAppContextService.getHttpOptions());
  }

  getOneItem(id:number){
    const url =  `${environment.base_url}/reports/${id}`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  updateItem(item: any): Observable<any>{
    const url =  `${environment.base_url}/reports/${item.id}`;
    return this.http.put<any>(url, item, this.mAppContextService.getHttpOptions());
  }

  deleteItem(item: any): Observable<any>{
    const url =  `${environment.base_url}/reports/${item.id}`;
    return this.http.delete<any>(url, this.mAppContextService.getHttpOptions());
  }

  paginateItems(url:any):Observable<any[]>{
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  unpaginatedItems():Observable<any[]>{
    const url = `${environment.base_url}/unpaginated-items-reports`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  searchItems(item: any): Observable<any>{
    const url =  `${environment.base_url}/search-reports`;
    return this.http.post<any>(url, item, this.mAppContextService.getHttpOptions());
  }



  insightsItems(): Observable<any>{
    const url =  `${environment.base_url}/insights-reports`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }
  analyticsItems(): Observable<any>{
    const url =  `${environment.base_url}/analytics-reports`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

}

