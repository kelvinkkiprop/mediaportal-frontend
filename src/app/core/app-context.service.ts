// src/app/core/app-context.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  // CommonHTTPheaders
  private readonly defaultHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private sanitizer: DomSanitizer,
    private injector: Injector,
    private http: HttpClient
  ) {}

  // sanitizeVideoUrl
  sanitizeVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // getHttpOptions
  getHttpOptions() {
    return this.defaultHttpOptions;
  }

  // getVideoId
  getVideoId(link: string): string {
    // link might be just "youtu.be/dXX4zFmay9A" or "youtube.com/watch?v=..."
    let cleanLink = link.trim();
    if (cleanLink.includes('youtu.be/')) {
      return cleanLink.split('youtu.be/')[1];
    }
    if (cleanLink.includes('watch?v=')) {
      return cleanLink.split('watch?v=')[1].split('&')[0];
    }
    return cleanLink;
  }

  // getYoutubeLinks
  getYoutubeLinks(rawLinks: string): string[] {
    return rawLinks
      .split('https://')
      .filter(x => x)
      .map(x => 'https://' + x);
  }

  // getSafeUrl
  getSafeUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  // stripHtml
  stripHtml(value: string): string {
    return value ? value.replace(/<[^>]+>/g, '') : '';
  }

  // getInitials
  getInitials(name: string): string {
    if (!name) return '';
    // split_by_whitespace
    const parts = name.trim().split(/\s+/);
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  }

  // // usernameAvailabilityValidator
  // usernameAvailabilityValidator(mAuthService: AuthService): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     if (!control.value) {
  //       return of(null);
  //     }
  //     return of(control.value).pipe(
  //       debounceTime(300),
  //       switchMap(username =>
  //         mAuthService.isUsernameTaken(username).pipe(
  //           map(isTaken => (isTaken ? { usernameTaken: true } : null)),
  //           catchError(() => of(null)) // optional: suppress backend errors
  //         )
  //       ),
  //       first()
  //     );
  //   };
  // }

  // noSpaceValidator
  noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    return control.value && /\s/.test(control.value) ? { hasSpace: true } : null;
  }

  // hasRoles
  hasRoles(roles: any[]): boolean {
    const authService = this.injector.get(AuthService);
    const currentUser = authService?.currentUser;
    if (!currentUser) {
      return false;
    }
    const { role_id } = currentUser;
    return roles.includes(role_id);
  }

  // formatMemory
  formatMemory(bytes: number): string {
    if (bytes >= 1_000_000_000) {
      return (bytes / 1_000_000_000).toFixed(2) + ' GB';
    } else if (bytes >= 1_000_000) {
      return (bytes / 1_000_000).toFixed(2) + ' MB';
    } else if (bytes >= 1_000) {
      return (bytes / 1_000).toFixed(2) + ' KB';
    }
    return bytes + ' B';
  }

  // getDeviceType
  getDeviceType(): any {
    const ua = navigator.userAgent;
    if (/Laptop|Macintosh|Windows|Linux/i.test(ua)) {
      return 1;
    } else if (/Mobi|Android.*Mobile|iPhone|iPod|Windows Phone/i.test(ua)) {
      return 2;
    } else if (/SmartTV|TV|BRAVIA|AppleTV|GoogleTV|HbbTV/i.test(ua)) {
      return 4;
    } else if (/PlayStation|Xbox|Nintendo/i.test(ua)) {
      return 5;
    } else if (/iPad|Tablet|Nexus 7|Android(?!.*Mobile)/i.test(ua)) {
      return 3;
    } else {
      return 6; // 'Other'
    }
  }

  // getPublicIpAddress
  async getPublicIpAddress(): Promise<string> {
    try {
      const response: any = await firstValueFrom(
        this.http.get('https://api.ipify.org?format=json')
      );
      return response.ip;
    } catch (error) {
      console.error('Failed to fetch IP address', error);
      return '';
    }
  }

}
