// import { CanActivateFn } from '@angular/router';

// export const WithProfileGuard: CanActivateFn = (route, state) => {
//   return true;
// };



// with-profile.guard.ts
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

@Injectable({
  providedIn: 'root'
})

export class WithProfileGuard implements CanActivate, CanActivateChild {
  constructor(private mAuthService: AuthService, private router: Router) {}


  private check(url: string): boolean | UrlTree {

    const mCurrentUser = this.mAuthService.currentUser;
    // console.log(mCurrentUser);
    const isAdmin = mCurrentUser.role_id === 1; // assuming role_id is a number
    // const hasDob = !!mCurrentUser.dob; // covers undefined, null, empty string
    const hasClassLevelId = !!mCurrentUser.class_level_id; // covers undefined, null, empty string
    if (!hasClassLevelId && !isAdmin) {
    // if (!mCurrentUser.dob && mCurrentUser.role_id!==1) {
      return this.router.createUrlTree(['/auth/profile'], {
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
