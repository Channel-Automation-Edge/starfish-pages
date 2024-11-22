import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { AppContext } from '../../context/AppContext';

// A simple area code selector component
const AreaCodeSelector = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const areaCodes = ["+1", "+44", "+91", "+61"]; // Example area codes
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="py-3 px-4 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600">
      {areaCodes.map((code) => (
        <option key={code} value={code}>
          {code}
        </option>
      ))}
    </select>
  );
};

interface Step2Props {
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    return null;
  }

  const { zip, state, email, phone, firstname, lastname, setZip, setEmail, setPhone, setFirstname, setLastname, setState, selectedServices } = appContext;

  useEffect(() => {
    console.log("Selected services:", selectedServices);
    const params = new URLSearchParams(window.location.search);
    formik.setValues({
      firstname: params.get('firstname') || firstname || '',
      lastname: params.get('lastname') || lastname || '',
      zip: params.get('zip') || zip || '',
      state: params.get('state') || state || '',
      email: params.get('email') || email || '',
      phone: params.get('phone') || phone || '',
      areaCode: '+1',
    });
  }, [firstname, lastname, zip, state, email, phone]);

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    zip: Yup.string().required('Zip code is required'),
    state: Yup.string().required('State is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });

  const formik = useFormik({
    initialValues: {
      zip: '',
      state: '',
      email: '',
      phone: '',
      firstname: '',
      lastname: '',
      areaCode: '+1', // Default area code
    },
    validationSchema, // Use Yup validation schema
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      setZip(values.zip);
      setState(values.state);
      setEmail(values.email);
      setPhone(values.phone);
      setFirstname(values.firstname);
      setLastname(values.lastname);
      // Move to the next step
      onNext();
    },
  });

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-xl mx-auto">
        <div className="text-center">
          <h1  className="block text-3xl font-bold text-primary dark:text-white">
            Fill up your information
          </h1>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">
            Please provide accurate details.
          </p>
        </div>
        <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <div className="mt-2">
          <form onSubmit={formik.handleSubmit} className="grid gap-4 lg:gap-6">
            <div>
              <label htmlFor="firstname" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">First Name</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                onBlur={formik.handleBlur}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div className="error text-sm text-red-400">{formik.errors.firstname}</div>
              )}
            </div>

            <div>
              <label htmlFor="lastname" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Last Name</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                onBlur={formik.handleBlur}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="error text-sm text-red-400">{formik.errors.lastname}</div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label htmlFor="zip" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">ZIP Code</label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.zip}
                  onBlur={formik.handleBlur}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
                />
                {formik.touched.zip && formik.errors.zip && (
                  <div className="error text-sm text-red-400">{formik.errors.zip}</div>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.state}
                  onBlur={formik.handleBlur}
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="error text-sm text-red-400">{formik.errors.state}</div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error text-sm text-red-400">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Phone</label>
              <div className="flex">
                <AreaCodeSelector
                  value={formik.values.areaCode}
                  onChange={(value) => formik.setFieldValue('areaCode', value)}
                />
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  className="py-3 px-4 block w-full ml-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <div className="error text-sm text-red-400">{formik.errors.phone}</div>
              )}
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Find Local Experts
              </button>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                
              </p>
            </div>
          </form>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Step2;
