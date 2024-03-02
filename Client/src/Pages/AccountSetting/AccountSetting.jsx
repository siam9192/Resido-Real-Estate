import React, { useState } from 'react';

const AccountSetting = () => {

    const [error,setError] = useState(null)
    const [success,setSuccess] = useState(null);
    return (
            <div className=' py-20 lg:px-5 px-2'>
            <div className='p-10 bg-white font-[600]'>
                <h1 className='text-xl text-black'>Change Password</h1>
                <div className='pt-5 space-y-4'>
                <div className='flex gap-5'>
               <div className='space-y-2 w-full'>
                <h3 className='font-semibold '>Current Password</h3>
               <input type="text" placeholder='Enter Current Password' className='w-full px-2 py-3 border-[1px]  border-black outline-none rounded-lg'/>
               </div>
               </div>
               <div className='flex gap-5'>
               <div className='space-y-2 w-full'>
                <h3 className='font-semibold '>New Password</h3>
               <input type="text" placeholder='Enter New Password' className='w-full px-2 py-3 border-[1px]  border-black outline-none rounded-lg'/>
               </div>
               </div>
               <div className='space-y-2 w-full'>
                <h3 className='font-semibold '>Confirm Password</h3>
               <input type="text" placeholder='Confirm Your Password' className='w-full px-2 py-3 border-[1px] border-black  outline-none rounded-lg'/>
               </div>
               <button className=' bg-color_primary px-6 py-3 text-white rounded-md'>Change Password</button>
                </div>
            </div>
        </div>
    );
}

export default AccountSetting;
