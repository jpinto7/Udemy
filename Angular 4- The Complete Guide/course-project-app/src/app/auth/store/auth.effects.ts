import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { TRY_SIGNUP, TRY_SIGNIN, LOGOUT } from './auth.constants';
import { TrySignup, TrySignin, Signin, Signup, SetToken } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(TRY_SIGNUP)
    .map((action: TrySignup) => action.payload)
    .switchMap(({ email, password }: { email: string, password: string }) => {
      return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(email, password));
    })
    .switchMap(() => {
      return Observable.fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [
        new Signup(),
        new SetToken(token)
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(TRY_SIGNIN)
    .map((action: TrySignin) => action.payload)
    .switchMap(({ email, password }: { email: string, password: string }) => {
      return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(email, password));
    })
    .switchMap(() => {
      return Observable.fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        new Signin(),
        new SetToken(token)
      ];
    });

  @Effect({ dispatch: false })
  authLogout = this.actions$
    .ofType(LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

  constructor(private actions$: Actions, private router: Router) {}
}
