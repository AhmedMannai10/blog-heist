import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore();
export const storage = getStorage();


export async function getUserWithUsername(username){

    const userRef = collection(firestore, "users") ;
    const q = query(userRef,  where("username", "==", username).limit(1));
    const userDoc = (await getDocs(q)).docs[0];
    return userDoc;
}