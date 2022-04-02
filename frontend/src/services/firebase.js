import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBws3LqF72aWgGdiQiTIgX7yVfS29-EQPU",
    authDomain: "pec-papers-ffae5.firebaseapp.com",
    projectId: "pec-papers-ffae5",
    storageBucket: "pec-papers-ffae5.appspot.com",
    messagingSenderId: "1006430856817",
    appId: "1:1006430856817:web:5ed9755bb423032c931dd0",
    measurementId: "G-Y5S7GTRD5F"
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