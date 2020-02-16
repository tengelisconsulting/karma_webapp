import { Injectable } from '@angular/core';
import * as _ from "lodash";
import { never } from 'rxjs';

import { RunTimeEnvService } from './run-time-env.service';


interface AppHttpRequest {
  method: "GET" | "POST";
  path: string;
  data?: any;
  headers: {
    [index: string]: string
  };
  cache: RequestCache,
  mode?: RequestMode,
  credentials?: RequestCredentials,
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private API_HOST: string;

  private readonly baseReqDefaults: AppHttpRequest = {
    method: "GET",
    path: "",
    headers: {
      "content-type": "application/json",
    },
    cache: "default",
    credentials: "include",
  };

  constructor(
    private runTimeEnvService: RunTimeEnvService,
  ) {
    this.runTimeEnvService.getEnv$(never())
      .subscribe((env) => this.API_HOST = env.apiHost);
  }

  public apiRequest(req: Partial<AppHttpRequest>): Promise<Response> {
    return this.doRequest(
      _.merge({}, this.baseReqDefaults, req)
    );
  }

  private doRequest(req: AppHttpRequest): Promise<Response> {
    console.debug("http request: ", req);
    const request = new Request(
      `${this.API_HOST}${req.path}`, _({
        method: req.method,
        headers: new Headers(req.headers),
      })
        .merge(req.data ? {
          body: JSON.stringify(req.data),
        }: {})
        .value()
    );
    const requestInit: RequestInit = {
      cache: req.cache,
      mode: req.mode,
      credentials: req.credentials,
    };
    return fetch(
      request, requestInit
    );
  }

}
