import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.NEXT_PUBLIC_APPID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
