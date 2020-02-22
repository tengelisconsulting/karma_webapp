import { Injectable } from '@angular/core';

import { HttpService } from "./http.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
  ) { }

  public async authenticate(
    username: string,
    password: string
  ): Promise<string> {
    const authRes = await this.httpService.apiRequest({
      method: "POST",
      path: "/auth/authenticate/username-password",
      data: {
        username: username,
        password: password,
      },
    });
    if (!authRes.ok) {
      return null;
    }
    const token = await authRes.json();
    console.debug("authentication success, received token: ", token);
    return token;
  }

  public async attemptRenewSession(): Promise<string> {
    const res = await this.httpService.apiRequest({
      method: "POST",
      path: "/auth/session/refresh",
    });
    if (!res.ok) {
      return null;
    }
    const token = await res.json();
    console.debug("session renew success, received token: ", token);
    return token;
  }

  // public async checkSessionActive(): Promise<boolean> {
  //   const userIdRes = await this.httpService.apiRequest({
  //     method: "GET",
  //     path: "/auth/session/user-id",
  //   });
  //   console.log(userIdRes);
  //   return true;
  // }

}
