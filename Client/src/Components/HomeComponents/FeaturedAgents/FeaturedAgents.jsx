import React, { useEffect, useState } from 'react';
import WidthContainer from '../../Reuse/WidthContainer/WidthContainer';
import SectionHeading from '../../Reuse/SectionHeading/SectionHeading';
import axios from 'axios';
import AgentCard from '../../Reuse/Cards/AgentCard';

const FeaturedAgents = () => {
    const [agents,setAgents] = useState([])
    useEffect(()=>{
        axios.get('/Json/Agents.json')
        .then(res=>{
            setAgents(res.data)
        })
    },[])
   
    return (
        <div className='py-10'>
        <WidthContainer>
            <SectionHeading heading={'Explore Featured Agents '} title={`"Top Real Estate Experts: Discover Trusted Agents for Your Property Needs – Meet Our Featured Agents Today!"`}></SectionHeading>
            <div className='py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {
                    agents.slice(0,4).map((agent,index)=>{
                       return <AgentCard agent={agent} key={index}></AgentCard>
                    })
                }
            </div>
        </WidthContainer>
        </div>
    );
}

export default FeaturedAgents;
