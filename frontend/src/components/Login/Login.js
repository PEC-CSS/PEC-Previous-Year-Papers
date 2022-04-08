import React, {useContext} from 'react';
import { signInWithGoogle, signOut } from '../../services/firebase';
import { Button } from '@mui/material';
import { UserContext } from '../../providers/UserProvider';
import FileUpload from '../FileUpload/FileUpload';

const Login = () => {
    const {user} = useContext(UserContext);

    if (user) {
        return (
            <div style={{ display: "flex" }}>
                <div style={{ paddingRight: "10px" }}>
                    <FileUpload />
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