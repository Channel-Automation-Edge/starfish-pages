import React from 'react'
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import MarqueeContractors from '../components/MarqueeContractors';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Benefits from '@/components/Benefits';
import TestSection from '@/components/TestSection';
import TestHero from '@/components/TestHero';
import HowItWorks from '@/components/HowItWorks';
import BulletPoints from '@/components/BulletPoints';
import Bento from '@/components/Bento';
import Search from '@/components/Search';
import FAQ from '@/components/FAQ';
import TabSection from '@/components/TabSection';


const Home = () => {
  return (
    <div>
        
        <Hero/>
        <HowItWorks />
        <Search />
        
        {/* <MarqueeContractors /> */}
        
        <TestSection />
        <Benefits />
        <TabSection/>
        
        {/* <BulletPoints /> */}
        <FAQ />
        
        {/* <Services/>
        <Testimonials /> */}
        {/* <Bento/> */}
        <Footer />
    </div>
  )
}

export default Home
