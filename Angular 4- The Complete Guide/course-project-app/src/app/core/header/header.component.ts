import { Component, OnInit } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Auth from '../../auth/store/auth.reducers';
import { AppState } from './../../store/app.reducers';
import { Logout } from '../../auth/store/auth.actions';
import { FetchRecipes, StoreRecipes } from './../../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<Auth.State>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
