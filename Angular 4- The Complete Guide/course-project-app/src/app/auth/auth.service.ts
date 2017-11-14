import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token = null;

  constructor(private router: Router) {}

  private assignToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      });
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        this.assignToken();
      })
      .catch(error => {
        console.log(error);
      });
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken(): string {
    this.assignToken();
    return this.token;
  }

  isAuthenticated() {
    return this.token !== null;
  }
}
