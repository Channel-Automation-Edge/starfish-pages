import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import supabase from '../../../lib/supabaseClient';
import ResetButton from '@/components/ui/resetButton';
import BackButton from '@/components/ui/backButton';
import posthog from 'posthog-js';

// Define props interface
interface Step3SpecificationsProps {
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

const Step3Specifications: React.FC<Step3SpecificationsProps> = ({ onNext, onBack, onReset }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }

  const { selectedService, serviceSpecifications, setServiceSpecifications, formId } = appContext;
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>(serviceSpecifications);
  const [loading, setLoading] = useState<boolean>(false); // State to control spinner
  const [selectedServiceData, setSelectedServiceData] = useState<any>(null); // State to store service data
  const stepName = 'project_step3_serviceSpecifications';

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!selectedService) return;

      try {
        const { data, error } = await supabase
          .from('Services')
          .select('*')
          .eq('id', selectedService)
          .single();

        if (error) {
          console.error('Error fetching service data:', error);
          return;
        }

        setSelectedServiceData(data); // Set the fetched service data
      } catch (err) {
        console.error('Unexpected error fetching service data:', err);
      }
    };

    fetchServiceData();
  }, [selectedService]);

  const handleSpecSelect = (spec: string) => {
    setSelectedSpecs(prev => {
      const isSelected = !prev.includes(spec);
      const newSpecs = isSelected ? [...prev, spec] : prev.filter(s => s !== spec);
  
      // Capture the event with PostHog
      posthog.capture('specification_toggled', {
        specification: spec,
        state: isSelected ? 'selected' : 'deselected',
        step: stepName,
        form_id: formId,
        service_id: selectedService,
        zip: appContext.zip,
      });
  
      return newSpecs;
    });
  };
  

  const handleBack = () => { 
    setServiceSpecifications([]);
    posthog.capture('form_back', {
      form_id: appContext.formId,
      zip: appContext.zip,
      service_id: selectedService,
      step: stepName,
      previous_step: 'project_step2_zipCheck',
    });
    onBack(); 
  };

  const handleReset = () => {
    posthog.capture('form_reset', {
      form_id: appContext.formId,
      zip: appContext.zip,
      step: stepName,
      service_id: appContext.selectedService,
    });
    onReset();
  };
  
