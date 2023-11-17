import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import domtoimage from 'dom-to-image';
import { useParams } from 'react-router-dom';
import './profilewa.css'

const Profilewa = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [designation, setDesignation] = useState('');
  const [phone, setPhone] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [image, setImage] = useState('');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = [...Array(7).keys()];
  const cells = [];
  const { useremail } = useParams();
  console.log("inside profilewa")
  console.log(useremail)

  function download() {
    domtoimage.toJpeg(document.getElementById('table1'), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `${name}'s Timetable.jpeg`;
        link.href = dataUrl;
        link.click();
      });
  }

  useEffect(() => {


    fetch(`http://localhost:5000/profile/${useremail}`, {
      method: 'GET',
      headers: {
        'Content-Type' :'application.json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setDesignation(data.designation);
        setPhone(data.mobile);
        setRole(data.role);
        setTimetable(data.timetable);
        setImage(data.profilePicture);
      })
      .catch(error => {
        console.error('Error fetching timetable:', error);
      });

  }, [useremail]);

  for (let day = 0; day < 6; day++) {
    for (let hour = 0; hour < 7; hour++) {
      const cellData = timetable.find(cell => cell.day === days[day] && cell.hour === (hour + 1).toString());
      cells.push(
        <td
          key={`${day}-${hour}`}
        >
          {cellData ? cellData.classname : ''}
        </td>
      );
    }
  }

  return (
    <div className='scroll-container'>
      <Navbar />
      <div className='wrapper-profile'>
        <div className='profile-pic'>
          <img src={image} alt="Profile" />
        </div>
        <div className='data-wrap'>
          <div className='data-inner'>
            <div className='field'>
              <p className='field-content'><b>Name : </b><span>{name}</span></p>
            </div>
            <div className='field'>
              <p className='field-content'><b>Email : </b><span className='span'>{email}</span></p>
            </div>
            <div className='field'>
              <p className='field-content'><b>Phone Number :</b> <span className='span'>{phone}</span></p>
            </div>
            <div className='field'>
              <p className='field-content'><b>Role :</b><span className='span'>{role}</span></p>
            </div>
            <div className='field'>
              <p className='field-content'><b>Designation :</b><span className='span'>{designation}</span></p>
            </div>
          </div>
          <button className='password'>Update Password</button>
        </div>
      </div>
      <div className='table' id='table'>
        <div className='divv'>
          {/* <div className='table-span'>{classSelected}</div> */}
        </div>
        <table id='table1'>
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
          <div onClick={download} className='v1' style={{ width: 'fitContent' }}>
            View More
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilewa;
