import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex justify-center items-center h-screen w-full text-neutral-200 bg-[#0d0f12] font-gruppo">
    <App />
    <Toaster />
    </div>
  </React.StrictMode>,
)
