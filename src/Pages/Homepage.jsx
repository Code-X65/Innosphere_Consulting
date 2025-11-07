import React from 'react'
import Hero from '../Components/Hero'
import StatsBar from '../Components/StatsBar'
import ServicesOverview from '../Components/ServicesOverview'
import StrategicDifferentiators from '../Components/StrategicDifferentiators'
import IndustriesWeServe from '../Components/IndustriesWeServe'
import CTABanner from '../Components/CTABanner'
import SolutionsApp from '../Components/SolutionsApp'
import AboutUs from '../Components/AboutUs'
import Testimonials from '../Components/Testimonials'
import RequestCallBack from '../Components/RequestCallBack'

const Homepage = () => {
  return (
    <>
    
    <Hero />
    <StatsBar />
    <SolutionsApp />
    {/* <AboutUs /> */}
    <Testimonials />
    {/* <ServicesOverview /> */}
    {/* <StrategicDifferentiators /> */}
    {/* <IndustriesWeServe /> */}
    <RequestCallBack />
    </>
  )
}

export default Homepage