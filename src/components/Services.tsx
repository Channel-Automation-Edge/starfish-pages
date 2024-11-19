import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import servicesData from '../assets/assets.json';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { AppContext } from '../context/AppContext'; // Ensure the correct path

const Services: React.FC = () => {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null; // Handle the case where appContext is not available
  }

  const { setInitialService, setSelectedServices } = appContext;

  const handleButtonClick = (id: number) => {
    setInitialService(id);
    setSelectedServices([]); // Reset selected services before navigation
    console.log('Setting Initial Service:', id);
    navigate('/formpage'); // Navigate to FormPage
  };

  return (
    <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto  justify-center">
      <div className="max-w-2xl pb-12 mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-neutral-200 text-center">
          Services
          </h2>
          <p className="mt-2 md:mt-4 text-gray-500 dark:text-neutral-500 text-center">
          At homeprojectpartners.com, we offer a wide range of services to help you improve and maintain your home. Here are some of the services our trusted contractors provide:
          </p>
      </div>
      <Carousel className="max-w-[100rem]" opts={{
        align: 'start',
        slidesToScroll: 1
      }}>
        <CarouselContent className="-ml-1">
          {servicesData.services.map(service => (
            <CarouselItem key={service.id} className="sm:1/2 md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <ServiceCard 
                  id={service.id}
                  name={service.name} 
                  photo={service.photo} 
                  description={service.description}
                  handleButtonClick={handleButtonClick} 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Services;
