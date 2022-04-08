import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDhVuvGVr_uEOMRMrwGwINpPWB0ezYftIc",
    authDomain: "pec-papers.firebaseapp.com",
    projectId: "pec-papers",
    storageBucket: "pec-papers.appspot.com",
    messagingSenderId: "91724236432",
    appId: "1:91724236432:web:92e45c1b025d7129103a15"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log("Logged In");
    }).catch((error) => {
        console.log(error);
    })
}

export const signOut = () => {
    auth.signOut().then(()=> {
        console.log('Logged Out');
    }).catch((error) => {
        console.log(error.message);
    })
}