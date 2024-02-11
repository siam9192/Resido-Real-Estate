import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { AiOutlineMinus,AiOutlinePlus } from "react-icons/ai";
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
const SearchBox = ({params,setParams,setCurrentPage}) => {
    const [isLocationOpen,setIsLocation] = useState(true);
    const [isProperTypeOpen,setPropertyType]   = useState(false)
    const [isStatusOpen,setStatus]  = useState(false)
    const [isFeatureOpen,setIsFeature] = useState(false);
    const [searchParams,setSearchparams] = useState([...params])
    const navigate = useNavigate();
    const location = useLocation()
    
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
        "Flat",
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

    //   lassName={`grid overflow-hidden transition-all duration-${300*index} ease-in-out  ${isLocationOpen ? 'grid-rows-[1fr] ' : 'hidden grid-rows-[0fr] '}`} key={index}
      
      
      const handleIsLocation = ()=>{
        setIsLocation(!isLocationOpen)
      }
      const handlePropertyType = ()=>{
        setPropertyType(!isProperTypeOpen)
      }
      const handleStatus = ()=>{
        setStatus(!isStatusOpen)
      }
      const handleFeature = ()=>{
        setIsFeature(!isFeatureOpen)
      }
    //  const style={
    //     transition: `display  0.${0.3+(1/10)}s ease-in-out`, // Adjust the transition properties
    //     display: isLocationOpen ? 'block' : 'none',
    //   }

    const paramsArray = [...searchParams];
       
    
      const search = ()=>{

      navigate({
        pathname:'/listings',
        search:`${createSearchParams(searchParams)}`
      },{replace:true})
      setParams(searchParams)

     setCurrentPage(1)
      }
      const selectQueryValue = (index,e)=>{
        const value = e.target.value;
        if(e.target.checked){
            paramsArray[index][1].push(value)
           
            setSearchparams(paramsArray)
        }
        else{
        const arrIndex =  paramsArray[index][1].indexOf(value);
       
        paramsArray[index][1].splice(arrIndex,1)
        
        }

      }
    
      const checkValue = (index,value)=>{
       return searchParams[index][1].includes(value)
      }


    return (
        <div className='bg-white border rounded-md p-5 font-jost '>
            <div className='p-3 bg-gray-100 flex items-center
             gap-2 rounded-md border-gray-600'>
                <GoSearch className='text-xl'></GoSearch>
                <input type="text" placeholder='Keyword for search...' className='w-full bg-transparent py-2 outline-none '/>
             </div>
            <div className='pt-5 '>
                <div>
                    <div className='flex justify-between items-center'>
                <h3 className='text-x text-color_text_normal font-semibold uppercase'>Where</h3>
                <div className='p-2 rounded-full bg-gray-200' onClick={handleIsLocation}>{
                    isLocationOpen ? <AiOutlineMinus className=' duration-300 rotate-180'></AiOutlineMinus> : <AiOutlinePlus></AiOutlinePlus>
                }</div>
                    </div>
                    <div  className={`py-3  overflow-hidden transition-all duration-700 ease-in  ${isLocationOpen ? 'max-h-[3000px] opacity-100' : 'max-h-[0]  transition-[max-height] duration-700 ease-out opacity-100 '}`} >
                    {
                        locations.map((location,index)=>{
                           return <div    key={index}>
                            <div className={`py-3 flex justify-between items-center  font-semibold ${index !== locations.length-1 ? 'border-b' : ''}`}
                    >
                                <h2>{location}</h2> <input type="checkbox" defaultChecked={checkValue(1,location)} value={location} className='accent-color_dark w-4 h-4' onChange={(e)=> selectQueryValue(1,e)}/>
                            </div>
                           </div>
                        })
                    }
                </div>
                </div>
                <div>
                    <div className='flex justify-between items-center'>
                <h3 className='text-x text-color_text_normal font-semibold uppercase'>Property Type</h3>
                <div className='p-2 rounded-full bg-gray-200' onClick={handlePropertyType}>{
                    isProperTypeOpen ? <AiOutlineMinus className=' duration-300 rotate-180'></AiOutlineMinus> : <AiOutlinePlus></AiOutlinePlus>
                }</div>
                    </div>
                    <div  className={`py-3 overflow-hidden  transition-all duration-700 ease-in-out ${isProperTypeOpen ? 'max-h-[3000px] opacity-100' : 'max-h-[0]  transition-[max-height] duration-700 ease-out opacity-100 '} `} >
                    {
                       propertyTypes.map((type,index)=>{
                           return <div >
                            <div className={`py-3 flex justify-between items-center  font-semibold ${index !== propertyTypes.length-1 ? 'border-b' : ''}`}
                      key={index} >
                                <h2>{type}</h2> <input type="checkbox" value={type} defaultChecked={checkValue(2,type)} className='accent-color_dark w-4 h-4' onChange={(e)=> selectQueryValue(2,e)}/>
                            </div>
                           </div>
                        })
                    }
                </div>
                </div>
                <div>
                    <div className='flex justify-between items-center'>
                <h3 className='text- text-color_text_normal font-semibold uppercase'>Property Status </h3>
                <div className='p-2 rounded-full bg-gray-200' onClick={handleStatus}>{
                    isStatusOpen ? <AiOutlineMinus className=' duration-300 rotate-180'></AiOutlineMinus> : <AiOutlinePlus></AiOutlinePlus>
                }</div>
                    </div>
                    <div  className={`py-3 overflow-hidden  transition-all duration-700 ease-in-out ${isStatusOpen ? 'max-h-[3000px] opacity-100' : 'max-h-[0]  transition-[max-height] duration-700 ease-out opacity-100 '} `} >
                    {
                        propertyStatus.map((status,index)=>{
                           return <div >
                            <div className={`py-3 flex justify-between items-center  font-semibold ${index !== propertyStatus.length-1 ? 'border-b' : ''}`}
                      key={index} >
                                <h2>{status}</h2> <input type="checkbox" defaultChecked={checkValue(3,status)} value={status} className='accent-color_dark w-4 h-4' onChange={(e)=> selectQueryValue(3,e)}/>
                            </div>
                           </div>
                        })
                    }
                </div>
                </div>
                <div>
                    <div className='flex justify-between items-center'>
                <h3 className='text-x text-color_text_normal font-semibold uppercase'>Features </h3>
                <div className='p-2 rounded-full bg-gray-200' onClick={handleFeature}>{
                    isFeatureOpen ? <AiOutlineMinus className=' duration-300 rotate-180'></AiOutlineMinus> : <AiOutlinePlus></AiOutlinePlus>
                }</div>
                    </div>
                    <div  className={`py-3  overflow-hidden  transition-all duration-700 ease-in-out ${isFeatureOpen ? 'max-h-[3000px] opacity-100' : 'max-h-[0]  transition-[max-height] duration-700 ease-out opacity-100 '} `} >
                    {
                        features.map((feature,index)=>{
                           return <div >
                            <div className={`py-3 flex justify-between items-center  font-semibold ${index !== features.length-1 ? 'border-b' : ''}`}
                      key={index} >
                                <h2>{feature}</h2> <input type="checkbox" defaultChecked={checkValue(4,feature)} value={feature} className='accent-color_dark w-4 h-4' onChange={(e)=> selectQueryValue(4,e)}/>
                            </div>
                           </div>
                        })
                    }
                </div>
                </div>
            </div>
            <div className='text-center pt-3'>
            <button className='bg-[#e7faf4] w-full py-3 border-2 border-[#b5efdf] rounded-md  text-color_primary font-semibold text-xl' onClick={search}>Search</button>
            </div>
        </div>
    );
}


export default SearchBox;
