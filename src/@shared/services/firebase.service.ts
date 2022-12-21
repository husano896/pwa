import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService  {

  private user?: firebase.User | null;
  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // 偵測登入狀態
    this.afAuth.authState.subscribe(u => {
      console.log('登入使用者：', u);
      this.user = u;
    });
  }

  get User() {
    return this.user;
  }

  get AuthState() {
    return this.afAuth.authState;
  }

  LoginWithGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  Logout() {
    this.afAuth.signOut();
  }
}
