"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AppContext } from '../../context/AppContext';
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedServiceName, setSelectedServiceName] = useState("");

  const formik = useFormik({
    initialValues: {
      selectedServices: initialService ? [initialService] : [],
    },
    onSubmit: (values) => {
      if (values.selectedServices.length === 0) {
        console.log("No services selected. Please choose at least 1 service.");
        setPopoverOpen(true);
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

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"> 
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">Let us know what you need</h1>

        

        <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Select services you are interested in</p>


          <div>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={popoverOpen}
                  className="justify-between rounded-lg border-gray-200 p-4 text-sm shadow-sm custom-popover"
                >
                  {selectedServiceName || "Select service..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0">
                <Command>
                  <CommandInput placeholder="Search service..." />
                  <CommandList>
                    <CommandEmpty>No service found.</CommandEmpty>
                    <CommandGroup>
                      {servicesData.services.map((service) => (
                        <CommandItem
                          key={service.id}
                          value={service.name}
                          onSelect={(currentValue) => {
                            const serviceId = servicesData.services.find(s => s.name === currentValue)?.id;
                            if (serviceId !== undefined) {
                              const isSelected = formik.values.selectedServices.includes(serviceId);
                              const newSelectedServices = isSelected 
                                ? formik.values.selectedServices.filter(id => id !== serviceId)
                                : [...formik.values.selectedServices, serviceId];
                              formik.setFieldValue('selectedServices', newSelectedServices);
                              setSelectedServiceName(isSelected ? "" : currentValue);
                              setPopoverOpen(false);
                            }
                          }}
                        >
                          {service.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              formik.values.selectedServices.includes(service.id) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
          {formik.values.selectedServices.length > 0 ? (
            formik.values.selectedServices.map((serviceId: number) => {
              const service = servicesData.services.find(s => s.id === serviceId);
              if (!service) return null;
              return (
                <div key={service.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mt-1.5">
                  <span>{service.name}</span>
                  <Button className='' onClick={() => {
                    formik.setFieldValue('selectedServices', formik.values.selectedServices.filter((id: number) => id !== serviceId));
                    setSelectedServiceName(""); // Clear selected service name
                  }}>Remove</Button>
                </div>
              );
            })
          ) : (
            <p className='text-center text-sm text-gray-500'>Choose at least 1 service to continue</p>
          )}
        </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
          >
            Continue
          </button>
        </form>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
          inventore quaerat mollitia?
        </p>
      </div>
    </div>
    </div>
  );
};

export default Step1;
