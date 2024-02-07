import axios from 'axios';
import React from 'react';

const AxiosBase = () => {
  const base = axios.create({
    // https://find-house-backend-pgeno1uvi-siam-hasans-projects.vercel.app/api/v1
    // dashboard
    // http://localhost:5000
   
    baseURL:'http://localhost:5000'
  })
  return base;
}

export default AxiosBase;
