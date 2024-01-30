import React from 'react';

const LoadingPart = () => {
    return (
    
            <dialog id="add_property" className="modal">
  <div className="modal-box">
    <form method="dialog">
      
    </form>
   <div className='flex flex-col justify-center items-center py-14'>
   <span className="loading loading-spinner loading-lg text-center  text-info"></span>
   <p className='text-black mt-5 '>Just a moment please..</p>
   <p className=' mt-5 text-[13px] text-color_danger'>Please Do not close the window..</p>
   </div>
  </div>
</dialog>
        
    );
}

export default LoadingPart;
