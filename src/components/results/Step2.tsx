import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import servicesData from '../../assets/assets.json'; // Import services data

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
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto relative pb-24">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
            Book An Appointment!
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Only book an appointment once you are sure
          </p>
        </div>

        <div className="mt-12">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th scope="col" className="w-4/16 ps-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Contractor
                          </span>
                        </th>

                        <th scope="col" className="w-3/16 px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Address
                          </span>
                        </th>

                        <th scope="col" className="w-5/16 px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Matching Services
                          </span>
                        </th>

                        <th scope="col" className="w-4/16 px-6 py-3 text-start">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Booking Option
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      {selectedContractors.map(contractor => (
                        <tr key={contractor.id}>
                          <td className="w-4/16 whitespace-nowrap">
                            <div className="ps-6 py-3">
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
                          <td className="w-3/16 whitespace-nowrap">
                            <div className="px-6 py-3">
                              <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                {contractor.address}
                              </span>
                              <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                {contractor.zip}, {contractor.state}
                              </span>
                            </div>
                          </td>
                          <td className="w-5/16 whitespace-nowrap">
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
                          <td className="w-4/16 whitespace-nowrap">
                            <button
                              type="button"
                              className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Book Appointment
                            </button>
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

          {/* Footer */}
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-md py-6 border-t border-gray-200 dark:border-neutral-700">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6">
              <div className="text-sm text-gray-500 dark:text-neutral-400">
                Please ensure you are ready before booking.
              </div>
              <button
                type="button"
                onClick={onGoHome}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
