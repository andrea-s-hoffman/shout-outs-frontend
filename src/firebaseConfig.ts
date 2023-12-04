const configOptions = import.meta.env.VITE_FIREBASE_CONFIG.split("/");

export const firebaseConfig = {
  apiKey: configOptions[0],
  authDomain: configOptions[1],
  projectId: configOptions[2],
  storageBucket: configOptions[3],
  messagingSenderId: configOptions[4],
  appId: configOptions[5],
};
