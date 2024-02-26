import React from 'react';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import { FaBuildingColumns } from "react-icons/fa6";
import { BsHouseDoor } from "react-icons/bs";
import { BsHouseCheck } from "react-icons/bs";
import { IoKeyOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";

const Achievement = () => {
    const array = [
        {
        name:"Completed Property",
        icon:<BsHouseDoor></BsHouseDoor>,
        number:200500
        },
        {
            name:"Property Sales",
            icon:<BsHouseCheck></BsHouseCheck>,
            number:7800
            },
            {
                name:"Apartment Rent",
                icon:<IoKeyOutline></IoKeyOutline>,
                number:12300
                },
                {
                    name:"Happy Clients",
                    icon:<PiUsers></PiUsers>,
                    number:15200
                    }
    ]
    return (
        <div className='py-20 bg-[#d9f1e4] font-jost'>
          <WidthContainer>
          <SectionHeading heading={'Achievement '} title={'Unveiling Unprecedented Heights: A Chronicle of Achievements in Real Estate Innovation on Our Website'}></SectionHeading>

          <div className='pt-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
           {
            array.map((item,index)=>{
              return  <div className='p-5 space-y-2'>
                <div className='text-6xl text-[#44d86e] flex justify-center items-center'>
                    {/* <BsHouseDoor></BsHouseDoor> */}
                    {
                        item.icon
                    }
                </div>
                <div className='space-y-2'>
                <h1 className='text-center text-[#2D3954]  font-bold text-4xl '>{item.number}+</h1>
            <p className='text-[#2D3954] text-center'>{item.name}</p>
            
                </div>
                </div>
            })
           }
         
          </div>
          </WidthContainer>
        </div>
    );
}

export default Achievement;
