import React from 'react';

const ViewsData = () => {
    return (
        <div>
             <div className='col-span-2 p-5 bg-white  rounded-md'>
        
        <h1 className='text-xl text-color_text_normal font-semibold '>Views Data</h1>
        
        <div className='pt-3 space-y-2'>
        <h2 className=' font-semibold text-black pb-1'>Gender</h2>
         {
             viewsData.map((item,index)=>{
                 return <div className='space-y-2' key={index}>
                    <div className='flex justify-between items-center'> <h1 className=' text-color_secondary'>{item.by}</h1> <h3 className='text-black'>{item.value}%</h3></div>
                     <div className='bg-gray-200 rounded-full'>
                         <div className=' bg-color_primary rounded-r-full py-1 rounded-full' style={{width:`${item.value}%`}}></div>
                     </div>
                 </div>
             })
         }
        </div>
        <div className='pt-3 space-y-2'>
        <h2 className=' font-semibold text-black pb-1'>Age</h2>
         {
             viewsByAges.map((item,index)=>{
                 return <div className='space-y-2' key={index}>
                    <div className='flex justify-between items-center'> <h1 className=' text-color_secondary'>{item.by}</h1> <h3 className='text-black'>{item.value}%</h3></div>
                     <div className='bg-gray-200 rounded-full'>
                         <div className=' bg-color_primary rounded-r-full py-1 rounded-full' style={{width:`${item.value}%`}}></div>
                     </div>
                 </div>
             })
         }
        </div>
        </div>
        </div>
    );
}

export default ViewsData;
