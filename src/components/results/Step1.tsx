import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { AppContext } from '../../context/AppContext';
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
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto relative pb-24">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1  className="block text-3xl font-bold text-primary dark:text-white">
          Get your estimate from your local experts
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Select which contractors to request quote from
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col mt-12">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th scope="col" style={{ width: '9.375%' }} className="ps-6 py-3 text-start">
                          <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                            <input
                              type="checkbox"
                              className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                              id="hs-at-with-checkboxes-main"
                              checked={allSelected}
                              onChange={() => formik.setFieldValue('selectedContractors', allSelected ? [] : matchingContractors.map(c => c.id))}
                            />
                            <span className="sr-only">Checkbox</span>
                          </label>
                        </th>

                        <th scope="col" style={{ width: '21.875%' }} className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Contractor
                            </span>
                          </div>
                        </th>

                        <th scope="col" style={{ width: '18.75%' }} className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Address
                            </span>
                          </div>
                        </th>

                        <th scope="col" style={{ width: '50%' }} className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                              Matching Services
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {matchingContractors.map(contractor => (
                        <tr key={contractor.id}>
                          <td style={{ width: '9.375%' }} className="whitespace-nowrap">
                            <div className="ps-6 py-3">
                              <label htmlFor={`contractor-checkbox-${contractor.id}`} className="flex">
                                <input
                                  type="checkbox"
                                  className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id={`contractor-checkbox-${contractor.id}`}
                                  checked={formik.values.selectedContractors.includes(contractor.id)}
                                  onChange={() => handleCheckboxChange(contractor.id)}
                                />
                                <span className="sr-only">Checkbox</span>
                              </label>
                            </div>
                          </td>
                          <td style={{ width: '21.875%' }} className="whitespace-nowrap">
                            <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                              <div className="flex items-center gap-x-3">
                                <img
                                  className="inline-block size-[38px] rounded-full"
                                  src={contractor.photo}
                                  alt={contractor.name}
                                />
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {contractor.name}
                                  </span>
                                  <span className="block text-sm text-gray-500 dark:text-neutral-500">{contractor.name}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ width: '18.75%' }} className="whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                {contractor.address}
                              </span>
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {contractor.zip}, {contractor.state}
                              </span>
                            </div>
                          </td>
                          <td style={{ width: '50%' }} className="whitespace-nowrap">
                            <div className="px-6 py-3 flex flex-wrap gap-1">
                              {contractor.matchingServices.map((serviceId: number) => {
                                const service = servicesData.services.find(s => s.id === serviceId);
                                return (
                                  <span key={serviceId} className="py-1 pr-2 pl-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                    <svg
                                      className="size-2.5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    {service ? service.name : serviceId}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* End Table */}
                </div>
              </div>
            </div>
            {/* end card */}
          </div>
        </form>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-md py-6 border-t border-gray-200 dark:border-neutral-700">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6">
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="py-3 px-5 inline-flex items-center gap-x-3 font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              disabled={formik.values.selectedContractors.length === 0 || !formik.values.acceptance}
            >
              Request Quotes from {formik.values.selectedContractors.length} Contractors
            </button>
          </DialogTrigger>
          <DialogContent>
            <p>Contractors will get in touch with you soon. Check your inbox sent to {email} for the details.</p>
            <p>Optional: If you have decided on a contractor, book your appointment now!.</p>
            <div className="flex justify-between space-x-4 mt-4">
              <form onSubmit={formik.handleSubmit} className="w-full">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Book an Appointment
                </button>
              </form>
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                onClick={onGoHome}
              >
                No, Thanks
              </button>
            </div>
          </DialogContent>
        </Dialog>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="acceptance"
              id="acceptance"
              checked={formik.values.acceptance}
              onChange={formik.handleChange}
              className="shrink-0 w-6 h-6 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            />
            <div className="ms-4">
              <label htmlFor="acceptance" className=" dark:text-white">
                I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="#" target="_parent">Terms and Conditions</a>
              </label>
              {formik.touched.acceptance && !formik.values.acceptance && (
                <div className="error">This field is required</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
