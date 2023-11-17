import React from 'react'
import "./search.css"
import { useNavigate } from 'react-router-dom';
import warn from '../warn';
import { getUserName, getUserRole } from '../auth';
export default function Search({ result, normalSearch }) {
  const navigate = useNavigate()

  const viewProfile = (names, useremail) => {
    const token = localStorage.getItem('token');
    console.log(`token ${token}`)
    const usname = getUserName(token)
    const role = getUserRole(token)
    if(role === 'Admin' || usname === `${names}`)
    {

    fetch(`http://localhost:5000/profiles/${names}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },

    }).then((response) => {
      console.log(response)
      if (response.ok) {
        navigate(`/profiles/${useremail}`);
      } 
    })
  }
  else {
    warn(`Access to view ${names}'s profile is prohibited`)
    // Handle the error if needed
  }
  }

  return (
    <div>
      {!normalSearch ?
        <div className='res' style={{ display: 'flex',gap: '50px', alignItems: 'center', padding: '23px'}}>
          <img src={result.profilePicture} alt="Profile" style={{ width: '80px', height: '80px' }} />
          <div style={{width:'550px'}}>
            <p style={{ margin: '0', padding: '0', fontSize: '24px' }}><b>{result.name}</b></p>
            <p style={{ margin: '0', padding: '0', fontSize: '24px' }}>Contact : {result.mobile}</p>
          </div>
          <button onClick={() => viewProfile(result.name, result.email)} style={{justifyContent: 'flex-end'}} >View Profile..</button>
        </div>
        :
        <div className='res1' style={{ fontSize: "24px" }} >{result.name}</div>
      }
    </div>

  )
} 
