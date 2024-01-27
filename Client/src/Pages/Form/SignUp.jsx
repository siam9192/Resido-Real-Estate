import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const handleSubmit = (e)=>{
        e.preventDefault()
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const username = form.username.value;
        const password = form.password.value;
        const conPass = form.conPass.value;

        const user = { firstName,lastName,username,password,conPass}
       console.log(user)
    }
    return (
        <div className='flex justify-center  md:py-20 py-10 font-jost lg:px-0 px-2'>
            <form className='md:w-1/2 w-full ' onSubmit={handleSubmit}>
             <h1 className='md:text-7xl text-5xl text-center font-bold'>Sign <span className='text-color_primary  '>Up</span></h1>
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
                        <input type="text" name='username' className='w-full py-6 px-2 border rounded-md bg-color_bg_green text-black ' placeholder='rakib907' required/>
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
