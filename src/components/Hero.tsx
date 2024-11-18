"use client";
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroParticle } from './HeroParticle';
import GradualSpacing from './ui/gradual-spacing';
import { motion } from 'framer-motion';
import ShimmerButton from './ui/shimmer-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import servicesData from '../assets/assets.json';
import { AppContext } from '../context/AppContext';
import NavBar from './NavBar';

const Hero = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null; // Handle the case where appContext is not available
  }

  const { initialService, setInitialService, setSelectedServices } = appContext;

  useEffect(() => {
    console.log('Updated Initial Service:', initialService);
  }, [initialService]);

  const handleSelectChange = (value: string) => {
    setInitialService(Number(value)); // Convert the value to a number
  };

  const handleButtonClick = () => {
    // Reset selected services before navigation
    setSelectedServices([]);
    console.log('Resetting selected services and navigating with Initial Service:', initialService);
    navigate('/formpage'); // Navigate to FormPage
  };
  

  return (
    <div>
      
      <div className="relative h-[600px] bg-[url('/images/2.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#000000b8] opacity-70"></  div> {/* Overlay */}

      <div className='absolute top-0 w-full h-full'>
        <NavBar/>
        <div className=" z-10 flex items-center justify-center flex-col space-y-5">
          <GradualSpacing
            className="font-display text-center text-8xl font-bold -tracking-widest text-off dark:text-white md:text-5xl md:leading-[5rem] mt-[160px]"
            text="Get Expert Estimates, Hassle-Free"
          />

          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-white/70 xl:w-[40rem] text-center mb-10"
          >
            Trusted professionals. Transparent pricing. Tailored estimates
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ delay: 0.6 }}
            className='flex items-center justify-center w-full max-w-2xl px-4 py-2'
          >
            {/* <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="left-[396px] w-[300px] top-[438px] rounded-[9999px] mr-2 py-6 bg-secondary">
                <SelectValue placeholder="Select your project" />
              </SelectTrigger>
              <SelectContent className="bg-secondary">
                {servicesData.services.map((service) => (
                  <SelectItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            {/* <ShimmerButton
              background='#EEC156'
              shimmerColor='#081E3B'
              className="shadow-2xl"
              id='FindProf'
              onClick={handleButtonClick}
            >
              <small className="whitespace-pre-wrap text-center text-primary dark:from-white dark:to-slate-900/10">
                Find a Professional
              </small>
            </ShimmerButton> */}
            <button
                className="inline-flex justify-center items-center gap-x-3 text-center bg-[#FFD469] shadow-lg shadow-[#4D4637] hover:shadow-primary border border-transparent text-primary text-sm font-medium rounded-full focus:outline-none focus:shadow-primary py-3 px-6"
                onClick={handleButtonClick}
              >
                Get started
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
          </motion.div>
        </div>
      </div>

      
      {/* <HeroParticle /> */}
    </div>
    </div>
    
  );
};

export default Hero;
