import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUser } from '@shared/entities/Firebase/AppUser';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private user?: firebase.User;
  private appUser?: AppUser;
  private appUserSubscription?: Subscription;

  public user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) {
    // 偵測登入狀態
    this.user$ = this.afAuth.authState;
    this.user$.subscribe(u => {
      console.log('登入使用者：', u);
      this.user = u;

      // 如果有前次的使用者訂閱監聽, 取消
      if (this.appUserSubscription) {
        this.appUserSubscription.unsubscribe();
        this.appUserSubscription = null;
      }

      // AppUser的處理
      if (u) {
        const doc = this.afStore.doc(this.userDocumentPath);
        this.appUserSubscription = this.afStore.doc(this.userDocumentPath)
          .snapshotChanges()
          .subscribe({
            next: (snapshot) => {
              if (snapshot.payload.exists) {
                this.appUser = new AppUser(snapshot.payload.data({ serverTimestamps: 'estimate' }))
              } else {
                this.appUser = new AppUser();
                this.appUser.setInformationFromFirebaseUser(u);
                doc.set(this.appUser.toJSON());
              }
              console.log(this.appUser);
            }
          })
      }
    });
  }

  private get userDocumentPath() {
    return `/PWA/Users/${this.user.uid}/AppUser`
  }
  get User() {
    return this.user;
  }

  get AppUser() {
    return this.appUser;
  }
  get AuthState() {
    return this.afAuth.authState;
  }

  LoginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  Logout() {
    return this.afAuth.signOut();
  }
}
