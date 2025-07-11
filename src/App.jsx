import { useState } from 'react'
import Slider from './components/Slider'
import { Navbar } from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProductPage } from './pages/ProductPage'
import { Temp } from './pages/Temp'
import { AboutUs } from './pages/AboutUs'
import { Footer } from './pages/Footer'
import { FAQs } from './pages/FAQs'
import ScrollToTop from './components/ScrollToTop'
import { ContactUs } from './pages/ContactUs'
import { Interior } from './pages/Interior'
import { StainSealer } from './pages/StainSealer'
import { Nova } from './pages/Nova'
import { Defense } from './pages/Defense'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='font-poppins'>
      {/* This is your app. */}
      <Navbar/>
      {/* <ScrollToTop/> */}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/product/nova' element={<Nova/>}/>
        <Route path='/product/defense' element={<Defense/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/temp' element={<Temp/>}/>
        <Route path='/faq' element={<FAQs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/interior' element={<Interior/>}/>
        <Route path='/stain-sealer' element={<StainSealer/>}/>
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
