import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { AppContext } from '../../context/AppContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { set } from 'react-hook-form';

// A simple area code selector component
const AreaCodeSelector = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const areaCodes = ["+1", "+44", "+91", "+61"]; // Example area codes
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"> 
  <div className="mx-auto max-w-lg">
    <h1 className="text-center text-2xl font-bold text-primary
     sm:text-3xl"></h1>


<form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
      <p className="text-center text-lg font-medium">Fill up your information</p>


      <div>
        <label htmlFor="firstname" className="sr-only">First Name</label>

        <div className="relative">
          <input
            className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
            placeholder="First Name"

            id="firstname"
          name="firstname"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstname}
          onBlur={formik.handleBlur}
          />
          {formik.touched.firstname && formik.errors.firstname && (
          <div className="error text-center text-sm text-red-400">{formik.errors.firstname}</div>
        )}
        </div>
      </div>


      <div>
        <label htmlFor="lastname" className="sr-only">Last Name</label>

        <div className="relative">
          <input
            className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
            placeholder="Last Name"

            id="lastname"
          name="lastname"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastname}
          onBlur={formik.handleBlur}
          />
          {formik.touched.lastname && formik.errors.lastname && (
          <div className="error text-center text-sm text-red-400">{formik.errors.lastname}</div>
        )}
        </div>
      </div>


      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error text-center text-sm text-red-400">{formik.errors.email}</div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="zip" className="sr-only">Zip Code</label>

        <div className="relative">
          <input
            className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
            placeholder="ZIP Code"

            id="zip"
            name="zip"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.zip}
            onBlur={formik.handleBlur}
          />
          {formik.touched.zip && formik.errors.zip && (
          <div className="error text-center text-sm text-red-400">{formik.errors.zip}</div>
        )}
        </div>
        
        
      </div>

      <div>
        <label htmlFor="state " className="sr-only" >State</label>
        <div className="relative">
          
          <input className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm"
            placeholder="State"
            id="state"
            name="state"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.state}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.state && formik.errors.state && (
          <div className="error text-center text-sm text-red-400">{formik.errors.state}</div>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="sr-only">Phone</label>

        <div className="relative">
        <AreaCodeSelector
            value={formik.values.areaCode}
            onChange={(value) => formik.setFieldValue('areaCode', value)}
          />
          <input className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm ml-2"
            placeholder="Phone"
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="error text-center text-sm text-red-400">{formik.errors.phone}</div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
      >
        Continue
      </button>

    </form>
  </div>
</div>
  );
};

export default Step2;
