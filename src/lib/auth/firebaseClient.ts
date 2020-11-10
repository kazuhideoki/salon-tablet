import * as firebase from "firebase/app";
import 'firebase/auth';

const firebaseClient = firebase.default

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  const CLIENT_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: "myproject-123.appspot.com",
    // messagingSenderId: "123412341234",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };