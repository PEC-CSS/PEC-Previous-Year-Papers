import React from 'react';
import { useState } from 'react';
import { signInWithGoogle } from './firebase/firebase';
import { Button } from '@mui/material';
import firebase from './firebase/firebase.js';
import NewFile from './NewFile';

const Login = () => {
    const [isUserSignedIn, setisUserSignedIn] = useState(false);
    const signOut = () => {
        firebase.auth().signOut();
    }
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setisUserSignedIn(true);
        } else {
            setisUserSignedIn(false);
        }
    })
    if (isUserSignedIn === true) {
        return (
            <div style={{ display: "flex" }}>
                <div style={{ paddingRight: "10px" }}>
                    <NewFile />
                </div>
                <div onClick={signOut}>
                    <Button className='signedinButton' variant="contained">
                        Sign Out
                    </Button>
                </div>
            </div>
        )
    } else {
        return (
            <div onClick={signInWithGoogle}>
                <Button className='signinButton' style={{ backgroundColor: "red" }} variant="contained" >
                    Upload File
                </Button>
            </div>
        )
    }

}

export default Login;