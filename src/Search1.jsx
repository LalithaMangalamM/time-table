import React, { useEffect, useState } from 'react';
import { useClassContext } from './ClassContext';
import "./search1.css"
import * as XLSX from 'xlsx';
import Navbar from './navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Search1 = () => {
  const navigate = useNavigate();
  const classes = useClassContext();

  const initialFormData = {
    Faculty: '',
    SubjectCode: '',
    SubjectName: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [searchResults, setSearchResults] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [value, setValue] = useState('');
  const [fac, setFaculty] = useState('');
  const [subjectAbbreviation, setSubjectAbbreviation] = useState('');
  const [results, setResults] = useState([]);
  const [classSelected, setClassSelected] = useState('');

  useEffect(() => {
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

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/faculty');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const names = data.map((result) => result.name);
        console.log(`names ${names}`);
        setResults(names);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log(results);
    };
    fetchData();
  }, []);

  const handleClassChange = (event) => {
    const { name, value } = event.target;
    setClassSelected(value);
    setFormData({ ...formData, [name]: value });
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setValue(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here
    console.log('Form submitted:', formData);
    // Add additional logic if needed
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setFormData({ ...formData, SubjectName: searchTerm });

    // Find the corresponding SubjectAbbreviation for the selected SubjectName
    const selectedSubject = subjectData.find(
      (item) => item.SubjectName.toLowerCase() === searchTerm.toLowerCase()
    );
    if (selectedSubject) {
      setSubjectAbbreviation(selectedSubject.SubjectAbbreviation);
    }
  };
  // const onSearch = (searchTerm) => {
  //   setValue(searchTerm);
  //   setFormData({ ...formData, SubjectName: searchTerm });

  //   // Find the corresponding SubjectAbbreviation and SubjectCode for the selected SubjectName
  //   const selectedSubject = subjectData.find(
  //     (item) => item.SubjectName.toLowerCase() === searchTerm.toLowerCase()
  //   );

  //   if (selectedSubject) {
  //     setSubjectAbbreviation(selectedSubject.SubjectAbbreviation);
  //     setFormData({
  //       ...formData,
  //       SubjectCode: selectedSubject.SubjectCode, // Set SubjectCode from the selected result
  //     });
  //   }
  // };

  const onFacSearch = (searchTerm) => {
    setFaculty(searchTerm);
    setFormData({ ...formData, Faculty: searchTerm });
  };

  const onFacChange = (event) => {
    const { name, value } = event.target;
    setFaculty(value);
    setFormData({ ...formData, [name]: value });
    const filteredResults = yourSearchFunction(value);
    setSearchResults(filteredResults);
  };

  const yourSearchFunction = (query) => {
    return subjectData.filter(
      (subject) => subject.SubjectName.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div className='search1'>
      <Navbar />
      <div className='searc'>
      <form className='f'>
        <div className='search-container1'>
          <div className='search-inner1'>
            <input
            className='in'
              type='text'
              value={formData.Faculty}
              onChange={onFacChange}
              name='Faculty'
              placeholder='Faculty Name..'
            />
          </div>
          <div className='dropdown1'>
            {results
              .filter((item) => {
                const search = fac.toLowerCase();
                const facu = item.toLowerCase();
                return search && facu.includes(search) && facu !== search;
              })
              .map((item) => (
                <div key={item} onClick={() => onFacSearch(item)} className='dropdown-row'>
                  {item}
                </div>
              ))}
          </div>
        </div>
        <div className='search-container'>
          <div className='search-inner'>
            <input className='in' type='text' value={formData.SubjectName} onChange={onChange} placeholder='Subject Name..' name='SubjectName' />
          </div>
          <div className='dropdown'>
            {subjectData
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const SubjectName = item.SubjectName.toLowerCase();
                return searchTerm && SubjectName.includes(searchTerm) && SubjectName !== searchTerm;
              })
              .map((item) => (
                <div onClick={() => onSearch(item.SubjectName)} className='dropdown-row' key={item.SubjectName}>
                  {item.SubjectName}
                </div>
              ))}
          </div>
        </div>
        <div>
            <input className='in' type='text' placeholder='Abbreviation' value={subjectAbbreviation} readOnly name='abbreviation' />
          </div>
        <select className='sub-input' id='cls' name='cls' value={classSelected} onChange={handleClassChange}>
          <option value=''>Select a class</option>
          {classes.map((cls, index) => (
            <option key={index} value={formData.cls}>
              {classSelected}
            </option>
          ))}
        </select>
        <button className='but' type='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>

      </div>
      <button className='butt' type='submit' onClick={() => navigate("/createtable")}>
          Fit Table
        </button>
    </div>
  );
};

export default Search1;
