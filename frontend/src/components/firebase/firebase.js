import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDhVuvGVr_uEOMRMrwGwINpPWB0ezYftIc",
    authDomain: "pec-papers.firebaseapp.com",
    projectId: "pec-papers",
    storageBucket: "pec-papers.appspot.com",
    messagingSenderId: "91724236432",
    appId: "1:91724236432:web:92e45c1b025d7129103a15"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
    firebase.auth().signInWithPopup(googleProvider).then((res) => {
        console.log(res.user);
    }).catch((error) => {
        console.log(error);
    })
}
export default firebase;