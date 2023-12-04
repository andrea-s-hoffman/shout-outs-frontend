import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBLgRxNIoyF0CHlVEj9LQnopVoUbhSObQ",
  authDomain: "shoutouts-1eb50.firebaseapp.com",
  projectId: "shoutouts-1eb50",
  storageBucket: "shoutouts-1eb50.appspot.com",
  messagingSenderId: "178597936222",
  appId: "1:178597936222:web:94de96feedf92f5fff08cf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
