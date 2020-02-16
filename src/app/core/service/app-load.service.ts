import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionState } from '../state/session.state';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor(
    private authService: AuthService,
    private sessionState: SessionState,
  ) {}

  public async startup(): Promise<void> {
    const sessionToken = await this.authService.attemptRenewSession();
    if (!sessionToken) {
      console.log("failed to renew session");
      this.sessionState.clearSession();
      return;
    }
    console.log("session renewed successfully, token: ", sessionToken);
    // load permissions, anything else that goes in the state session
    this.sessionState.initSession(sessionToken, []);
  }
}
