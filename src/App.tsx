


import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Compile from './pages/Compiler'
import Compiler from './pages/Compiler'
import NotFound from './pages/NotFound'
import { ThemeProvider } from "@/components/theme-provider"




const App = () => {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      
   <Header/>
   <Routes>
    <Route path="/" element ={<Home/>}/>
    <Route path="/compiler" element = {<Compiler/>} />
    <Route path="*" element={<NotFound/>}/>
   </Routes>
    
    </ThemeProvider>
    <div>Hello</div>

    </>
  )
}

export default App