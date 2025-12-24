import React, { useState, useEffect } from 'react'

import { Navbar } from './components/Navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/Home.jsx'))
const VisualizerPage = React.lazy(() => import('./pages/VisualizerPage.jsx'))
const BudgetCalculator = React.lazy(() => import('./pages/BudgetCalculator.jsx'))

const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage.jsx'))
const ContractorsPage = React.lazy(() => import('./pages/ContractorsPage.jsx'))
const GovernmentPage = React.lazy(() => import('./pages/GovernmentPage.jsx'))
const DownloadsPage = React.lazy(() => import('./pages/DownloadsPage.jsx'))
const AboutPage = React.lazy(() => import('./pages/AboutPage.jsx'))
const SustainabilityPage = React.lazy(() => import('./pages/SustainabilityPage.jsx'))
const ContactPage = React.lazy(() => import('./pages/ContactPage.jsx'))
const CartPage = React.lazy(() => import('./pages/CartPage.jsx'))
const Checkout = React.lazy(() => import('./pages/Checkout.jsx'))
const TestPageCodex = React.lazy(() => import('../content/pages/test-page-codex.mdx'))
const ProductFinder = React.lazy(() => import('./pages/ProductFinder.jsx'))

const BlogIndex = React.lazy(() => import('../blog/pages/BlogIndex.jsx'));
const BlogPost = React.lazy(() => import('../blog/pages/BlogPost.jsx'));
const MagicUpload = React.lazy(() => import('../blog/admin/MagicUpload.jsx'));
import AboutUs from './pages/AboutUs'
import { Footer } from './pages/Footer'
import { FAQs } from './pages/FAQs'
import ScrollToTop from './components/ScrollToTop'
import { ContactUs } from './pages/ContactUs'
import { Interior } from './pages/Interior'
import WaterproofingSealer from './pages/WaterproofingSealer'
import InteriorLatexPaint from './pages/InteriorLatexPaint'
import ExteriorLatexPaint from './pages/ExteriorLatexPaint'
import PremiumInteriorEmulsion from './pages/PremiumInteriorEmulsion'
import PremiumExteriorEmulsion from './pages/PremiumExteriorEmulsion'
import { Nova } from './pages/Nova'
import { Defense } from './pages/Defense'
import { Products } from './pages/Products'
import { DynamicProductPage } from './pages/DynamicProductPage'
import CalycoWaterPrimerInterior from './pages/CalycoWaterPrimerInterior'
import CalycoWeatherPrimerExterior from './pages/CalycoWeatherPrimerExterior'
import CalycoAcrylicPutty from './pages/CalycoAcrylicPutty'
import CalycoSolventPrimerInterior from './pages/CalycoSolventPrimerInterior'
import CalycoDampGuardPrimer from './pages/CalycoDampGuardPrimer'
import CalycoUniversalPrimer from './pages/CalycoUniversalPrimer'
import PinkPrimer from './pages/PinkPrimer'
import YellowMetalPrimer from './pages/YellowMetalPrimer'
import MelaminePolish from './pages/MelaminePolish'
import FireRetardantPaint from './pages/FireRetardantPaint'
import AmrellaEnamel from './pages/AmrellaEnamel'
import PUWoodCoating from './pages/PUWoodCoating'
import AcrylicWashableDistemper from './pages/AcrylicWashableDistemper'
import AllSurfaceCoating from './pages/AllSurfaceCoating'
import TexturePaints from './pages/TexturePaints'
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
const TexturesPage = React.lazy(() => import('./pages/TexturesPage.jsx'))
const TextureDetailPage = React.lazy(() => import('./pages/TextureDetailPage.jsx'))
const CityLandingPage = React.lazy(() => import('./pages/CityLandingPage.jsx'))


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
import PaymentsGst from "./pages/Policies/PaymentsGST.jsx";
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
const OfferBanner = ({ onClose, isVisible, menuOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full bg-gray-600 overflow-hidden transition-all duration-300 ${isVisible ? 'h-auto' : 'h-0'} ${menuOpen ? 'z-[45]' : 'z-[60]'} relative`}>
      <div className="relative max-w-7xl mx-auto px-4 py-2.5 sm:px-6">
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
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------- GA4 SPA page_view tracking ----------
  const location = useLocation();
  useEffect(() => {
    // measurement id: G-NF7PGTZ3F6
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('config', 'G-NF7PGTZ3F6', {
          page_path: location.pathname + location.search,
        });
      } catch (e) {
        // fail silently in case gtag isn't ready yet
        // console.debug('gtag error', e);
      }
    }
  }, [location]);
  // ------------------------------------------------

  return (
    <CartProvider>
      <ColorProvider>
        <ColorVisualizationProvider>
          <div className='font-poppins overflow-x-hidden'>
            {/* Offer Banner - Above Header */}
            <OfferBanner onClose={() => setBannerVisible(false)} isVisible={bannerVisible} menuOpen={menuOpen} />

            {/* This is your app. */}
            <Navbar bannerVisible={bannerVisible} onMenuToggle={setMenuOpen} />
            <div className="transition-all duration-300">
              <React.Suspense fallback={<div className="pt-24 text-center">Loading…</div>}>
                <Routes>
                  <Route path='/' element={<Home />} />

                  {/* New premium visual-first routes */}
                  <Route path='/colors' element={<ColorsPage />} />
                  <Route path='/visualizer' element={<VisualizerPage />} />
                  <Route path='/budget-calculator' element={<BudgetCalculator />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/products/:slug' element={<ProductDetailPage />} />

                  {/* PREMIUM PRODUCTS */}
                  <Route path='/product/Premium-Interior-Emulsion' element={<PremiumInteriorEmulsion />} />
                  <Route path='/product/premium-interior-emulsion' element={<Navigate to='/product/Premium-Interior-Emulsion' replace />} />
                  <Route path='/product/Premium-Exterior-Emulsion' element={<PremiumExteriorEmulsion />} />
                  <Route path='/product/premium-exterior-emulsion' element={<Navigate to='/product/Premium-Exterior-Emulsion' replace />} />

                  {/* LUXURY PRODUCTS - UPDATED URLS */}
                  <Route path='/product/Luxury-Interior-Emulsion' element={<InteriorLatexPaint />} />
                  <Route path='/product/luxury-interior-emulsion' element={<Navigate to='/product/Luxury-Interior-Emulsion' replace />} />
                  <Route path='/product/Luxury-Exterior-Emulsion' element={<ExteriorLatexPaint />} />
                  <Route path='/product/luxury-exterior-emulsion' element={<Navigate to='/product/Luxury-Exterior-Emulsion' replace />} />

                  {/* OLD URLS - Redirect to new Luxury URLs for backward compatibility */}
                  <Route path='/product/Interior-Latex-Paint' element={<Navigate to='/product/Luxury-Interior-Emulsion' replace />} />
                  <Route path='/product/Nova' element={<Navigate to='/product/Luxury-Interior-Emulsion' replace />} />
                  <Route path='/product/nova' element={<Navigate to='/product/Luxury-Interior-Emulsion' replace />} />
                  <Route path='/product/Exterior-Latex-Paint' element={<Navigate to='/product/Luxury-Exterior-Emulsion' replace />} />
                  <Route path='/product/exterior-latex-paint' element={<Navigate to='/product/Luxury-Exterior-Emulsion' replace />} />
                  <Route path='/product/Calyco Exterior Latex Paint' element={<Navigate to='/product/Luxury-Exterior-Emulsion' replace />} />
                  <Route path='/product/Calyco%20Exterior%20Latex%20Paint' element={<Navigate to='/product/Luxury-Exterior-Emulsion' replace />} />
                  <Route path='/product/waterproofing-sealer' element={<WaterproofingSealer />} />
                  <Route path='/product/Stain%20&%20Sealer' element={<Navigate to='/product/waterproofing-sealer' replace />} />
                  <Route path='/stain-sealer' element={<Navigate to='/product/waterproofing-sealer' replace />} />

                  {/* New primer/putty pages using Premium template */}
                  <Route path='/product/calyco-water-primer-interior' element={<CalycoWaterPrimerInterior />} />
                  <Route path='/product/calyco-weather-primer-exterior' element={<CalycoWeatherPrimerExterior />} />
                  <Route path='/product/calyco-acrylic-wall-putty' element={<CalycoAcrylicPutty />} />
                  <Route path='/product/calyco-solvent-primer-interior' element={<CalycoSolventPrimerInterior />} />
                  <Route path='/product/calyco-damp-guard-primer' element={<CalycoDampGuardPrimer />} />
                  <Route path='/product/calyco-universal-primer' element={<CalycoUniversalPrimer />} />
                  <Route path='/product/pink-primer' element={<PinkPrimer />} />
                  <Route path='/product/yellow-metal-primer' element={<YellowMetalPrimer />} />
                  <Route path='/product/melamine-polish' element={<MelaminePolish />} />
                  <Route path='/product/fire-retardant-paint' element={<FireRetardantPaint />} />
                  <Route path='/product/calyco-amrella-enamel' element={<AmrellaEnamel />} />
                  <Route path='/product/calyco-pu-wood-coating' element={<PUWoodCoating />} />
                  <Route path='/product/calyco-acrylic-washable-distemper' element={<AcrylicWashableDistemper />} />
                  <Route path='/product/calyco-all-surface-coating' element={<AllSurfaceCoating />} />
                  <Route path='/product/calyco-texture-paint' element={<TexturePaints />} />

                  <Route path='/contractors' element={<ContractorsPage />} />
                  <Route path='/government' element={<GovernmentPage />} />
                  <Route path='/downloads' element={<DownloadsPage />} />
                  <Route path='/about' element={<AboutPage />} />
                  <Route path='/sustainability' element={<SustainabilityPage />} />
                  <Route path='/contact' element={<ContactPage />} />
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/checkout' element={<Checkout />} />
                  <Route path='/product/:productId' element={<DynamicProductPage />} />
                  <Route path='/faq' element={<FAQs />} />
                  <Route path='/test-page-codex' element={<TestPageCodex />} />
                  <Route path='/pages/product-finder' element={<ProductFinder />} />




                  {/* NEW BLOG SYSTEM */}
                  <Route path='/blog' element={<BlogIndex />} />
                  <Route path='/blog/:slug' element={<BlogPost />} />
                  <Route path='/admin/magic-upload' element={<MagicUpload />} />

                  {/* Colors Routes */}
                  <Route path='/colors' element={<ColorsPage />} />
                  <Route path="/colors/family/:familyName" element={<FamilyColorGroup />} />
                  <Route path="/colors/family/:familyName/:colorName" element={<ColorDetailPage />} />
                  <Route path="/colors/:colorName" element={<ColorPageWrapper />} />

                  {/* Inspiration Routes */}
                  <Route path='/inspirations' element={<InspirationPage />} />
                  <Route path='/inspirations/kitchen' element={<KitchenInspiration />} />
                  <Route path='/inspirations/bedroom' element={<BedroomInspiration />} />
                  <Route path='/inspirations/hallway' element={<HallwayInspiration />} />
                  <Route path='/inspirations/living' element={<LivingInspiration />} />
                  <Route path='/inspirations/livingroom' element={<EnhancedLivingRoomInspiration />} />
                  <Route path='/inspirations/bathroom' element={<BathroomInspiration />} />
                  <Route path='/inspirations/dining' element={<DiningInspiration />} />
                  <Route path='/inspirations/office' element={<OfficeInspiration />} />
                  <Route path='/inspirations/exterior' element={<ExteriorInspiration />} />
                  <Route path="/room/:roomName" element={<IndividualRoomPage />} />

                  {/* Texture Routes */}
                  <Route path='/textures' element={<TexturesPage />} />
                  <Route path='/textures/:textureSlug' element={<TextureDetailPage />} />

                  {/* Visualization Routes */}
                  <Route path='/room-visualization' element={<RoomVisualizerPage />} />
                  <Route path='/room-visualization/bedroom' element={<RoomVisualizer />} />
                  <Route path='/room-visualization/livingroom' element={<RoomVisualizer />} />
                  <Route path='/room-visualization/diningroom' element={<RoomVisualizer />} />
                  <Route path='/room-visualization/personalVisual' element={<RoomVisualizer />} />

                  {/* Policy Routes */}
                  <Route path="/policies" element={<PoliciesIndex />} />
                  <Route path="/policies/privacy" element={<Privacy />} />
                  <Route path="/policies/terms" element={<TermsAndConditions />} />
                  <Route path="/policies/payments-gst" element={<PaymentsGst />} />
                  <Route path="/policies/quality" element={<QualityPolicy />} />
                  <Route path="/policies/environmental-sustainability" element={<EnvironmentalSustainability />} />
                  <Route path="/policies/disclaimer" element={<ProductColorDisclaimer />} />
                  <Route path="/policies/shipping" element={<ShippingDelivery />} />
                  <Route path="/policies/returns" element={<ReturnsRefunds />} />
                  <Route path="/policies/warranty" element={<WarrantyPolicy />} />
                  <Route path="/customer-service" element={<CustomerService />} />

                  {/* City Landing Pages - Must be near the end to avoid conflicts */}
                  <Route path="/:citySlug" element={<CityLandingPage />} />

                  {/* 404 Fallback Route - MUST BE LAST */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </React.Suspense>
              <Footer />
            </div>
          </div>
        </ColorVisualizationProvider>
      </ColorProvider>
    </CartProvider>
  )
}

export default App;
// Deployment trigger - Wed Aug 20 22:53:10 IST 2025
// Force new deployment - Thu Aug 21 00:54:55 IST 2025
