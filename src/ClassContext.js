import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchClasses } from './call';

const ClassContext = createContext();

export const useClassContext = () => useContext(ClassContext);

export const ClassProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const classOptions = await fetchClasses();
        setClasses(classOptions);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClassData();
  }, []);

  return (
    <ClassContext.Provider value={classes}>
      {children}
    </ClassContext.Provider>
  );
};
