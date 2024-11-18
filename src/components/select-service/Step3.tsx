import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import contractorsData from '../../assets/assets.json'; // Import contractors data
import { Button } from "../ui/button";
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
    <div>
      {loading ? (
        <p>Looking for matches...</p>
      ) : (
        <>
          {matchingContractors.length > 0 ? (
            <>
              <p>We found matches for your selected services:</p>
              {selectedServices.map((serviceId) => (
                <div key={serviceId} className="flex justify-between items-center p-4 border-b">
                  <span>{serviceId}</span>
                </div>
              ))}
              <Button onClick={handleViewMatches}>View matches</Button>
            </>
          ) : (
            <>
              <p>We found no matches for your selected services:</p>
              {selectedServices.map((serviceId) => (
                <div key={serviceId} className="flex justify-between items-center p-4 border-b">
                  <span>{serviceId}</span>
                </div>
              ))}
              <Button onClick={handleSelectDifferentServices}>Select different service/s</Button>
              <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogTrigger asChild>
                  <Button>Back to Home</Button>
                </DialogTrigger>
                <DialogContent>
                  <p>You will be going back to the landing page/homepage and your progress will not be saved.</p>
                  <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                  <Button onClick={handleDialogContinue}>Continue</Button>
                </DialogContent>
              </Dialog>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Step3;
