import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import contractorsData from '../../assets/assets.json'; 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog from shadcn

interface Step3Props {
  onRestart: () => void;
  onHome: () => void;
}

const Step3: React.FC<Step3Props> = ({ onRestart, onHome }) => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // State for loading message
  const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

  if (!appContext) {
    return null;
  }

  const { zip, state, email, phone, firstname, lastname, initialService, selectedServices, setSelectedServices, setMatchingContractors, setInitialService, matchingContractors } = appContext;

  useEffect(() => {
    console.log("Looking for matches...");
    console.log("Current state values:");
    console.log("Zip:", zip, "State:", state, "Email:", email, "Phone:", phone, "Firstname:", firstname, "Lastname:", lastname, "Initial Service:", initialService, "Selected Services:", selectedServices);

    setMatchingContractors([]); // Clear matchingContractors

    const matchedContractors = contractorsData.contractors.reduce((acc: any, contractor: any) => {
      console.log("Checking contractor ID:", contractor.id);
      console.log("Zip match:", contractor.zip === zip);
      console.log("State match:", contractor.state === state);

      if (contractor.zip === zip && contractor.state === state) {
        const tempMatches = selectedServices.filter((serviceId) =>
          contractor.services.includes(serviceId)
        );

        console.log("Temp matches:", tempMatches);

        if (tempMatches.length > 0) {
          console.log(`Contractor ${contractor.name} matches with services:`, tempMatches);
          acc.push({
            ...contractor,
            matchingServices: tempMatches,
            photo: contractor.photo, // Include the photo property
          });
        } else {
          console.log("No matching services for contractor ID:", contractor.id);
        }
      }
      return acc;
    }, []);

    setMatchingContractors(matchedContractors);
    setLoading(false); // Stop showing the loading message

    console.log("Matching contractors found:", matchedContractors);
  }, [zip, state, email, phone, firstname, lastname, initialService, selectedServices, setMatchingContractors]);

  useEffect(() => {
    console.log("Final state values:");
    console.log("Zip:", zip, "State:", state, "Email:", email, "Phone:", phone, "Firstname:", firstname, "Lastname:", lastname, "Initial Service:", initialService, "Selected Services:", selectedServices, "Matching Contractors in Context:", matchingContractors);
  }, [matchingContractors, zip, state, email, phone, firstname, lastname, initialService, selectedServices]);

  const handleViewMatches = () => {
    navigate('/contractor-results');
  };

  const handleSelectDifferentServices = () => {
    setSelectedServices([]);
    setMatchingContractors([]);
    setInitialService(0);
    onRestart();
  };

  const handleDialogContinue = () => {
    setSelectedServices([]);
    setMatchingContractors([]);
    setInitialService(0);
    onHome();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          {loading ? (
            <p className="text-center text-lg font-medium">Looking for matches...</p>
          ) : (
            <>
              {matchingContractors.length > 0 ? (
                <>
                  <h1 className="block text-2xl font-bold text-primary dark:text-white text-center">Local Experts Found!</h1>
                  <p className="mt-2 text- text-gray-800 dark:text-neutral-400 text-center">
                  We’ve identified skilled local experts who are perfectly suited to complete your selected projects. 
  
                  </p>
                  
                  <p className="mt-2 pt-3 text-s text-gray-600 dark:text-neutral-400 text-center">
                  Click the button below to explore your options
                  </p>
                  <button
                    onClick={handleViewMatches}
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    View matches
                  </button>
                </>
              ) : (
                <>
                  <h1 className="block text-2xl font-bold text-primary dark:text-white text-center">Oh no...</h1>
                  <p className="mt-2 text- text-gray-800 dark:text-neutral-400 text-center">
                  We couldn't find any local experts who match your selected services in your area.
                  </p>

                  <div className="space-y-2">
                    <button
                      onClick={handleSelectDifferentServices}
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Select different service/s
                    </button>

                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                      <DialogTrigger asChild>
                        <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                          Back to Home
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <p>You will be going back to the landing page/homepage and your progress will not be saved.</p>
                        <button onClick={() => setShowDialog(false)}>Cancel</button>
                        <button onClick={handleDialogContinue}>Continue</button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;
