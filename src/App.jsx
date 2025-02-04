import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Taskform from './components/TaskForm'
import { Toaster } from 'react-hot-toast'
import { EventProvider } from './hooks/useEvent'
import TaskManager from './components/TaskManager'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Calender } from './components/Calender'
import Navbar from './components/Navbar'

function App() {

  return (
    <EventProvider>
     <Toaster/>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/calender' element={<Calender/>}/>
          </Routes>
      </BrowserRouter>
    </EventProvider>
  )
}

export default App
