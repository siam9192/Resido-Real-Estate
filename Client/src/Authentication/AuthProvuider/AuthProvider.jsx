import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase.config';
export const authContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);
    // auth related all functions
    const createUser = (email,password)=>{
        setLoading(true)
   return  createUserWithEmailAndPassword(auth,email,password);
    }
    const login = (email,password) =>{
        setLoading(true)
    return signInWithEmailAndPassword(auth,email,password);
    }
    const googleLogin = ()=>{
        setLoading(true)
    return signInWithPopup(auth,new GoogleAuthProvider)
    }
    const logout = ()=>{
        setLoading(true)
        signOut(auth)
    }
    useEffect(()=>{
        const observer = onAuthStateChanged(auth,(currentUser)=>{
            setLoading(true)
        if(currentUser){
        setUser(currentUser)
        setLoading(false)
        }
        else{
            setUser(null)
            setLoading(false)
        }
        })
        return ()=> observer();
    },[])
    
    return (
        <div>
        <authContext.Provider value={{user,createUser,login,googleLogin,logout,loading}}>
        {children}
        </authContext.Provider>
        </div>
    );
}

export default AuthProvider;
