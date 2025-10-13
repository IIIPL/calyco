import React, { useState } from 'react'

import { Navbar } from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home.jsx'))
const VisualizerPage = React.lazy(() => import('./pages/VisualizerPage.jsx'))

const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage.jsx'))
const ContractorsPage = React.lazy(() => import('./pages/ContractorsPage.jsx'))
const GovernmentPage = React.lazy(() => import('./pages/GovernmentPage.jsx'))
const DownloadsPage = React.lazy(() => import('./pages/DownloadsPage.jsx'))
const AboutPage = React.lazy(() => import('./pages/AboutPage.jsx'))
const SustainabilityPage = React.lazy(() => import('./pages/SustainabilityPage.jsx'))
const ContactPage = React.lazy(() => import('./pages/ContactPage.jsx'))
const CartPage = React.lazy(() => import('./pages/CartPage.jsx'))
const TestPageCodex = React.lazy(() => import('../content/pages/test-page-codex.mdx'))
const ProductFinder = React.lazy(() => import('./pages/ProductFinder.jsx'))
const BlogIndexPage = React.lazy(() => import('./pages/blogs/index.jsx'))
const BlogCategoryPage = React.lazy(() => import('./pages/blogs/categories/[slug].jsx'))
const BlogPostPage = React.lazy(() => import('./pages/blogs/[slug].jsx'))
import { Temp } from './pages/Temp'
import AboutUs from './pages/AboutUs'
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
import CartProvider from './context/CartContext'
import Cart from './components/Cart'
import { ColorsPage, InspirationPage } from './pages'
import KitchenInspiration from './pages/inspiration/Kitchen';
import BedroomInspiration from './pages/inspiration/Bedroom';
import HallwayInspiration from './pages/inspiration/Hallway';
import LivingInspiration from './pages/inspiration/Living';
import EnhancedLivingRoomInspiration from './pages/inspiration/EnhancedLiving';
import BathroomInspiration from './pages/inspiration/Bathroom';
import DiningInspiration from './pages/inspiration/Dining';
import OfficeInspiration from './pages/inspiration/Office';
import ExteriorInspiration from './pages/inspiration/Exterior';
import NotFound from './pages/NotFound';
import FullColorPage from './pages/Colors/FullColorPage'
import FamilyColorGroup from './pages/FamilyPage'
import IndividualColorPage from './pages/Colors/IndividualColorPage'
import ColorDetailPage from './pages/ColorDetailPage'


// Import new providers and pages
import { ColorProvider } from './context/ColorContext';
import { ColorVisualizationProvider } from './context/ColorVisualizationContext.jsx';

import { RoomVisualizerPage } from './pages/RoomVisualizer.jsx';
import RoomVisualizer from './components/RoomVisualizer.jsx';
import IndividualRoomPage from './pages/Rooms/IndividualRoom.jsx'

// Policies: 
import PoliciesIndex from "./pages/Policies/PoliciesIndex.jsx"
import Privacy from "./pages/Policies/Privacy";
import TermsAndConditions from "./pages/Policies/TermsAndConditions";
// import PaymentsGst from "./pages/Policies/PaymentsGst";
import QualityPolicy from "./pages/Policies/QualityPolicy";
import EnvironmentalSustainability from "./pages/Policies/EnvironmentalSustainability";
import ProductColorDisclaimer from "./pages/Policies/ProductColorDisclaimer";
import ShippingDelivery from "./pages/Policies/ShippingDelivery";
import ReturnsRefunds from "./pages/Policies/ReturnsRefunds";
import WarrantyPolicy from "./pages/Policies/WarrantyPolicy";
import CustomerService from "./pages/Policies/CustomerService";


import { useNavigate } from "react-router-dom";

const ColorPageWrapper = () => {
  return <FullColorPage />;
}

