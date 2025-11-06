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
import { Facebook, MessageCircle, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

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
        
        
        

        <Route path='*' element={<Notfound />}/>
      </Routes>
        {/* Social Media Sidebar */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        <a href="#"
        target="_blank"
         rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
          <Facebook size={20} className="text-white" />
        </a>
        <a href="#"
        target="_blank"
        rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
          <MessageCircle size={20} className="text-white" />
        </a>
        <a href="#"target="_blank"
         rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
          <Instagram size={20} className="text-white" />
        </a>
        <a href="#"
        target="_blank"
         rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30">
          <Linkedin size={20} className="text-white" />
        </a>
      </div>
      <Footer />
    </Router>
  )
}

export default App