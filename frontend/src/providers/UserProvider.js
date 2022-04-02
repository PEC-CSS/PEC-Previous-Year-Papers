import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase";

export const UserContext = createContext({user: null})

export default (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(async (userCred) => {
            if(!userCred) {
                setUser(null);
                setToken(null);
            }
            else {
                const { displayName, email, emailVerified }  = userCred;
                const token = await userCred.getIdToken();
                console.log(token)
                setUser({
                    displayName,
                    email,
                    emailVerified,
                })

                setToken(token);
            }
        })
    },[])

    return (
        <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    )
}