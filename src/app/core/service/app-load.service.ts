import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionState } from '../state/session.state';
import { Router } from '@angular/router';
import { AppRoutePath } from '../routing/AppRoutePath';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  private readonly DEFAULT_ROUTE_PATH = [
    AppRoutePath.APP_PREFIX,
    AppRoutePath.LANDING,
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionState: SessionState,
  ) {}

  public async startupAttemptOnAppLoad(): Promise<boolean> {
    const sessionToken = await this.authService.attemptRenewSession();
    if (!sessionToken) {
      console.log("failed to renew session");
      this.sessionState.clearSession();
      return false;
    }
    console.log("session renewed successfully, token: ", sessionToken);
    this.startup(sessionToken);
    return true;
  }

  public async startupFromLogin(
    username: string,
    password: string
  ): Promise<boolean> {
    const sessionToken = await this.authService.authenticate(
      username,
      password
    );
    if (!sessionToken) {
      return false;
    }
    this.startup(sessionToken);
    return true;
  }

  private startup(
    sessionToken: string
  ): void {
    // load permissions, anything else that goes in the state session
    this.sessionState.initSession(sessionToken, []);
    this.router.navigate(this.DEFAULT_ROUTE_PATH);
  }

}
