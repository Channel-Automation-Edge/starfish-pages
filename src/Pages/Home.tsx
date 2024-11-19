import Hero from '../components/Hero';
import Footer from '@/components/Footer';
import Benefits from '@/components/Benefits';
import HowItWorks from '@/components/HowItWorks';
import Search from '@/components/Search';
import FAQ from '@/components/FAQ';
import TabSection from '@/components/TabSection';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';


const Home = () => {
  return (
    <div>
        
        <Hero/>
        <HowItWorks />
        <Search />
        
        {/* <MarqueeContractors /> */}
        
        <Testimonials />
        <Benefits />

        <Services />
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
