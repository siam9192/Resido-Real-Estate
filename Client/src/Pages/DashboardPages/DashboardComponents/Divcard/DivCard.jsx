import React from 'react';

const DivCard = ({children}) => {
    return (
        <div className='bg-white rounded-md shadow-md md:p-10 p-5'>
            {children}
        </div>
    );
}

export default DivCard;
