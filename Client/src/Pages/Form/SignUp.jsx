import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserAuth from '../../Authentication/userAuth/userAuth'
import { updateProfile } from 'firebase/auth';
import auth from '../../Authentication/Firebase/Firebase.config';
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa6';
import { CiWarning } from "react-icons/ci";
import AxiosBase from '../../Axios/AxiosBase';
const SignUp = () => {
    const [error,setError] = useState();
    const [usernameStatus,setUsernameStatus] = useState([]);
    const [usernameChecking,setUsernameChecking] = useState(false);

    const {createUser} = UserAuth()
    const handleSubmit = (e)=>{
        e.preventDefault()
        setError('')
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const username = form.username.value;
        const photo = '';
        const email = form.email.value;
        const password = form.password.value;
        const conPass = form.conPass.value;
        const accountStatus = {
            isBan: false
        }
        const role = 'client'
        if(firstName.length < 2 || lastName.length < 2 ){
          setError('First Name & Last Name At least 3 character')
          return;
        }
        else if(password.length < 6){
            setError('Password must be al least 6 character')
            return
        }
        else if(password !== conPass){
            setError(`Both Password does't match`)
            return;
        }
      
        const user = {firstName,lastName,username,role,photo,password,accountStatus}
        createUser(email,password)
        .then(res =>{
            updateProfile(auth.currentUser,{
        displayName : firstName + ' ' + lastName
            })
          
              AxiosBase().post('/user-registration',user)
              .then(res =>{
               if(res.data.insertedId){
                Swal.fire({
                    title: "Registration Successful",
                    text: "Thank You For Joining With US!",
                    icon: "success",
                    iconColor: '#0d6efd',
                    background:'#f3f7fd'
                  });
                form.reset();
               }
              })
             
        })
        .catch(err=>{
            if(err.message == 'Firebase: Error (auth/email-already-in-use).'){
                setError('You already have an account')
            }
            else{
                setError(err.message)
            }
          
        })
    }
    const checkUsername = (e)=>{
        setUsernameChecking(true)
        AxiosBase().post('/check-username',{username:e.target.value})
        .then(res =>{
            setUsernameChecking(false);
            if(res.data.status){
             setUsernameStatus([e.target.value,true])
            }
            else{
            setUsernameStatus([e.target.value,false])
            }
        })
    }
   
    return (
        <div className='flex justify-center  md:py-20 py-10 font-jost lg:px-0 px-2'>
            <form className='md:w-1/2 w-full ' onSubmit={handleSubmit}>
             <h1 className='md:text-7xl text-5xl text-center font-bold'>Sign <span className='text-color_primary  '>Up</span></h1>
            {
                error &&  <div className=' bg-[#f9dede] text-color_danger p-5 mt-5 rounded-lg border border-color_warning flex justify-between items-center'>
                <h2>{error}</h2> <CiWarning className='text-3xl'></CiWarning>
             </div>
            }
            <div className='py-5  grid lg:grid-cols-2 gap-5'>
            <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>First Name</h3>
                        <input type="text" name='firstName' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your First Name'/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Last Name</h3>
                        <input type="text" name='lastName' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Last Name' required/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Username</h3>
                        <input type="text" name='username' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='rakib907' onChange={checkUsername} required/>
                      <div className='pt-2'>
                      {usernameChecking ? <span className="loading loading-dots loading-xs"></span> : !usernameStatus[1]  ?  <div className=' text-color_success '>
                            {usernameStatus[0]} </div> : <div className=' text-color_danger'>{usernameStatus[0]} Already in use</div>}
                      </div>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Email</h3>
                        <input type="text" name='email' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Email' required/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Password</h3>
                        <input type="text" name='password' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Password' required/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Confirm Password</h3>
                        <input type="text" name='conPass' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Enter Password Again' required/>
                        </div>
                       
            </div>
           <div className='flex md:flex-row flex-col-reverse justify-between md:items-center'>
            <p>Already Have An Account ? <Link className='text-color_primary font-semibold' to={'/sign-in'}>Sign in</Link></p>
           <button className='py-3 px-  bg-color_primary md:w-1/2 w-full text-white text-xl rounded-md'>Sign Up</button>
           </div>
            </form>
        </div>
    );
}

export default SignUp;
