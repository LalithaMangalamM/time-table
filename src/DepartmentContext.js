// DepartmentContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDepartments } from './call';

const DepartmentContext = createContext();

export const useDepartmentContext = () => useContext(DepartmentContext);

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const departmentOptions = await fetchDepartments();
        setDepartments(departmentOptions);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartmentsData();
  }, []);

  return (
    <DepartmentContext.Provider value={departments}>
      {children}
    </DepartmentContext.Provider>
  );
};
