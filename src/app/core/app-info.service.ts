// src/app/core/app-info.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, VERSION } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import packageInfo from '../../../package.json';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  // variables
  private readonly appInfo = {
    name: 'SecuraysCMS',
    year: new Date().getFullYear(),
    version: packageInfo.version
  };

  get info(): { name: string; year: number; version: string } {
    return this.appInfo;
  }
  get name(): string {
    return this.appInfo.name;
  }
  get version(): string {
    return this.appInfo.version;
  }
  get year(): number {
    return this.appInfo.year;
  }

}
