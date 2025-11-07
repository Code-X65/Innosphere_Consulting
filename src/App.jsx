import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'
import Footer from './Components/Footer'
import AboutPage from './Pages/AboutPage'
import SolutionPages from './Components/SolutionsApp'
import SolutionDetail from './Components/SolutionDetail'
import ScrollToTop from './Components/ScrollToTop'
import Notfound from './Components/Notfound'
import CaseStudies from './Pages/CaseStudiesList'
import CaseStudyDetails from './Components/CaseStudyDetails'
import InsightsList from './Pages/InsightsList'
import InsightDetails from './Components/InsightDetails'
import ContactPage from './Pages/ContactPage'
import ConsultantForm from './Pages/ConsultantForm'
import { Facebook, MessageCircle, Instagram, Linkedin, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import DeChatbot from './Components/DeChatbot'
import PrivacyPolicy from './Components/PrivacyPolicy'
import TermsAndConditions from './Components/TermsAndConditions'

const App = () => {
  return (
    <Router basename='/Innosphere_Consulting'>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='solutions' element={<SolutionPages />} />
        <Route path='solution/:slug' element={<SolutionDetail />} />
        <Route path='cases' element={<CaseStudies />} />
        <Route path='cases/:slug' element={<CaseStudyDetails />} />
        <Route path='insights' element={<InsightsList />} />
        <Route path='insights/:slug' element={<InsightDetails />} />
        <Route path='contact' element={<ContactPage />} />
        <Route path='/Consultation' element={<ConsultantForm />} />
        <Route path='/Privacy_Policy' element={<PrivacyPolicy />} />
        <Route path='/Term_&_Condition' element={<TermsAndConditions />} />

        
        
        

        <Route path='*' element={<Notfound />}/>
      </Routes>
        {/* Social Media Sidebar */}
     <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
  {/* facebok */}
  <a
    href="https://www.facebook.com/share/1PpyynWHqF/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-800 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
  >
    <Facebook size={20} className="text-white" />
  </a>
  {/* X (Twitter) */}
  <a
    href="https://x.com/innosphere__/status/1986410325994848766?s=61"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
  >
    <Twitter size={20} className="text-white" />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/delacruzinnovations/#"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
  >
    <Instagram size={20} className="text-white" />
  </a>

  {/* TikTok */}
  <a
    href="https://vt.tiktok.com/ZSyasx4cq/"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-black hover:border-black transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className="w-5 h-5 text-white"
    >
      <path d="M223.66 70.93a48.37 48.37 0 0 1-27.83-8.95 48.63 48.63 0 0 1-20.3-39.6V16a8 8 0 0 0-8-8h-32a8 8 0 0 0-8 8v136a24 24 0 1 1-16-22.62V92a60 60 0 1 0 40 56V81.3a64.29 64.29 0 0 0 36.17 11.1 8 8 0 0 0 7.96-7.1l3.97-32a8 8 0 0 0-7.97-9.37Z"/>
    </svg>
  </a>
</div>

      <Footer />
      <DeChatbot />
    </Router>
  )
}

export default App