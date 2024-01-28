import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserAuth from '../../Authentication/userAuth/userAuth';
import AxiosBase from '../../Axios/AxiosBase';
import { CiWarning } from 'react-icons/ci';
import { SlEye, SlEyeglass } from "react-icons/sl";
import { FaRegEyeSlash } from "react-icons/fa";
const SignIn = () => {
    const [error,setError] = useState('');
    const [toggle,setToggle] = useState(false);
    const {login,logout} = UserAuth();
    const {state,pathname} = useLocation();
    const [isChecking,setIsChecking] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.target;
        // const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        login(email,password)
        .then(res =>{
            document.getElementById('my_modal_3').showModal()
            AxiosBase().post('/check-accountStatus',{email})
            .then(res =>{
               
                if(res.data.status){
                    document.getElementById('my_modal_3').close()
                    setError('You account has been restricted')
                    logout()
                }
                else{
                if(state){
                    navigate(state)
                    document.getElementById('my_modal_3').close()
                    setError('')
                
                
                }
                else{
                    setError('')
                    navigate('/')
                    document.getElementById('my_modal_3').close()
                }
                }
            })
            .catch(err=>{
                logout()
                document.getElementById('my_modal_3').close()
                setError('Something went wrong')
                
            })
        })
        .catch(err=>{
            // if(err.message == 'Firebase: Error (auth/email-already-in-use).'){
            //  setError('')
            // 
            
            document.getElementById('my_modal_3').close()
            setError(err.message || 'Something went wrong')
        })
       
    }
    const handleToggle = ()=>{
        setToggle(!toggle)
    }
    return (
        <div className='flex justify-center  md:py-20 py-20 font-jost lg:px-0 px-2'>
            <form className='md:w-1/2 w-full ' onSubmit={handleSubmit}>
             <h1 className='md:text-7xl text-5xl text-center font-bold'>Sign <span className='text-color_primary  '>In</span></h1>
             {
                error &&  <div className=' bg-[#f9dede] text-color_danger p-5 mt-5 rounded-lg border border-color_warning flex justify-between items-center'>
                <h2>{error}</h2> <CiWarning className='text-3xl'></CiWarning>
             </div>
            }
            <div className='py-5  space-y-4'>
            
                       
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Email</h3>
                        <input type="text" name='email' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Email' required/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Password</h3>
                       <div className='relative'><input type={toggle ? 'password' : 'text'} name='password' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Password' required/>
                    <div className='absolute right-2 top-1/3 text-2xl' onClick={handleToggle}>
                        {
                            toggle? <FaRegEyeSlash></FaRegEyeSlash> : <SlEye></SlEye>
                        }
                    
                    </div>
                    </div>
                        </div>
                    
            </div>
           <div className='flex md:flex-row flex-col-reverse justify-between md:items-center'>
            <p>Dont't Have An Account ? <Link className='text-color_primary font-semibold' to={'/sign-up'}>Sign up</Link></p>
           <button className='py-3 px-  bg-color_primary md:w-1/2 w-full text-white text-xl rounded-md'>Sign In</button>
           </div>
            </form>
            <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      
    </form>
   <div className='flex flex-col justify-center items-center py-14'>
   <span className="loading loading-spinner loading-lg text-center  text-info"></span>
   <p className='text-black mt-5 '>Just a moment please..</p>
   </div>
  </div>
</dialog>
        </div>
    );
}

export default SignIn;
