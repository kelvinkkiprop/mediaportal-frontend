// src/app/core/app-context.service.ts
import { Injectable, Injector } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { catchError, debounceTime, first, map, Observable, of, switchMap } from 'rxjs';

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
    private injector: Injector
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

}
