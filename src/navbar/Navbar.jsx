import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './navbar.css';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('')
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');

  const handleLinkClick = (link) => {
    setModalOpen(true);
    setSelectedLink(link);
  };

  const handleCodeSubmit = () => {
    // Check the entered code against the correct code for the selected link
    const isCodeValid = checkCodeValidity(code);

    if (isCodeValid) {
      // Close the modal and navigate to the selected link
      setModalOpen(false);
      navigate(selectedLink);
    } else {
      // Display an alert or handle incorrect code
      alert('Incorrect code. Please try again.');
    }
  };

  const handleModalClose = () => {
    // Close the modal without navigating
    setModalOpen(false);
  };

  // Function to check the validity of the entered code
  const checkCodeValidity = (code) => {
    console.log(code)
    // Replace this with your actual code validation logic
    // For now, let's assume the correct code for each link is the link itself
    return code === 'D<%0' || code === '7@ *';
  };

  return (
    <nav className="navbar sticky" id="navbar">
      <div className="logo">
        <Logo />
      </div>
      <div className="nav-elements topBotomBordersOut">
        <ul >
          <li className='li'>
            <NavLink
              to="/"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Home
            </NavLink>
          </li>
          <li onClick={() => handleLinkClick('/viewtables')}>
            <div className="nav-link">Time Table (class)</div>
          </li>
          <li onClick={() => handleLinkClick('/faculty-details')}>
            <div className="nav-link">Faculty Details</div>
          </li>
          <li>
            <NavLink
              to="/about"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
        <button className="signup">
          <NavLink
            to="/contact"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            SIGNUP
          </NavLink>
        </button>
      </div>

      {/* Render the code entry modal conditionally */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Code Entry Modal"
        className='popup1'
        overlayClassName='overlay1'
      >
        <div className="code-entry-modal" >
          <h3>Enter Your Code</h3>
          <input
          className='codein'
            type="text"
            placeholder="Enter code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button className = 'codebu' onClick={handleCodeSubmit}>Enter</button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;
