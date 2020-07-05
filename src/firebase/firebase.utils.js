import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD_NfBtAvq-ktMzWcEtKGFqj0mr7sKIX1U",
  authDomain: "crown-db-d72b2.firebaseapp.com",
  databaseURL: "https://crown-db-d72b2.firebaseio.com",
  projectId: "crown-db-d72b2",
  storageBucket: "crown-db-d72b2.appspot.com",
  messagingSenderId: "299058651106",
  appId: "1:299058651106:web:a47dbdc04624decd9763bb"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;