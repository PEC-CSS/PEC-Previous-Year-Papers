import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase"

export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(!user) {
                setUser(null);
                console.log(localStorage.getItem('accessToken'))
            }
            else {
                const { displayName, email, emailVerified }  = user;
                console.log(localStorage.getItem('accessToken'))
                setUser({
                    displayName,
                    email,
                    emailVerified,
                })
            }
        })
    },[])

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    )
}