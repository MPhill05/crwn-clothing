import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDr0YE4RcL7lkfdQ0L6BzZ-xAtFE41tb08",
    authDomain: "crwn-db-4650c.firebaseapp.com",
    databaseURL: "https://crwn-db-4650c.firebaseio.com",
    projectId: "crwn-db-4650c",
    storageBucket: "crwn-db-4650c.appspot.com",
    messagingSenderId: "799011232109",
    appId: "1:799011232109:web:a6997eb6dc20295f396264",
    measurementId: "G-T5FF5TXCDZ"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;