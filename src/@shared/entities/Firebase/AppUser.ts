import firebase from "firebase/compat"

export class AppUser {

  email: string;
  displayName: string;

  constructor(props?: any) {
    if (props) {
      this.email = props.email;
      this.displayName = props.displayName;
    }
  }

  /** 從Firebase User取得一部分使用者資訊 */
  setInformationFromFirebaseUser(user: firebase.User) {
    this.email = user.email;
    this.displayName = user.displayName;
  }

  /** 轉換成JSON在Dto做掉 */
  toJSON() {
    return { email: this.email, displayName: this.displayName }
  }
}
