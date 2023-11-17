import React, { useState, useEffect } from 'react';
import './table.css';
import warn from './warn';

const Table = () => {
  const [classSelected, setClassSelected] = useState('');
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [timetable, setTimetable] = useState([]);

  // useEffect(() => {
  //   // Fetch class names from the backend
  //   fetch('http://localhost:5000/classnames')
  //     .then(response => response.json())
  //     .then(data => {
  //       setClasses(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching class names:', error);
  //     });
  // }, []);

  useEffect(() => {
    if (classSelected) {
      // Fetch class details including subjects, faculties, and timetable
      fetch('http://localhost:5000/classdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ className: classSelected }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSubjects(data.subjects);
          setFaculties(data.faculties);
          setTimetable(data.timetable);
        })
        .catch(error => {
          console.error('Error fetching class details:', error);
        });
    }
  }, [classSelected]);
  useEffect(() => {
    console.log(subjects, faculties);
  }, [subjects, faculties]);


  const handleClassChange = event => {
    setClassSelected(event.target.value);
  };

  const handleCellChange = (day, hour, e) => {
    console.log(day, hour);
    if (e.key === 'Enter') {
      const cellContent = e.target.innerText; // Get the typed content in the cell
      console.log("Calling assign");
  
      fetch('http://localhost:5000/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          className: classSelected,
          day,
          hour,
          cellContent, // Include the typed content in the request body
        }),
      })
        .then(response => {
          if (response.ok) {
            console.log("Subject assigned successfully");
          } else {
            throw new Error('Failed to assign subject');
          }
        })
        .catch(error => {
          console.error('E assigning subject:', error);
          warn("Faculty has already assigned!!")
        });
    }
  };
  

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [...Array(7).keys()]; // Generates an array from 0 to 6

  // Generate table cells and fill them with timetable data
  const cells = [];
  for (let day = 0; day < 6; day++) {
    for (let hour = 0; hour < 7; hour++) {
      const cellData = timetable.find(cell => cell.day === days[day] && cell.hour === (hour + 1).toString());
      cells.push(
        <td
          key={`${day}-${hour}`}
          contentEditable={true}
          // onBlur={(e) => handleCellChange(days[day], hour + 1, e)}
          onKeyDown={(e) => handleKeyPress(e,days[day],hour+1)}
        >
          {cellData ? cellData.subject : ''}
        </td>
      );
    }
  }

  const handleKeyPress = (e,day,hour) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur(); 
      handleCellChange(day,hour,e)// Unfocus the cell after Enter is pressed
    }
  };

  return (
    <div>
      <h1>Class Timetable</h1>
      <label htmlFor="class">Select Class:</label>
      <select id="class" value={classSelected} onChange={handleClassChange}>
        <option value="">Select a class</option>
        {classes.map((className, index) => (
          <option key={index} value={className}>
            {className}
          </option>
        ))}
      </select>
      <div>
        <h2>Subjects:</h2>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>{subject}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Faculties:</h2>
        <ul>
          {faculties.map((faculty, index) => (
            <li key={index}>{faculty}</li>
          ))}
        </ul>
      </div>

      <h3>Timetable:</h3>
      <table>
        <thead>
          <tr>
            <th>Day/Period</th>
            {hours.map(hour => {
              if(hour === 3 || hour === 6)
              {
                return <th key={hour} style={{columnSpan : 6}}>Hour {hour + 1}</th>
              }
              else{
              return <th key={hour}>Hour {hour + 1}</th>
              }
            })}
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index}>
              <th>{day}</th>
              {cells.slice(index * 7, (index + 1) * 7)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
