import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import TimetableComponent from './TimetableComponent'; // Import the nested component
import "./view.css"

const View = () => {
  const [year, setYear] = useState('');
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  const fetchTimetables = async () => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTimetables(data.timetables);
      console.log(data.timetables);
    } catch (error) {
      console.error('Error fetching timetables:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='scroll-container'>
      <Navbar />
      <div>
        <select
          className='inputcls'
          id="year"
          name="year"
          value={year}
          onChange={handleInputChange}
        >
          <option value="">--select--</option>
          <option value="I">I</option>
          <option value="II">II</option>
          <option value="III">III</option>
          <option value="IV">IV</option>
        </select>

        <button onClick={fetchTimetables}>Fetch Timetables</button>

        {loading && <p>Loading...</p>}

        {/* Replace the current timetables.map section with the TimetableComponent */}
        <TimetableComponent timetables={timetables} />
      </div>
    </div>
  );
};

export default View;
