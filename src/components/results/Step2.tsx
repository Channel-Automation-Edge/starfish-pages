import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button } from "../ui/button";

interface Step2Props {
  onGoHome: () => void;
}

const Step2: React.FC<Step2Props> = ({ onGoHome }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }

  const { selectedContractors } = appContext;

  console.log('Loaded Step 2 with selected contractors:', selectedContractors);

  return (
    <div>
      <h1>Book An Appointment!</h1>
      <p>Only book an appointment once you are sure</p>

      {selectedContractors.map(contractor => (
        <div key={contractor.id} className="card">
          <div>{contractor.name}, {contractor.address}, {contractor.zip}, {contractor.state}</div>
          <div>Services: {contractor.matchingServices.join(', ')}</div>
          <Button>Book Appointment</Button>
        </div>
      ))}

      <Button type="submit" onClick={onGoHome}>Back to Home</Button>
    </div>
  );
};

export default Step2;
