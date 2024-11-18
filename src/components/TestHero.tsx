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
import Search from './Search';


const TestHero = () => {
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
    <div className="relative h-[600px] bg-[url('/images/2.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#000000b8] opacity-70"></div> {/* Overlay */}
      <div className="absolute top-0 w-full h-full z-10 flex items-center justify-center flex-col space-y-10">
        <Search />
      </div>
      {/* <HeroParticle /> */}
    </div>
  );
};

export default TestHero;
