import React from 'react';
import ServiceCard from './ServiceCard';
import servicesData from '../assets/assets.json';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

const OutdoorServices: React.FC = () => {
  return (
    <Carousel className="w-full" opts={{
      align: 'start',
      slidesToScroll: 1
    }}>
      <CarouselContent className="-ml-1">
        {servicesData.services
          .filter(service => service.type === 'outdoor') // Filter for outdoor services
          .map(service => (
            <CarouselItem key={service.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ServiceCard 
                  name={service.name} 
                  photo={service.photo} 
                  description={service.description} 
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default OutdoorServices;