useEffect(() => {
    // Capture the start event for this step
    posthog.capture(stepName + '_start', {
      form_id: formId,
      service_id: appContext.selectedService,
      zip: appContext.zip,
    });

    // Function to capture user exit event
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      posthog.capture('page_exit', {
        step: stepName,
        form_id: formId,
        service_id: appContext.selectedService,
        zip: appContext.zip,
      });
      event.preventDefault();// Prevent the default action to ensure the event is captured
    };
    window.addEventListener('beforeunload', handleBeforeUnload); // Add event listener for beforeunload
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload); // Cleanup function to remove the event listener
    };
  }, [stepName]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Show spinner
    setServiceSpecifications(selectedSpecs);
    localStorage.setItem('serviceSpecifications', JSON.stringify(selectedSpecs));
    console.log('Service Specifications:', selectedSpecs);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const phoneFromUrl = urlParams.get('phone') || null;
      // Check if formId exists in the database
      const { data, error } = await supabase
        .from('Forms')
        .select('id')
        .eq('id', formId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking formId:', error);
        await sendErrorWebhook('Error checking formId', error);
        setLoading(false);
        return;
      }

      if (data) {
        // formId exists, update the updated_at column
        const { error: updateError } = await supabase
          .from('Forms')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', formId);

        if (updateError) {
          console.error('Error updating formId:', updateError);
          await sendErrorWebhook('Error updating formId', updateError);
          setLoading(false);
          return;
        }

        console.log(`FormId ${formId} updated.`);
      } else {
        // formId does not exist, insert a new row
        const { error: insertError } = await supabase
          .from('Forms')
          .insert([{ id: formId, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), phone: phoneFromUrl }]);

        if (insertError) {
          console.error('Error inserting formId:', insertError);
          await sendErrorWebhook('Error inserting formId', insertError);
          setLoading(false);
          return;
        }

        console.log(`FormId ${formId} inserted with phone: ${phoneFromUrl}`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      await sendErrorWebhook('Unexpected error', err);
      setLoading(false);
      return;
    }
    posthog.capture(stepName + '_complete', {
      form_id: formId,
      service_id: selectedService,
      specifications: selectedSpecs,
      zip: appContext.zip,
    });

    setLoading(false); // Hide spinner
    onNext();
  };

  // Function to send a webhook with error details
  const sendErrorWebhook = async (message: string, error: any) => {
    try {
      const response = await fetch('https://hkdk.events/09d0txnpbpzmvq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: {
            message,
            details: error.message || error,
          },
          formId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error('Failed to send error webhook');
      } else {
        console.log('Error webhook sent successfully');
      }
    } catch (webhookError) {
      console.error('Error sending webhook:', webhookError);
    }
  };

  useEffect(() => {
    setSelectedSpecs(serviceSpecifications);
  }, [serviceSpecifications]);

  return (
    <div className="z-10 max-w-[100rem] px-4 md:px-14 py-10 lg:py-14 mx-auto relative">
      <div className="absolute top-[-102px] custom-smallest:top-[-110px] small-stepper:top-[-115px] sm:top-[-121px] md:top-[-137px] left-0 w-full flex justify-between p-4">
        <BackButton onClick={handleBack} />
        <ResetButton onClick={handleReset} />
      </div>

      <div className="space-y-8">
        <div className='flex justify-center text-center mb-8'>
          <div className="max-w-[40rem] text-center">
            <h1 className="block text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-bold sm:font-bold md:font-semibold lg:font-semibold text-gray-800 dark:text-white">
              Pick the <span className="text-xorange">specifications</span> that match your project and let's get started!
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 flex flex-col h-full">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-[20px]" style={{ marginTop: '15px', width: '100%' }}>
          {selectedServiceData?.specifiedService.map((spec: string, index: number)=> (
              <button
                key={index}
                type="button"
                className="flex flex-row sm:flex-col items-center justify-start sm:justify-center w-full sm:w-[200px] h-[80px] sm:h-[120px] border border-transparent rounded-xl shadow-md p-4 transition-transform transform hover:scale-100 sm:hover:scale-105 bg-white"
                onClick={() => handleSpecSelect(spec)}
                style={{
                  boxShadow: selectedSpecs.includes(spec)
                    ? 'rgba(255, 81, 0, 0.7) 0px 10px 25px -6px'
                    : 'rgba(0, 0, 0, 0.07) 0px 22px 30px -6px',
                  transition: 'box-shadow 0.3s ease',
                  borderColor: selectedSpecs.includes(spec)
                    ? 'rgba(255, 81, 0, 0.7)'
                    : 'rgba(157, 176, 197, 0.25)',
                }}
                onMouseEnter={(e) => {
                  if (!selectedSpecs.includes(spec)) {
                    e.currentTarget.style.boxShadow = 'rgba(255, 81, 0, 0.7) 0px 10px 25px -6px';
                    e.currentTarget.style.borderColor = 'rgba(255, 81, 0, 0.7)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedSpecs.includes(spec)) {
                    e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 22px 30px -6px';
                    e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
                  }
                }}
              >
                <span className="text-gray-800 text-base font-medium sm:text-center text-left">{spec}</span>
              </button>
            ))}
            <button
              type="button"
              className="flex flex-row sm:flex-col items-center justify-start sm:justify-center w-full sm:w-[200px] h-[80px] sm:h-[120px] border border-transparent rounded-xl shadow-md p-4 transition-transform transform hover:scale-100 sm:hover:scale-105 bg-white"
              onClick={() => handleSpecSelect("Other")}
              style={{
                boxShadow: selectedSpecs.includes("Other")
                  ? 'rgba(255, 81, 0, 0.7) 0px 10px 25px -6px'
                  : 'rgba(0, 0, 0, 0.07) 0px 22px 30px -6px',
                transition: 'box-shadow 0.3s ease',
                borderColor: selectedSpecs.includes("Other")
                  ? 'rgba(255, 81, 0, 0.7)'
                  : 'rgba(157, 176, 197, 0.25)',
              }}
              onMouseEnter={(e) => {
                if (!selectedSpecs.includes("Other")) {
                  e.currentTarget.style.boxShadow = 'rgba(255, 81, 0, 0.7) 0px 10px 25px -6px';
                  e.currentTarget.style.borderColor = 'rgba(255, 81, 0, 0.7)';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedSpecs.includes("Other")) {
                  e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.07) 0px 22px 30px -6px';
                  e.currentTarget.style.borderColor = 'rgba(157, 176, 197, 0.25)';
              }}}
            >
              <span className="text-gray-800 text-base font-medium sm:text-center text-left">Other</span>
            </button>
          </div>
          <div className="mt-20 flex justify-center">
            <button
              type="submit"
              className={`w-full max-w-xs px-24 py-6 inline-flex justify-center items-center gap-x-2 text-base font-medium rounded-lg border border-transparent ${
                selectedSpecs.length > 0
                  ? 'bg-xorange text-white hover:bg-xorangeDark shadow-lg shadow-[rgba(255,85,0,0.5)] transform transition-transform translate-y-[-8px]'
                  : 'bg-gray-200 text-white cursor-not-allowed'
              }`}
              disabled={selectedSpecs.length === 0}
            >
              {loading ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3Specifications;