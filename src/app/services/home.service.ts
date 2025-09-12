import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import
import { AppContextService } from '../core/app-context.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private mAppContextService: AppContextService,
    private http: HttpClient
  ) { }

  // Functions
  allItems():Observable<any[]>{
    const url = `${environment.base_url}/home`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

  filter(lesson_category_id:any){
    const url = `${environment.base_url}/home/filter-topics/${lesson_category_id}`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }
  search(term:any){
    const url = `${environment.base_url}/home/search-topics/${term}`;
    return this.http.get<any[]>(url, this.mAppContextService.getHttpOptions());
  }

}
