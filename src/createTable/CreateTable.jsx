import React, { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import create from "../createTable.svg"
import "./createTable.css"
import warn from '../warn'
import { useClassContext } from '../ClassContext';

export default function CreateTable() {
  const classe = useClassContext();
  const [classSelected, setClassSelected] = useState('');
  const [subjects, setSubjects] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [classes, setClasses] = useState([]);
  const [view, setView] = useState(false)
  const[backspace,setBackspace] = useState(false)
  useEffect(() => {
    // Fetch class names from the backend
    fetch('http://localhost:5000/classnames')
      .then(response => response.json())
      .then(data => {
        setClasses(data);
      })
      .catch(error => {
        console.error('Error fetching class names:', error);
      });
    const fetchData = async () => {
      try {
        if (classSelected) {
          console.log(`Selected class: ${classSelected}`);
          // Fetch class details including subjects, faculties, and timetable
          const response = await fetch('http://localhost:5000/classdetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ className: classSelected }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Fetched class details:', data);
          console.log(data.subjects)

          // Assuming setSubjects and setTimetable are state setters
          setSubjects(data.subjects);
          setTimetable(data.timetable);
          setView(true)
        }
      } catch (error) {
        console.error('Error fetching class details:', error.message);
      }
    };

    fetchData(); // Call the async function
    console.log(`subjects ${subjects}`)

  }, [classSelected]);

  // useEffect(() => {
  //   console.log(subjects, faculties);
  // }, [subjects, faculties]);

  const handleClassChange = event => {
    setClassSelected(event.target.value);
    console.log(subjects)
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
          cellContent, 
          backSpace:backspace// Include the typed content in the request body
        }),
      })
        .then(response => {
          if (response.ok) {
            console.log("Subject assigned successfully");
            setBackspace(false)
          } else {
            throw new Error('Failed to assign subject');
            setBackspace(false)

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
          onKeyDown={(e) => handleKeyPress(e, days[day], hour + 1)}
        >
          {cellData ? cellData.subject : ''}
        </td>
      );
    }
  }
  //key press
  const handleKeyPress = (e, day, hour) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
      handleCellChange(day, hour, e)// Unfocus the cell after Enter is pressed
    }
    if(e.key === 'Backspace')
    {
      setBackspace(true)
    }
  };
  return (
    <div className='scroll-container'>
      <Navbar />
      <div className='ct-div'>
        <img className='create-tt' src={create} alt='create' />
        <div>
          <select id="class" value={classSelected} onChange={handleClassChange}>
            <option value="">Select a class</option>
            {classes.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
      </div>
      {view &&
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className='wrap'>
            <div className='dis'>
              {Object.entries(subjects).map(([abbreviation, facultyName]) => (
                <div key={abbreviation} className='ele'>
                  <span>{facultyName} - {abbreviation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      }

      <div className='table'>
        <div className='divv'>
          <div className='table-span'>{classSelected}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Day/Period</th>
              {hours.map(hour => (
                <th key={hour}>Hour {hour + 1}</th>
              ))}
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
        <div className='view'>
          <div className='v1' style={{ width: 'fitContent', }}>
            View More
          </div>
        </div>
      </div>
    </div>


  )
}
