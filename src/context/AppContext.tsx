import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the Contractor interface
interface Contractor {
  id: number;
  name: string;
  address: string;
  zip: string;
  state: string;
  services: number[];
  matchingServices: number[];
}

// Define the shape of your context data
interface AppContextType {
  firstname: string | null;
  lastname: string | null;
  zip: string | null;
  email: string | null;
  phone: string | null;
  state: string | null;
  initialService: number;
  selectedServices: number[];
  matchingContractors: Contractor[];
  selectedContractors: Contractor[];
  setFirstname: Dispatch<SetStateAction<string | null>>;
  setLastname: Dispatch<SetStateAction<string | null>>;
  setZip: Dispatch<SetStateAction<string | null>>;
  setEmail: Dispatch<SetStateAction<string | null>>;
  setPhone: Dispatch<SetStateAction<string | null>>;
  setState: Dispatch<SetStateAction<string | null>>;
  setInitialService: Dispatch<SetStateAction<number>>;
  setSelectedServices: Dispatch<SetStateAction<number[]>>;
  setMatchingContractors: Dispatch<SetStateAction<Contractor[]>>;
  setSelectedContractors: Dispatch<SetStateAction<Contractor[]>>;
}

// Create a context with an empty object as default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (str: string | null): string | null => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
};

// Create the provider component
const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [firstname, setFirstname] = useState<string | null>(null);
  const [lastname, setLastname] = useState<string | null>(null);
  const [zip, setZip] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [initialService, setInitialService] = useState<number>(0);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [matchingContractors, setMatchingContractors] = useState<Contractor[]>([]);
  const [selectedContractors, setSelectedContractors] = useState<Contractor[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFirstname(capitalizeFirstLetter(params.get('firstname')));
    setLastname(capitalizeFirstLetter(params.get('lastname')));
    setZip(params.get('zip') || null);
    setEmail(params.get('email') || null);
    setPhone(params.get('phone') || null);
    setState(params.get('state') || null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        firstname,
        lastname,
        zip,
        email,
        phone,
        state,
        initialService,
        selectedServices,
        matchingContractors,
        selectedContractors,
        setFirstname,
        setLastname,
        setZip,
        setEmail,
        setPhone,
        setState,
        setInitialService,
        setSelectedServices,
        setMatchingContractors,
        setSelectedContractors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
