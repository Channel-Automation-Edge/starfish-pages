"use client";
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import { AppContext } from '../../context/AppContext';
import servicesData from '../../assets/assets.json';

// Define props interface
interface Step1Props {
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }

  const { initialService, setSelectedServices, setInitialService } = appContext;
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formik = useFormik({
    initialValues: {
      selectedServices: initialService ? [initialService] : [],
    },
    onSubmit: (values) => {
      if (values.selectedServices.length === 0) {
        console.log("No services selected. Please choose at least 1 service.");
      } else {
        console.log("Continuing to the next step with selectedServices:", values.selectedServices);
        setSelectedServices(values.selectedServices);
        formik.resetForm(); // Clear formik values after submission
        onNext(); // Call onNext prop to move to the next step
      }
    },
  });

  useEffect(() => {
    if (initialService) {
      console.log("Initial service added to formik values:", formik.values.selectedServices);
      setInitialService(0); // Clear initialService
    }
  }, [initialService, formik, setInitialService]);

  useEffect(() => {
    console.log("Updated selected services:", formik.values.selectedServices);
  }, [formik.values.selectedServices]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredServices = servicesData.services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
      <div className="text-center">
          <h1  className="block text-3xl font-bold text-primary dark:text-white">
          Let us know what you need
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Select services you are interested in
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className=" mt-12 flex flex-col h-full">
            {/* Top Section */}
            <div className="flex-grow">
              <div className="relative mb-4" data-hs-combo-box="" ref={dropdownRef}>
                <div className="relative">
                  <input
                    className="py-3 ps-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    type="text"
                    placeholder="Search service..."
                    role="combobox"
                    aria-expanded={isDropdownOpen}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute top-1/2 end-3 -translate-y-1/2" aria-expanded={isDropdownOpen} data-hs-combo-box-toggle="">
                    <svg className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m7 15 5 5 5-5"></path>
                      <path d="m7 9 5-5 5 5"></path>
                    </svg>
                  </div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto">
                    {filteredServices.length > 0 ? (
                      filteredServices.map((service) => (
                        <div
                          key={service.id}
                          className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800"
                          onClick={() => {
                            const isSelected = formik.values.selectedServices.includes(service.id);
                            const newSelectedServices = isSelected
                              ? formik.values.selectedServices.filter(id => id !== service.id)
                              : [...formik.values.selectedServices, service.id];
                            formik.setFieldValue('selectedServices', newSelectedServices);
                            setIsDropdownOpen(false); // Close dropdown after selection
                          }}
                        >
                          <div className="flex justify-between items-center w-full">
                            <span>{service.name}</span>
                            <span className={formik.values.selectedServices.includes(service.id) ? "block" : "hidden"}>
                              <svg className="shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-2 px-4 text-sm text-gray-800">No service found.</div>
                    )}
                  </div>
                )}
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {formik.values.selectedServices.length > 0 ? (
                  formik.values.selectedServices.map((serviceId: number) => {
                    const service = servicesData.services.find(s => s.id === serviceId);
                    if (!service) return null;
                    return (
                      <div key={service.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mt-1.5">
                        <span>{service.name}</span>
                        <button
                          type="button"
                          className="text-gray-500 hover:text-red-600 focus:outline-none"
                          onClick={() => {
                            formik.setFieldValue('selectedServices', formik.values.selectedServices.filter((id: number) => id !== serviceId));
                          }}
                        >
                          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                          </svg>
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-sm text-gray-500">Choose at least 1 service to continue</p>
                )}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Continue
              </button>
            </div>
          </form>
      
      </div>
    </div>
  );
};

export default Step1;
