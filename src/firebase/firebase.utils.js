import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA--jLyuullxBq7H8U2VujzwswILTes3wA",
  authDomain: "crwn-db-b90c5.firebaseapp.com",
  databaseURL: "https://crwn-db-b90c5.firebaseio.com",
  projectId: "crwn-db-b90c5",
  storageBucket: "crwn-db-b90c5.appspot.com",
  messagingSenderId: "645870761803",
  appId: "1:645870761803:web:daf925f13e5cd8b6e39ace",
  measurementId: "G-VPEMW2RJM6"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
