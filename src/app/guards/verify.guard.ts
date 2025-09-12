// import { CanActivateFn } from '@angular/router';

// export const verifyGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   Router,
//   UrlTree,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class VerificationGuard implements CanActivate {
//   constructor(private mAuthService: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean | UrlTree {

//     // return true;
//     const currentUser = this.mAuthService.currentUser;
//     // console.log(currentUser.email_verified_at);
//     if (currentUser.email_verified_at===null) {
//       // Email not verified
//       this.router.navigateByUrl('/auth/verify');
//       return false;
//     }

//     // proceed
//     return true;
//   }
// }





// verify.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class VerificationGuard implements CanActivate, CanActivateChild {
  constructor(private mAuthService: AuthService, private router: Router) {}


  private check(url: string): boolean | UrlTree {

    const mCurrentUser = this.mAuthService.currentUser;
    // console.log(mCurrentUser);
    // if (!this.auth.isLoggedIn()) {
    if (!mCurrentUser) {
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: url },
      });
    }
    // if (!this.auth.isEmailVerified()) {
    if (mCurrentUser.email_verified_at===null) {
      return this.router.createUrlTree(['/auth/verify'], {
        queryParams: { returnUrl: url },
      });
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.check(state.url);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.check(state.url);
  }
}
