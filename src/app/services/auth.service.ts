import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private afa: AngularFireAuth) { 
    this.afa.authState.subscribe( authState => {
      this.authState = authState;
    });
  }
  
  login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout() {
    return this.afa.signOut().then(() => {
    });
  }

  getAuth() {
    return this.afa;
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get isEmailVerified(): boolean {
    return this.isAuthenticated ? this.authState.emailVerified : false;
  }

  get userData(): any {
    if ( ! this.isAuthenticated ) {
      return [];
    }
  
    return [
      {
        id: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoURL: this.authState.photoURL,
      }
    ];
  }
}