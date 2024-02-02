import axios from 'axios';
import React from 'react';

const AxiosBase = () => {
  const base = axios.create({
    // https://find-house-backend-pgeno1uvi-siam-hasans-projects.vercel.app/api/v1
    // dashboard
    // https://griya.dexignzone.com/react/demo/dashboard 
    baseURL:'https://resido888-3u959ag2i-siam-hasans-projects.vercel.app'
  })
  return base;
}

export default AxiosBase;
