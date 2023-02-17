import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUser } from '@shared/entities/Firebase/AppUser';
import firebase from 'firebase/compat/app';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private user?: firebase.User;
  private appUser?: AppUser;
  private appUserSubscription?: Subscription;

  public user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private webServ: WebService) {
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
        const doc = this.afStore.doc(this.getDocumentPath('AppUser'));
        this.appUserSubscription = doc
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
  getDocumentPath(appName: string) {
    return `/PWA/Users/${this.user.uid}/${appName}`
  }

  /** 建立同步用的聆聽通道
   * @param appName 功能名稱
   */
  createSyncDataPipe(appName: string) {
    return this.user$
      .pipe(
        switchMap((user) => {
          if (!user) {
            return of(null);
          }
          return this.afStore.doc(this.getDocumentPath(appName)).snapshotChanges()
        }),
        /*
        map((snapshot) => {
          // 無User導致snapshot = null時, 不動作
          if (!snapshot) {
            return;
          }


          const data = snapshot.payload.exists ? snapshot.payload.data() : null;
        })*/
      )
  }
  /** 儲存該功能資料
   * @param appName 功能名稱
   * @param data 要儲存的資料
   */
  saveSyncData(appName: string, data: any) {
    if (!this.user || !this.webServ.autoSync) {
      return Promise.resolve();
    }
    const doc = this.afStore.doc(this.getDocumentPath(appName));
    return doc.set(data).then(()=>data)
  }

  /** 目前的Firebase使用者 */
  get User() {
    return this.user;
  }

  /** 目前的全站App使用者 */
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
