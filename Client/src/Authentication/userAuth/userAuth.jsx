import React, { useContext } from 'react';
import { authContext } from '../AuthProvuider/AuthProvider';

const UserAuth = () => {
    const {user,createUser,login,googleLogin,logout,loading} = useContext(authContext)
    return {user,createUser,login,googleLogin,logout,loading}
}

export default UserAuth;
