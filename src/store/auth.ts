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

import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { RegisterFormData, UserInfo } from "../types/user";

export const useAuthStore = defineStore("authStore", {
  state: (): {
    userId: string;
    userInfo: UserInfo;
    role: string;
    isLoading: boolean
  } => ({
    userId: "",
    role: "",
    isLoading: false,
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

              if (user.displayName && userInfo.name !== user.displayName) {
                const colRef = collection(db, "users");
                await updateDoc(doc(colRef, uid), { name: user.displayName })
              }
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
        this.isLoading = true
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
        setTimeout(() => {
          this.isLoading = false
        }, 1000);
      } catch (error) {
        console.log("error from load user info : ", error);
      }
    },
    async updateUserInfo(userData: UserInfo) {
      try {
        const uid: string = this.userId;
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, userData as Partial<UserInfo>);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: userData.name
          });
        } else {
          throw new Error("No authenticated user found.");
        }
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        console.log("error login google: ", error);
      }
    },
    async signUp(data: RegisterFormData) {
      const { email, password, name } = data;
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email.toLocaleLowerCase(),
          password
        );
        // update user name
        await updateProfile(response.user, {
          displayName: name,
        });

        await this.checkAuth();
      } catch (error) {
        if (error instanceof Error) {
          console.log("error from signup : ", error);
          const errMsg = error.message;
          if (errMsg === "Firebase: Error (auth/email-already-in-use).") {
            throw new Error("Email is already used");
          }
        }
      }
    },
    async signIn(email: string, password: string) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof Error) {
          const errMsg = error.message;
          if (errMsg === "Firebase: Error (auth/user-not-found).") {
            throw new Error("User does not exist");
          }
          throw new Error(error.message);
        }
      }
    },
    async signout() {
      try {
        await signOut(auth);
        window.location.reload();

      } catch (error) {
        console.log("error from signout : ", error);
      }
    },
    async updateProfileImage(userId: string, imgUrl: string) {
      try {
        const docSnap = doc(db, "users", userId)
        await updateDoc(docSnap, {
          "profileImg": imgUrl
        })
      } catch (error) {
        if (error instanceof Error) {
          console.log('error from update profile image : ', error.message)
        }
      }
    }
  },
});
