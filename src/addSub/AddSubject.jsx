import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import add from '../add.svg';
import { useClassContext } from '../ClassContext';
import SearchBar from '../searchbar/SearchBar';
import SearchResultsList from '../searchResults/SearchResultsList';
import * as XLSX from 'xlsx';
import "./addSubject.css"

export default function AddSubject() {
  const classes = useClassContext();

  const initialFormData = {
    FacultyName: '',
    SubjectCode: '',
    SubjectName: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [classSelected, setClassSelected] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [resultVisible, setResultVisible] = useState(false);
  const [fac, setFacSearch] = useState(false)
  const [subjectData, setSubjectData] = useState([]);
  const [results, setResults] = useState([]);


  useEffect(() => {
    // Fetch subject data from Excel file
    fetchSubjectData();
  }, []);

  const fetchSubjectData = () => {
    // Replace 'your-file.xlsx' with the actual path to your Excel file
    const excelFilePath = 'subjects.xlsx';

    fetch(excelFilePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const data = new Uint8Array(buffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setSubjectData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching subject data:', error);
      });
  };

  const handleClassChange = (event) => {
    const { name, value } = event.target;
    setClassSelected(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Implement your search logic here
    const filteredResults = yourSearchFunction(value);
    setSearchResults(filteredResults);
  };


  const handleSearchResultClick = (selectedResult) => {
    console.log('Clicked on search result:', selectedResult);
    setFormData({
      ...formData,
      SubjectName: selectedResult.SubjectName || '',
      SubjectAbbreviation: selectedResult.SubjectAbbreviation || '',
    });
    setSearchResults([]);
    setResultVisible(false); // Clear search results
  };

  const yourSearchFunction = (query) => {
    return subjectData.filter(
      (subject) => subject.SubjectName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSubmit = () => {
    // Implement your form submission logic here
    console.log('Form submitted:', formData);
  };
  const handleBlur = async (result) => {
    // Delay hiding the results to allow time for click events to register
    await handleSearchResultClick(result)
    setResultVisible(false)
  }
  const handleblur = () => {
    setResultVisible(false)
  }

  return (
    <div>
      <Navbar />
      <img src={add} className='add' alt='add' />
      <div className='searches'>
        <div className='sub-form'>
          <form className='sub-fac' onSubmit={handleSubmit}>
            <SearchBar setResults={setResults} normalSearch={true} setFacSearch={setFacSearch} />

            <input style={{ width: "500px" }}
              className='sub-input'
              type='text'
              id='sub-name'
              name='SubjectName'
              placeholder='Subject Name'
              onFocus={() => setResultVisible(true)}  // Show results when the input is focused
              onBlur={() => handleBlur}
              value={formData.SubjectName}
              onChange={handleInputChange}
            /><br />
            <input style={{ width: "300px" }}
              className='sub-input'
              type='text'
              id='sub-code'
              name='SubjectAbbreviation'
              placeholder='Subject Abbreviation'
              onFocus={() => setResultVisible(!resultVisible)}  // Show results when the input is focused
              onBlur={() => handleBlur}
              value={formData.SubjectAbbreviation}
              onChange={handleInputChange}
            /><br />
            <select
              className='sub-input'
              id='cls'
              name='cls'
              value={classSelected}
              onChange={handleClassChange}
            >
              <option value=''>Select a class</option>
              {classes.map((cls, index) => (
                <option key={index} value={formData.cls}>
                  {cls}
                </option>
              ))}
            </select>
            <button type='submit' className='sub-submit' onClick={handleSubmit}>Submit</button>
          </form>
          </div>
          <div className='results'>
          <div className='re'>
              <SearchResultsList results={results} normalSearch={true} /><br />
            </div>
            <div>
              {resultVisible && searchResults.length > 0 && (
                <ul className='sub-results'>
                 <div className='sub-results-inner'> 
                 {searchResults.map((result) => (
                    <li className='sub-list' key={result.SubjectName} onClick={() => { handleBlur(result) }}>
                      {result.SubjectName}
                    </li>
                  ))}
                 </div>
                </ul>
              )}
            </div>

          </div>

      </div>


    </div>
  );
}
