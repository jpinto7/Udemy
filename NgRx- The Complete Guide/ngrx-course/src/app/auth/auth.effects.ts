import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => (
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action => {
        localStorage.setItem('user', JSON.stringify(action.user));
      })
    )
  ), { dispatch: false });

  logout$ = createEffect(() => (
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      })
    )
  ), { dispatch: false });

  constructor(private actions$: Actions, private router: Router) {}
}
