import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppState } from './../store/app.reducers';
import * as Auth from '../auth/store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .take(1)
      .map((authState: Auth.State) => authState.isAuthenticated);
  }
}