// Offer Banner Component
const OfferBanner = ({ onClose, isVisible }) => {
  const navigate = useNavigate();
  
  return (
    <div className={`fixed top-0 left-0 w-full bg-gray-600 overflow-hidden z-[60] transition-all duration-300 ${isVisible ? 'h-auto' : 'h-0'}`}>
      
      
              <div className="relative max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            {/* Centered Text */}
            <div className="flex-1"></div>
            <div className="text-center text-white text-sm">
              🎨 Transform your space with eco-premium paints! Free delivery on orders above ₹2000.
            </div>
            <div className="flex-1 flex justify-end">
              <button 
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  
  return (
    <CartProvider>
      <ColorProvider>
        <ColorVisualizationProvider>
        <div className='font-poppins overflow-x-hidden'>
          {/* Offer Banner - Above Header */}
          <OfferBanner onClose={() => setBannerVisible(false)} isVisible={bannerVisible} />
          
          {/* This is your app. */}
          <Navbar bannerVisible={bannerVisible} />
          {/* Add top margin to account for fixed navbar + offer banner */}
          <div className={`transition-all duration-300 ${bannerVisible ? 'pt-20 md:pt-16' : 'pt-0'}`}>
            <React.Suspense fallback={<div className="pt-24 text-center">Loading…</div>}>
          <Routes>
              <Route path='/' element={<Home/>}/>
              {/* New premium visual-first routes */}
              <Route path='/colors' element={<ColorsPage/>}/>
              <Route path='/visualizer' element={<VisualizerPage/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/products/:slug' element={<ProductDetailPage/>}/>
              <Route path='/product/Nova' element={<Navigate to='/product/Interior-Latex-Paint' replace />}/>
              <Route path='/product/nova' element={<Navigate to='/product/Interior-Latex-Paint' replace />}/>
              <Route path='/product/Exterior-Latex-Paint' element={<Navigate to='/product/exterior-latex-paint' replace />}/>
              <Route path='/contractors' element={<ContractorsPage/>}/>
              <Route path='/government' element={<GovernmentPage/>}/>
              <Route path='/downloads' element={<DownloadsPage/>}/>
              <Route path='/about' element={<AboutPage/>}/>
              <Route path='/sustainability' element={<SustainabilityPage/>}/>
              <Route path='/contact' element={<ContactPage/>}/>
              <Route path='/cart' element={<CartPage/>}/>
              <Route path='/product/:productId' element={<DynamicProductPage/>}/>
              <Route path='/temp' element={<Temp/>}/>
              <Route path='/faq' element={<FAQs/>}/>
              <Route path='/test-page-codex' element={<TestPageCodex/>}/>
              <Route path='/pages/product-finder' element={<ProductFinder/>}/>
              {/* <Route path='/interior' element={<Interior/>}/> */}
              {/* <Route path='/stain-sealer' element={<StainSealer/>}/> */}
              <Route path='/blogs' element={<BlogIndexPage/>}/>
              <Route path='/blogs/categories' element={<Navigate to='/blogs/categories/design-trends' replace />} />
              <Route path='/blogs/categories/:slug' element={<BlogCategoryPage/>}/>
              <Route path='/blogs/:slug' element={<BlogPostPage/>}/>
              {/* Colors new routes (existing retained) */}
              <Route path='/colors' element={<ColorsPage/>}/>
              <Route path="/colors/family/:familyName" element={<FamilyColorGroup/>} />
              <Route path="/colors/family/:familyName/:colorName" element={<ColorDetailPage />} />
              <Route path="/colors/:colorName" element={<ColorPageWrapper />} />
              <Route path='/inspirations' element={<InspirationPage/>}/>
              <Route path='/inspirations/kitchen' element={<KitchenInspiration/>}/>
              <Route path='/inspirations/bedroom' element={<BedroomInspiration/>}/>
              <Route path='/inspirations/hallway' element={<HallwayInspiration/>}/>
              <Route path='/inspirations/living' element={<LivingInspiration/>}/>
              <Route path='/inspirations/livingroom' element={<EnhancedLivingRoomInspiration/>}/>
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
              <Route path="/policies/privacy" element={<Privacy />} />
              <Route path="/policies/terms" element={<TermsAndConditions />} />
              {/* <Route path="/policies/payments-gst" element={<PaymentsGst />} /> */}
              <Route path="/policies/quality" element={<QualityPolicy />} />
              <Route path="/policies/environmental-sustainability" element={<EnvironmentalSustainability />} />
              <Route path="/policies/disclaimer" element={<ProductColorDisclaimer />} />
              <Route path="/policies/shipping" element={<ShippingDelivery />} />
              <Route path="/policies/returns" element={<ReturnsRefunds />} />
              <Route path="/policies/warranty" element={<WarrantyPolicy />} />
              <Route path="/customer-service" element={<CustomerService />} />

              {/* 404 Fallback Route */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            </React.Suspense>
            <Footer/>
          </div>
          <Cart />
        </div>
        </ColorVisualizationProvider>
        </ColorProvider>
      </CartProvider>
  )
}
export default App;// Deployment trigger - Wed Aug 20 22:53:10 IST 2025
// Force new deployment - Thu Aug 21 00:54:55 IST 2025





