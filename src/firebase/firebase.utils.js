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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error){
      console.log("Error creating user: ", error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log("Collections: ", collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
}

export const converCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc =>  {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title).toLowerCase(),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  },{});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;