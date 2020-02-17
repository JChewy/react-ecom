import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCNA2YVXadJXUwbTUfXPFq_1ysT80L3o3c",
    authDomain: "artificial-icons.firebaseapp.com",
    databaseURL: "https://artificial-icons.firebaseio.com",
    projectId: "artificial-icons",
    storageBucket: "artificial-icons.appspot.com",
    messagingSenderId: "618658761534",
    appId: "1:618658761534:web:114deb103f3a33c2847a6f",
    measurementId: "G-J73RP8BJNP"
}

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
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//oauth
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;