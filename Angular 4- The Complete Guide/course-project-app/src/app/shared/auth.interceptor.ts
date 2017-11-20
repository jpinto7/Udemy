import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AppState } from './../store/app.reducers';
import * as Auth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: Auth.State) => {
      const copiedReq = req.clone({
        params: req.params.append('auth', authState.token)
      });
      return next.handle(copiedReq);
    });
  }
}
