import { useState, useContext } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { AppContext } from '../../context/AppContext'; // Ensure this import is correct based on your file structure
// import DotPattern from '../ui/dot-pattern';
// import { cn } from '@/lib/utils';

const MultiStepForm = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null; // Ensure that the context is available
  }

  const { setSelectedServices, setMatchingContractors } = appContext;

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleRestart = () => {
    setSelectedServices([]); // Reset selected services
    setMatchingContractors([]); // Reset matching contractors
    setCurrentStep(1); // Go back to Step 1
  };

  const handleHome = () => {
    setSelectedServices([]); // Reset selected services
    setMatchingContractors([]); // Reset matching contractors
    // Any other state resets needed for a clean start
  };

  return (
    <div>
      {currentStep === 1 && <Step1 onNext={handleNextStep} />}
      {currentStep === 2 && <Step2 onNext={handleNextStep} />}
      {currentStep === 3 && <Step3 onRestart={handleRestart} onHome={handleHome} />}
      {/* <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        /> */}
      
    </div>
    
  );
};

export default MultiStepForm;
