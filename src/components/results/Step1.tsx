import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { AppContext } from '../../context/AppContext';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import servicesData from '../../assets/assets.json'; // Import services data

interface Step1Props {
  onNext: () => void;
  onGoHome: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext, onGoHome }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }

  const { matchingContractors, setSelectedContractors, email } = appContext;

  useEffect(() => {
    setSelectedContractors([]); // Clear selectedContractors
    console.log('Form loaded with matching contractors:', matchingContractors);
  }, [matchingContractors, setSelectedContractors]);

  const formik = useFormik({
    initialValues: {
      selectedContractors: matchingContractors.map(contractor => contractor.id),
      acceptance: false,
    },
    onSubmit: (values) => {
      if (!values.acceptance) {
        console.log("Acceptance is required.");
        return;
      }
      setSelectedContractors(matchingContractors.filter(contractor => values.selectedContractors.includes(contractor.id)));
      console.log("Form submitted with selected contractors:", values.selectedContractors);
      onNext(); // Move to the next step
    },
  });

  const allSelected = formik.values.selectedContractors.length === matchingContractors.length;

  const handleCheckboxChange = (contractorId: number) => {
    const currentIndex = formik.values.selectedContractors.indexOf(contractorId);
    const newSelected = [...formik.values.selectedContractors];

    if (currentIndex === -1) {
      newSelected.push(contractorId);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    formik.setFieldValue('selectedContractors', newSelected);
    console.log("Updated selected contractors:", newSelected);
  };

  return (
    <div>
      <h1>Here are the matching Pros in your area</h1>
      <h2>Select which contractors to request quote from</h2>

      <form onSubmit={formik.handleSubmit}>
        {matchingContractors.map(contractor => (
          <div key={contractor.id} className="card">
            <input
              type="checkbox"
              checked={formik.values.selectedContractors.includes(contractor.id)}
              onChange={() => handleCheckboxChange(contractor.id)}
            />
            <div>{contractor.name}, {contractor.address}, {contractor.zip}, {contractor.state}</div>
            <div>Services: {contractor.matchingServices.map(serviceId => {
              const service = servicesData.services.find(s => s.id === serviceId);
              return service ? service.name : serviceId;
            }).join(', ')}</div>
          </div>
        ))}

        <div>{formik.values.selectedContractors.length} / {matchingContractors.length} selected</div>

        <Button type="button" disabled={allSelected} onClick={() => formik.setFieldValue('selectedContractors', matchingContractors.map(c => c.id))}>
          Select All
        </Button>

        <div>
          <input
            type="checkbox"
            name="acceptance"
            checked={formik.values.acceptance}
            onChange={formik.handleChange}
          />
          <span>I accept the terms and conditions</span>
          {formik.touched.acceptance && !formik.values.acceptance && (
            <div className="error">This field is required</div>
          )}
        </div>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" disabled={formik.values.selectedContractors.length === 0 || !formik.values.acceptance}>
            Request Quotes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <p>Contractors will get in touch with you soon. Check your inbox sent to {email} for the details.</p>
          <p>Optional: If you have decided on a contractor and are ready to book an appointment, click the button below.</p>
          <form onSubmit={formik.handleSubmit}>
            <Button type="submit">Book an Appointment</Button>
          </form>
          <Button onClick={onGoHome}>No, Thanks</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Step1;
