import axios from 'axios';
import React from 'react';

const AxiosBase = () => {
  const base = axios.create({
    // https://find-house-backend-lrt703b08-siam-hasans-projects.vercel.app/api/v1
    // https://find-house-backend-5w6dlm6ep-siam-hasans-projects.vercel.app/api/v1
    // https://find-house-backend-fnj6lp0c9-siam-hasans-projects.vercel.app/api/v1
    baseURL:'https://find-house-backend-pgeno1uvi-siam-hasans-projects.vercel.app/api/v1'
  })
  return base;
}

export default AxiosBase;
