"use client";
import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import servicesData from '../../../assets/assets.json';

// Define props interface
interface Step1SelectionProps {
  onNext: () => void;
}

const Step1Selection: React.FC<Step1SelectionProps> = ({ onNext }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }

  const { setSelectedService, firstname } = appContext;

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    console.log(`Selected service updated to: ${serviceId}`);
    onNext();
  };

  return (
    <div className="z-10 max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="space-y-8">
        
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="block text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold sm:font-bold md:font-semibold lg:font-semibold text-gray-800 dark:text-white">
              {firstname ? (
                <>
                  Hi {firstname}! Let's bring your{' '}
                  <span className="text-xorange">future project</span> to life—choose what fits your vision below
                </>
              ) : (
                <>
                  Hi there! Let's bring your{' '}
                  <span className="text-xorange">dream project</span> to life—choose what fits your vision below
                </>
              )}
            </h1>
          </div>
        </div>

        <div className=" flex flex-wrap justify-center"
            style={{ gap: '20px 30px', marginTop: '15px', width: '100%' }}>
              {servicesData.services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col items-center justify-center w-[256px] sm:w-[180px] md:w-[256px] lg:w-[256px] h-[156px] border border-indigo-100 rounded-[20px] shadow-md p-4 transition-transform transform hover:scale-105 bg-white"
                  onClick={() => handleServiceSelect(service.id)}
                  style={{boxShadow: 'rgba(0, 0, 0, 0.07) 0px 22px 30px -8px',
                    transition: 'box-shadow 0.3s ease',}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = 'rgba(255, 85, 0,0.5) 0px 10px 25px -8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 22px 30px -8px';
                  }}
                >
                  {/* <div className="w-10 h-10 mb-4 bg-xorange rounded-full flex items-center justify-center">
               
                  </div> */}
                  <span className="text-xpurple text-center">{service.name}</span>
                </div>
              ))}
            </div>
      </div>
    </div>
  );
};

export default Step1Selection;
