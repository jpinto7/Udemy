import { Action } from '@ngrx/store';
import { SIGNIN, SIGNUP, TRY_SIGNUP, TRY_SIGNIN, LOGOUT, SET_TOKEN } from './auth.constants';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { email: string, password: string }) {}
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { email: string, password: string }) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = (
  TrySignup |
  Signup |
  TrySignin |
  Signin |
  Logout |
  SetToken
);
