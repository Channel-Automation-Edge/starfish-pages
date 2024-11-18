import React from 'react';
import { Card, CardContent, CardFooter } from "./ui/card";
import ShinyButton from './ui/shiny-button';

interface ServiceCardProps {
  name: string;
  photo: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, photo, description }) => {
  return (
    <div className="relative w-full h-[320px]">
      <Card className="w-full h-full rounded-[12px] bg-cover bg-center overflow-hidden bg-[url('/images/1.jpg')]">
      <div
          className="absolute inset-0 rounded-[12px]"
          style={{
            background: 'linear-gradient(0deg, rgba(28, 28, 27, 0.60) 0.15%, rgba(36, 36, 35, 0.56) 40.36%, rgba(117, 117, 112, 0.22) 63.97%, rgba(167, 167, 159, 0.00) 99.88%)'
          }}
        ></div>
        <CardContent className="relative z-10">
        <h5 className="absolute top-[160px] left-[38px] text-white">{name}</h5>
        <p className="absolute top-[190px] left-[38px] text-white text-sm">{description}</p>
        <div className="absolute top-[270px] left-[38px]"> <ShinyButton className='bg-accent rounded-[99999px]'>Find Professionals</ShinyButton> </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCard;
