import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [loadingValue, setLoadingValue] = useState(false);

  return (
    <MyContext.Provider value={{ loadingValue, setLoadingValue }}>
      {children}
    </MyContext.Provider>
  );
};
