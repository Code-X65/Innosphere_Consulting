import React from 'react'
import StrategyAccordion from '../Components/StrategyAccordion'
import HeroSection from '../Components/HeroSection'
import LeadershipTeam from '../Components/LeadershipTeam'
import MissionVisionValues from '../Components/MissionVisionValues'
import AboutUs from '../Components/AboutUs'

const AboutPage = () => {
  return (
    <>
        {/* <HeroSection /> */}
        <AboutUs />
        <StrategyAccordion />
        <LeadershipTeam />
        <MissionVisionValues />
    </>
  )
}

export default AboutPage