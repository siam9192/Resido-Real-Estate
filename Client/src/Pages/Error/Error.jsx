import React from 'react';

const Error = () => {
    return (
        <div className='flex  justify-center items-center py-32'>
          <div className='space-y-2 flex justify-center items-center flex-col'>
          <img src="/images/error.png" alt="" className='w-1/2' />
           <div className='space-y-1'>
           <h1 className='md:text-3xl text-2xl text-center'>Oops, looks like the page is lost.</h1>
           <h3 className='md:text-2xl text-xl text-center'>This is not a fault, just an accident that was not intentional.</h3>
           </div>
          </div>
        </div>
    );
}

export default Error;
