import React from 'react'
import ReactDOM from 'react-dom/client'
import {  HelmetProvider } from 'react-helmet-async';
import { router } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import AuthProvider from './provider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
        <RouterProvider router={router}></RouterProvider>
        </div>

      </HelmetProvider>
      </AuthProvider>

  </React.StrictMode>,
)
