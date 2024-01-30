import axios from 'axios';
import React from 'react';

const AxiosBase = () => {
  const base = axios.create({
    // https://find-house-backend-pgeno1uvi-siam-hasans-projects.vercel.app/api/v1
    // dashboard
    // https://griya.dexignzone.com/react/demo/dashboard 
    baseURL:'https://resido-estate-iol4x4b6f-siam-hasans-projects.vercel.app'
  })
  return base;
}

export default AxiosBase;
