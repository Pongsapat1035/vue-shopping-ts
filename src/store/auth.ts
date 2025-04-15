import { defineStore } from "pinia";
import { auth, db } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { collection, doc, getDoc, setDoc } from "firebase/firestore";

interface SignUpData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface AddressInfo {
  name: string;
  tel: string;
  address: string;
  district: string;
  province: string;
  postcode: string;
}

interface UserInfo {
  name: string;
  email: string;
  profileImg: string;
  role: string;
  addressInfo: AddressInfo;
}

export const useAuthStore = defineStore("authStore", {
  state: (): {
    userId: string;
    userInfo: UserInfo;
    role: string;
  } => ({
    userId: "",
    role: "",
    userInfo: {
      name: "",
      email: "",
      profileImg: "",
      role: "",
      addressInfo: {
        name: "",
        tel: "",
        address: "",
        district: "",
        province: "",
        postcode: "",
      },
    },
  }),
  actions: {
    async checkAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const uid = user.uid;
            this.userInfo.name = user.displayName || "";
            this.userInfo.email = user.email || "";
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              // user exist
              const userInfo = docSnap.data();
              this.role = userInfo.role;
            } else {
              // new user
              const colRef = collection(db, "users");
              await setDoc(doc(colRef, uid), {
                role: "client",
                name: user.displayName,
                addressInfo: {
                  name: "",
                  address: "",
                  tel: "",
                  district: "",
                  province: "",
                  postcode: "",
                },
              });
              this.role = "client";
            }
            this.userId = user.uid;
            resolve(true);
          } else {
            console.log("user is not login");
            resolve(false);
          }
        });
      });
    },
    async loadUserInfo() {
      try {
        const uid: string = this.userId;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { name, profileImg, addressInfo, role } = docSnap.data();
          this.userInfo.name = name;
          this.userInfo.profileImg = profileImg;
          this.userInfo.addressInfo = addressInfo;
          this.userInfo.role = role;
        }
      } catch (error) {
        console.log("error from load user info : ", error);
      }
    },
    async updateUserInfo(userData: UserInfo) {
      console.log("Update user : ", userData);
      try {
        const uid: string = this.userId;
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, userData);
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        console.log("Login success : ");
      } catch (error) {
        console.log("error login google: ", error);
      }
    },

    async signUp(data: SignUpData) {
      const { email, password, name } = data;
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // update user name
        await updateProfile(response.user, {
          displayName: name,
        });
      } catch (error) {
        console.log("error from signup : ", error);
      }
    },

    async signIn(email: string, password: string) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("login success !!");
      } catch (error) {
        console.log("error from sign in : ", error);
      }
    },

    async signout() {
      try {
        await signOut(auth);
        window.location.reload();
        console.log("signout success !!");
      } catch (error) {
        console.log("error from signout : ", error);
      }
    },
  },
});
