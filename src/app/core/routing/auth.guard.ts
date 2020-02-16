import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, never } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { SessionState } from '../state/session.state';
import { AppRoutePath } from './AppRoutePath';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionState: SessionState,
    private router: Router,
  ) {}

  public canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sessionState.getStartedStream(never()).pipe(
      filter((isStarted) => isStarted !== null),
      map((isStarted) => {
        // can check for permissions on the next route
        if (!isStarted) {
          const intendedRoute = state.url;
          console.log(
            "no session - redirect to login and save intended route:",
            intendedRoute
          );
          this.sessionState.setUrlBeforeSessionExpire(intendedRoute);
          this.router.navigate([AppRoutePath.LOGIN]);
        }
        return isStarted;
      })
    );
  }

}
