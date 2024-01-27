import React from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';

const WantToBeAgent = () => {
    return (
        <div className='p-10 bg-color_primary text-white font-jost'>
            <WidthContainer>
            <div className='md:flex justify-between items-center'>
                <div className='space-y-2'>
                    <h1 className='text-3xl font-semibold'>Want To Become A Real Estate Agent?</h1>
                    <p>We'll help you to grow your career and growth.</p>

                </div>
                <div>
                    <button className='px-6 md:py-4 py-2 rounded-full shadow-m shadow-white text-black bg-white'>SignUp Today</button>
                </div>
            </div>

            </WidthContainer>
        
        </div>
    );
}

export default WantToBeAgent;
