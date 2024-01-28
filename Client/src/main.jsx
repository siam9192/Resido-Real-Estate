import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import AuthProvider from './Authentication/AuthProvuider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Context from './Components/Context/Context.jsx'


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={Router}>
    </RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
  </QueryClientProvider>
)
