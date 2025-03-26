import { defineStore } from "pinia";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

interface SignUpData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export const useAuthStore = defineStore("authStore", {
  state: (): {
    userId: string;
  } => ({
    userId: "",
  }),
  actions: {
    async checkAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log("user : ", user);
            this.userId = user.uid;
            resolve(true);
          } else { 
            console.log("user is not login");
            resolve(false);
          }
        });
      });
    },
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      console.log("login with google");
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        this.userId = user.uid;
        console.log("Login success : ", user);
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
        console.log("signout success !!");
      } catch (error) {
        console.log("error from signout : ", error);
      }
    },
  },
});
