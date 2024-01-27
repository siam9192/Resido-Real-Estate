import React from 'react';

const WidthContainer = ({children}) => {
    return (
        <div className='max-w-[1400px] mx-auto lg:px-0 px-2'>
        {children}
        </div>
    );
}

export default WidthContainer;
