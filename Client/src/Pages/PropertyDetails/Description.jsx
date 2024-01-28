import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const Description = ({property}) => {
    const [toggle,setToggle] = useState(true);
    const handler = ()=>{
        setToggle(!toggle)
    }
    return (
        <div className='p-5 bg-white rounded-md'>
        <div className='flex justify-between items-center'>
        <h1 className='text-xl text-color_text_normal font-semibold'>Description</h1>
        <div className='bg-gray-200 p-2 text-xl rounded-full font-semibold hover:cursor-pointer' onClick={handler}>
        <IoIosArrowDown className={`transition-transform duration-300 ${toggle?'-rotate-180' : ' rotate-0'}`}></IoIosArrowDown>
        </div>
        </div>
        <div className={`space-y-4 pt-3 font-semibold overflow-hidden transition-all duration-500 ease-in-out  ${toggle ? 'max-h-[700px] opacity-100' : 'max-h-[0]  opacity-100 '}`}>
        <p className='font-pop font-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit necessitatibus, eius numquam minus cum repellat, cumque nisi aperiam velit laboriosam voluptate magnam similique laborum possimus! Cumque deserunt ad consequuntur et corrupti ex assumenda incidunt voluptates, harum necessitatibus sit deleniti magni nam rem error accusantium sed? Inventore eos ea itaque velit, labore possimus, repellat sequi blanditiis ipsam atque, delectus unde explicabo aliquam saepe natus ipsa. Dolore eos, quam maiores quod, quos eveniet, voluptate quae sapiente asperiores obcaecati saepe quas a aut!</p>
        </div>
        </div>
    );
}

export default Description;
