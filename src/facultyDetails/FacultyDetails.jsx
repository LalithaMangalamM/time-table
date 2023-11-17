// FacultyDetails.js
import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import DescriptionCircle from '../DescriptionCircle';
import des from '../des.svg';
import SearchBar from '../searchbar/SearchBar';
import SearchResultsList from '../searchResults/SearchResultsList';
import './facultyDetails.css';

export default function FacultyDetails() {
  const [results, setResults] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
 const [facSearc,setFacSearch] = useState()
  return (
    <div className="facultyDetails">
      <Navbar className = "navv"/>
      <img className='des-circle' src={des} alt="Description" />
      <div className="search-bar-container">
        <div className="search-filter">
          <SearchBar setResults={setResults} setSelectedDepartment={setSelectedDepartment} setFacSearch={setFacSearch} />
          <SearchResultsList results={results} />
        </div>
      </div>
    </div>
  );
}
