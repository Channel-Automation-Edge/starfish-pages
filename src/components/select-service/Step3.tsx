import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import contractorsData from '../../assets/assets.json'; // Import contractors data
import servicesData from '../../assets/assets.json'; // Import services data
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
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          We found matches for your selected services:
        </h1>
        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          {loading ? (
            <p className="text-center text-lg font-medium">Looking for matches...</p>
          ) : (
            <>
              {matchingContractors.length > 0 ? (
                <>
                  <p className="text-center text-lg font-medium">We found matches for your selected services:</p>
                  {selectedServices.map((serviceId) => {
                    const service = servicesData.services.find((s: any) => s.id === serviceId);
                    return (
                      <div key={serviceId} className="flex justify-between items-center p-4 border-b">
                        <span>{service ? service.name : "Service not found"}</span>
                      </div>
                    );
                  })}
                  <button
                    onClick={handleViewMatches}
                    className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
                  >
                    View matches
                  </button>
                </>
              ) : (
                <>
                  <p>We found no matches for your selected services:</p>
                  {selectedServices.map((serviceId) => {
                    const service = servicesData.services.find((s: any) => s.id === serviceId);
                    return (
                      <div key={serviceId} className="flex justify-between items-center p-4 border-b">
                        <span>{service ? service.name : "Service not found"}</span>
                      </div>
                    );
                  })}

                  <div className="flex justify-between">
                    <button
                      onClick={handleSelectDifferentServices}
                      className="block w-[45%] rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
                    >
                      Select different service/s
                    </button>

                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                      <DialogTrigger asChild>
                        <button className="block w-[45%] rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white">
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
