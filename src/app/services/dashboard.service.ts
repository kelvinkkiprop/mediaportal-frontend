import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import
import { AppContextService } from '../core/app-context.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // dashboard
  dashboard():Observable<any[]>{
    const url = `${environment.base_url}/dashboard`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  // getSuggestions
  getSuggestions(query: string): Observable<string[]> {
    const url = `${environment.base_url}/search-suggestions`;
    const params = new HttpParams().set('q', query.trim());
    return this.http.get<string[]>(url, { params });
  }

  // dashboard2
  dashboard2():Observable<any[]>{
    const url = `${environment.base_url}/dashboard2`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  // filterInterests
  filterInterests(id:any){
    const url =  `${environment.base_url}/filter-interests/${id}`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }


  // systemStats
  systemStats(){
    const url =  `${environment.base_url}/system-stats`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

}
