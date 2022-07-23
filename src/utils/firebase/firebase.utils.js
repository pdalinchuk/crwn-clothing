import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA1riCyzfgKmaYKhUx_ReOh0uXRBhVtFTk',
  authDomain: 'crwn-clothing-db-8e04d.firebaseapp.com',
  projectId: 'crwn-clothing-db-8e04d',
  storageBucket: 'crwn-clothing-db-8e04d.appspot.com',
  messagingSenderId: '1093014123935',
  appId: '1:1093014123935:web:185bf52197abe11ae8f9aa',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if user data doesn't exist -- create / set the document with the data from userAuth in collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log(`Error creating the user`, err.message);
    }
  }

  // if user data exists -- return userDocRef
  return userDocRef;
};
