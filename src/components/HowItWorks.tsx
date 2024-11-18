import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-12">
        {/* Icon Block */}
        <div className="flex items-center">
          <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-secondary before:from-secondary before:via-transparent before:to-secondary before:rounded-xl dark:bg-neutral-900">
            <svg
              className="shrink-0 size-6 text-secondary dark:text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="10" height="14" x="3" y="8" rx="2" />
              <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
              <path d="M8 18h.01" />
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">1: Tell Us What You Need</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Let us know what your home needs. We’re here to help with projects big and small.
            </p>
          </div>
        </div>
        {/* End Icon Block */}

        {/* Icon Block */}
        <div className="flex items-center">
          <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-secondary before:from-secondary before:via-transparent before:to-visecondary before:rounded-xl dark:bg-neutral-900">
            <svg
              className="shrink-0 size-6 text-secondary dark:text-blusecondary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 7h-9" />
              <path d="M14 17H5" />
              <circle cx="17" cy="17" r="3" />
              <circle cx="7" cy="7" r="3" />
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">2: View Local Contractors</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            You’ll see a list of experts who can make your vision a reality.
            </p>
          </div>
        </div>
        {/* End Icon Block */}

        {/* Icon Block */}
        <div className="flex items-center">
          <div className="relative flex justify-center items-center size-12 bg-white rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-secondary before:from-secondary before:via-transparent before:to-secondary before:rounded-xl dark:bg-neutral-900">
            <svg
              className="shrink-0 size-6 text-secondary dark:text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div className="ml-5">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">3: Get Contacted for a Free Estimate</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">
            The experts you select will reach out to set up an estimate 
            </p>
          </div>
        </div>
        {/* End Icon Block */}
      </div>
    </div>
  );
};

export default HowItWorks;
