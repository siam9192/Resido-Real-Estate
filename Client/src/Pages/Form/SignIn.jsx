import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
     

        const user = {username,password}
       console.log(user)
    }
    return (
        <div className='flex justify-center  md:py-20 py-20 font-jost lg:px-0 px-2'>
            <form className='md:w-1/2 w-full ' onSubmit={handleSubmit}>
             <h1 className='md:text-7xl text-5xl text-center font-bold'>Sign <span className='text-color_primary  '>In</span></h1>
            <div className='py-5  space-y-4'>
            
                       
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Email</h3>
                        <input type="text" name='email' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Your Email' required/>
                        </div>
                        <div className='space-y-1'>
                            <h3 className=' text-color_text_normal font-semibold uppercase'>Password</h3>
                        <input type="text" name='password' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='Password' required/>
                        </div>
                    
            </div>
           <div className='flex md:flex-row flex-col-reverse justify-between md:items-center'>
            <p>Already Have An Account ? <Link className='text-color_primary font-semibold' to={'/sign-in'}>Sign in</Link></p>
           <button className='py-3 px-  bg-color_primary md:w-1/2 w-full text-white text-xl rounded-md'>Sign In</button>
           </div>
            </form>
        </div>
    );
}

export default SignIn;
