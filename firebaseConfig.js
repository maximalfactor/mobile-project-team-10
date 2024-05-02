import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth"

const firebaseConfig = {

    apiKey: "AIzaSyCMW4xLl7NunZErHayYPOqSeeH4voeFsAU",
    authDomain: "mediam-65236.firebaseapp.com",
    projectId: "mediam-65236",
    storageBucket: "mediam-65236.appspot.com",
    messagingSenderId: "329533684088",
    appId: "1:329533684088:web:da93514afd958fadeef08d"
  };
  


// Initialize Firebase

 const FIREBASE_APP = initializeApp(firebaseConfig);
 const FIREBASE_AUTH = getAuth(FIREBASE_APP);

 export { FIREBASE_APP, FIREBASE_AUTH}