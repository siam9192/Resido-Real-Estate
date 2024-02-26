import React from 'react';
import { Link } from 'react-router-dom';

const PopularCard = ({area,properties}) => {
    
    return (
        <Link to={`/properties?location=${area.name}`} className='flex   items-center border-2  border-color_info font-pop rounded-md'>
            <div>
                <img src={area.image||"/images/1.jpg"} alt="" className='md:h-52 md:w-60 w-40 h-32  rounded-l-md' />
            </div>
            <div className='space-y-1 px-5 text-gray-700'>
                <h3 className='md:text-2xl text-xl'>{area.name} </h3>
                <p>{area.count||0} Properties</p>
            </div>
        </Link>
    );
}

export default PopularCard;
