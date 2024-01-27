import React from 'react';

const SectionHeading = ({heading,title}) => {
    return (
        <div className='space-y-2 font-jost'>
            <h1 className='text-center text-[#2D3954]  font-bold text-4xl '>{heading}</h1>
            <p className='text-[#2D3954] text-center'>{title}</p>
            
        </div>
    );
}

export default SectionHeading;
