// SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchBar.css';

export default function SearchBar({ setResults, setSelectedDepartment, normalSearch, setFacSearch = () => {} }) {
    const [input, setInput] = useState('');
    const [department, setDepartment] = useState('');

    const fetchData = (value) => {
        fetch('http://localhost:5000/faculty')
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.name &&
                        user.name.toLowerCase().includes(value) &&
                        (!department || user.department === department)
                    );
                });
                setResults(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
        setFacSearch(true);
    };

    const handleDepartmentChange = (value) => {
        setDepartment(value);
        setSelectedDepartment(value);
        fetchData(input);
    };

    return (
        <div>
            {!normalSearch ? (
                <div className="input-wrapper">
                    <FaSearch id="search-icon" />
                    <input
                        className="search-input"
                        placeholder="Type to search..."
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <select
                        className="department-select"
                        value={department}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="AI&DS">AI&DS</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="CCE">CCE</option>
                        <option value="CSBS">CSBS</option>
                        <option value="AIML">AIML</option>
                        <option value="Mech">Mechanical</option>
                    </select>
                </div>
            ) : (
                <div style={{ width: '300px', height: '40px', fontSize: '24px', border: '2px solid #333' }}>
                    <input
                        className="search-input"
                        placeholder="Faculty Name Search..."
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}
