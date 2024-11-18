import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';

const ResultsForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleGoHome = () => {
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div>
      {currentStep === 1 && <Step1 onNext={handleNextStep} onGoHome={handleGoHome} />}
      {currentStep === 2 && <Step2 onGoHome={handleGoHome} />}
    </div>
  );
};

export default ResultsForm;
