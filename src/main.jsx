import React from 'react'
import ReactDOM from 'react-dom/client'
import {  HelmetProvider } from 'react-helmet-async';
import { router } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import AuthProvider from './provider/AuthProvider';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <div className='max-w-screen-xl mx-auto'>
              <RouterProvider router={router}></RouterProvider>
            </div>
          </HelmetProvider>
        </QueryClientProvider>
      </AuthProvider>
  </React.StrictMode>,
)
