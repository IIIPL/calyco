import { useState } from 'react'
import Slider from './components/Slider'
import { Navbar } from './components/Navbar'
import { Route, Routes, useParams } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
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
import { Products } from './pages/Products'
import { DynamicProductPage } from './pages/DynamicProductPage'
import { CartProvider } from './context/CartContext'
import Checkout from "./pages/Checkout";
import { ColorsPage, InspirationPage } from './pages'
import KitchenInspiration from './pages/inspiration/Kitchen';
import BedroomInspiration from './pages/inspiration/Bedroom';
import HallwayInspiration from './pages/inspiration/Hallway';
import LivingInspiration from './pages/inspiration/Living';
import BathroomInspiration from './pages/inspiration/Bathroom';
import DiningInspiration from './pages/inspiration/Dining';
import OfficeInspiration from './pages/inspiration/Office';
import ExteriorInspiration from './pages/inspiration/Exterior';
import NotFound from './pages/NotFound';
import FullColorPage from './pages/Colors/FullColorPage'
import FamilyColorGroup from './pages/FamilyPage'
import ColorDetailPage from './pages/ColorDetailPage'


// Import new providers and pages
import { ColorProvider } from './context/ColorContext';
import { ColorVisualizationProvider } from './context/ColorVisualizationContext.jsx';

import { RoomVisualizerPage } from './pages/RoomVisualizer.jsx';
import RoomVisualizer from './components/RoomVisualizer.jsx';
import IndividualRoomPage from './pages/Rooms/IndividualRoom.jsx'

// Policies: 
import PoliciesIndex from "./pages/Policies/PoliciesIndex.jsx"
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import TermsAndConditions from "./pages/Policies/TermsAndConditions";
// import PaymentsGst from "./pages/Policies/PaymentsGst";
import QualityPolicy from "./pages/Policies/QualityPolicy";
// import EnvironmentSustainability from "./pages/Policies/EnvironmentSustainability";
import ProductColorDisclaimer from "./pages/Policies/ProductColorDisclaimer";
import ShippingDelivery from "./pages/Policies/ShippingDelivery";
import ReturnsRefunds from "./pages/Policies/ReturnsRefunds";
import WarrantyPolicy from "./pages/Policies/WarrantyPolicy";
import CustomerService from "./pages/Policies/CustomerService";

const ColorPageWrapper = () => {
  return <FullColorPage />;
}
function App() {
  return (
    <CartProvider>
      <ColorProvider>
        <ColorVisualizationProvider>
          <div className='font-poppins'>
            {/* This is your app. */}
            <Navbar/>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/product' element={<Products/>}/>
              <Route path='/product/:productId' element={<DynamicProductPage/>}/>
              <Route path='/about' element={<AboutUs/>}/>
              <Route path='/temp' element={<Temp/>}/>
              <Route path='/faq' element={<FAQs/>}/>
              <Route path='/contact' element={<ContactUs/>}/>
              {/* <Route path='/interior' element={<Interior/>}/> */}
              {/* <Route path='/stain-sealer' element={<StainSealer/>}/> */}
              <Route path='/checkout' element={<Checkout />} />
              {/* Colors new routes */}
              <Route path='/colors' element={<ColorsPage/>}/>
              <Route path="/colors/family/:familyName" element={<FamilyColorGroup/>} />
              <Route path="/colors/family/:familyName/:colorName" element={<ColorDetailPage />} />
              <Route path="/colors/:colorName" element={<ColorPageWrapper />} />
              <Route path='/inspirations' element={<InspirationPage/>}/>
              <Route path='/inspirations/kitchen' element={<KitchenInspiration/>}/>
              <Route path='/inspirations/bedroom' element={<BedroomInspiration/>}/>
              <Route path='/inspirations/hallway' element={<HallwayInspiration/>}/>
              <Route path='/inspirations/living' element={<LivingInspiration/>}/>
              <Route path='/inspirations/bathroom' element={<BathroomInspiration/>}/>
              <Route path='/inspirations/dining' element={<DiningInspiration/>}/>
              <Route path='/inspirations/office' element={<OfficeInspiration/>}/>
              
              <Route path='/inspirations/exterior' element={<ExteriorInspiration/>}/>
              <Route path="/room/:roomName" element={<IndividualRoomPage />} />
              {/* Visualization Routes */}
              <Route path='/room-visualization' element={<RoomVisualizerPage/>} />
              <Route path='/room-visualization/bedroom' element={<RoomVisualizer/>} />
              <Route path='/room-visualization/livingroom' element={<RoomVisualizer/>} />
              <Route path='/room-visualization/diningroom' element={<RoomVisualizer/>} />
              <Route path='/room-visualization/personalVisual' element={<RoomVisualizer/>} />


              {/* Policy Routes */}
              <Route path="/policies" element={<PoliciesIndex />} />
              <Route path="/policies/privacy" element={<PrivacyPolicy />} />
              <Route path="/policies/terms" element={<TermsAndConditions />} />
              {/* <Route path="/policies/payments-gst" element={<PaymentsGst />} /> */}
              <Route path="/policies/quality" element={<QualityPolicy />} />
              {/* <Route path="/policies/environment" element={< />} /> */}
              <Route path="/policies/disclaimer" element={<ProductColorDisclaimer />} />
              <Route path="/policies/shipping" element={<ShippingDelivery />} />
              <Route path="/policies/returns" element={<ReturnsRefunds />} />
              <Route path="/policies/warranty" element={<WarrantyPolicy />} />
              <Route path="/customer-service" element={<CustomerService />} />

              {/* 404 Fallback Route */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
          </div>
        </ColorVisualizationProvider>
      </ColorProvider>
    </CartProvider>
  )
}
export default App;