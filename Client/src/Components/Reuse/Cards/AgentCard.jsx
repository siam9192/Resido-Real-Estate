import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { IoMailOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const AgentCard = ({agent}) => {
    return (
        <div className='font-jost border rounded-lg p-2 bg-white'>
        <img src={agent.image} alt="" className='h-72 w-full '/>
    <div className='p-4 bg-white'>
    <div className='flex justify-between items-center'>
   <div> <h1 className='text-xl font-semibold text-black'>{agent.name}</h1>
    <p>5 Property</p>
   </div>
   <div className='bg-[#ffb1b1] p-2 rounded-full text-black text-xl'>
    <IoMailOutline></IoMailOutline>
   </div>
    </div>
    <p><span className='font-semibold'>Call: </span>{agent.contact_pone}</p>
    <div className='pt-2 mt-2 border-t flex justify-between items-center'>
        <div className='flex items-center gap-2'><FaLocationArrow></FaLocationArrow><p><h3>{agent.address}</h3></p></div>
       <Link to={'/agents/details/name'}> <button className='px-6 py-2 bg-color_primary text-white rounded-full'>View</button></Link>
       </div>
    </div>
    </div>
    );
}

export default AgentCard;
