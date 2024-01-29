import React from 'react';

const AddProperties = () => {
    const locations = [
        "Tokyo",
        "New York City",
        "London",
        "Paris",
        "Sydney",
        "Dubai",
        "Rio de Janeiro",
        "Delhi",
        "Beijing",
        "Los Angeles"
      ]
     const propertyTypes = [
        "Apartment",
        "Condos",
        "Denver",
        "House",
        "Offices",
        "Rental",
        "Studios",
        "Villas"
      ]
      const propertyStatus = [
        'Buy','Sale','Rent'
      ]
      const features =  [
        "Air Conditioning",
        "Alarm System",
        "Car Parking",
        "Central Heating",
        "Free WiFi",
        "Gym",
        "Internet",
        "Laundry Room",
        "Pets Allowed",
        "Spa & Massage",
        "Swimming Pool",
        "Window Covering"
      ]
      const rooms = [0,1,2,3,4,5,6,7,8]
    return (
        <div className='font-jost p-5'>
            <h1 className='lg:text-5xl text-3xl text-black'>Add New Property</h1>

            <div className='space-y-10 pt-10'>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Overview</h1>
                  <div className='space-y-4 pt-5'>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Property Title*</h1>
                        <input type="text" placeholder='Your Property Name' className='w-full py-4 border rounded-lg px-2 outline-color_primary' />
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Description*</h1>
                        <textarea type="text" placeholder='Write about  property' className='w-full py-4 border rounded-lg px-2 outline-color_primary min-h-[200px]' ></textarea>
                    </div>
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Property Type*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                propertyTypes.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Listing In*</h1>
                        <select type="text" className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' >
                        {
                                propertyStatus.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Property Details</h1>
                  <div className='space-y-4 pt-5'>
               
                    <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Size In Sqft*</h1>
                        <input type="text" placeholder='Your Property Name' className='w-full py-4 border rounded-lg px-2 outline-color_primary' />
                       
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Bedrooms*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                 
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Bathrooms*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                       
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Kitchen*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
          
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Garages*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                rooms.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Garage Size*</h1>
                        <input type="text" className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' placeholder='Sqft' />
                        
                    </div>
                 </div>
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Year Build*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                propertyTypes.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Floor Numbers*</h1>
                        <select type="text" className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' >
                        {
                                propertyStatus.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Photo & Video Attachment</h1>
                  <div className='space-y-4 pt-5'>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>File Attachment*</h1>
                        <input type="text" placeholder='Photos' className='w-full py-4 border rounded-lg px-2 outline-color_primary' />
                        <input type="text" placeholder='Video' className='w-full py-4 border rounded-lg px-2 outline-color_primary' />
                        <div className='lg:flex items-center gap-4 pt-3 '>
                            <button className='bg-black text-white py-2 px-6 rounded-md'>+ Upload File</button>
                            <h3>Upload file .jpg, .png, .mp4</h3>
                        </div>
                    </div>
                    
                
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Select Amenities</h1>
                  <div className='space-y-4 pt-5'>
                    <div className='grid md:grid-cols-4 grid-cols-2 gap-3'>
                    {
                        features.map((feature,index)=>{
                           return <div >
                            <div className={`py-3 flex  items-center gap-2  font-semibold `}
                       >
                               <input type="checkbox" className='accent-color_dark w-4 h-4'/>  <h2>{feature}</h2>
                            </div>
                           </div>
                        })
                    }
                    </div>
                    
                
                  </div>
                </div>
                <div className='md:p-10 p-5 bg-white rounded-2xl shadow-md'>
                  <h1 className='text-3xl font-semibold text-black pb-2'>Address & Locations</h1>
                  <div className='space-y-4 pt-5'>
               
                    <div className=''>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Address*</h1>
                        <input type="text" placeholder='Your Property Name' className='w-full py-4 border rounded-lg px-2 outline-color_primary' />
                       
                    </div>
                    
                 </div>
                 
              
                 
                 <div className='grid md:grid-cols-2 gap-5'>
                 <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>Country*</h1>
                        <select type="text" className='w-full py-4 border rounded-lg px-2 bg-white outline-color_primary'>
                            {
                                propertyTypes.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='space-y-2'>
                        <h1 className='text-black font-semibold'>City*</h1>
                        <select type="text" className='w-full py-4 bg-white border rounded-lg px-2 outline-color_primary' >
                        {
                                locations.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                 </div>
                  </div>
                </div>

                <button className='px-6 py-3 bg-color_primary text-white rounded-md'>Submit Property</button> <button>Cancel</button>
            </div>
            
        </div>
    );
}

export default AddProperties;
