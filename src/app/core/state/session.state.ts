import { Injectable } from "@angular/core";
import { merge } from "lodash";
import { never, Observable } from 'rxjs';
import { takeUntil, map, filter, startWith } from 'rxjs/operators';

import { State } from './state';


interface InternalState {
  isStarted: boolean;
  permissions: string[];
  sessionToken: string;
  urlBeforeSessionExpire: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionState {

  private get EMPTY_STATE(): InternalState  {
    return {
      isStarted: false,
      permissions: [],
      sessionToken: null,
      urlBeforeSessionExpire: null,
    };
  };

  private internalState: State<InternalState> = new State(
    never(), merge({}, this.EMPTY_STATE, {
      isStarted: null,          // until we've attempted one load, we don't know the started state
    })
  );

  public initSession(
    sessionToken: string,
    permissions: string[],
  ): void {
    this.internalState.update({
      sessionToken: sessionToken,
      permissions: permissions,
      isStarted: true,
    });
  }

  public clearSession(): void {
    this.internalState.update(this.EMPTY_STATE);
  }

  public isAuthenticated(): boolean {
    return !!this.internalState.value.sessionToken;
  }

  public setUrlBeforeSessionExpire(
    url: string
  ): void {
    this.internalState.update({
      urlBeforeSessionExpire: url,
    });
  }

  public getStartedStream(
    until$: Observable<any>
  ): Observable<boolean> {
    return this.internalState.changeStream().pipe(
      takeUntil(until$),
      filter((change) => change.isStarted !== undefined),
      map((change) => change.isStarted),
      startWith(this.internalState.value.isStarted)
    );
  }

}
