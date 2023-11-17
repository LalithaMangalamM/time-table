 export const fetchDepartments = async () => {
    try {
        // Assuming departments.txt is in the public folder
        const response = await fetch('department.txt');
    
        if (!response.ok) {
          throw new Error(`Failed to fetch departments. Status: ${response.status}`);
        }
    
        const data = await response.text();
        const departmentOptions = data.split('\n').filter((dept) => dept.trim() !== '');
    
        console.log('Inside fetch call:', departmentOptions);
        return departmentOptions;
      } catch (error) {
        console.error('Error fetching departments:', error);
        return [];
      }
  };
  export const fetchClasses = async () => {
    try {
        // Assuming departments.txt is in the public folder
        const response = await fetch('classes.txt');
    
        if (!response.ok) {
          throw new Error(`Failed to fetch classes. Status: ${response.status}`);
        }
    
        const data = await response.text();
        const classOptions = data.split('\n').filter((classs) => classs.trim() !== '');
    
        console.log('Inside fetch call:', classOptions);
        return classOptions;
      } catch (error) {
        console.error('Error fetching departments:', error);
        return [];
      }
  };

