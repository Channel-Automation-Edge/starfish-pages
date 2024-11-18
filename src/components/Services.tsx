import React from 'react';
import OutdoorServices from './OutdoorServices';
import IndoorServices from './IndoorServices';
import {motion} from 'framer-motion';
import Marquee from './ui/marquee';

const Services = () => {
  return (
    <div className="w-full h-[1167px]">
      <div className="max-w-7xl mx-auto px-4"> 
        <h1 className="text-primary text-left text-2xl font-bold py-8 mt-4">Outdoor Services</h1> 
        <div className="flex justify-center">
          <OutdoorServices />
        </div>
        <h1 className="text-[#081F3B] text-left text-2xl font-bold py-8 mt-4">Indoor Services</h1> 
        <div className="flex justify-center">
          <IndoorServices />
        </div>
      </div>
    </div>
  );
}

export default Services;
