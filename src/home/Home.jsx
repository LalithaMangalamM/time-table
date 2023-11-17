// Home.js
import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Line from '../Line 1.svg';
import Line2 from '../Line 2.svg';
import Signup from '../signup/Signup';
import fac from "../fac.svg"
import how from "../how.svg"
import video from "../video.svg"
import developer from "../developer.svg"
import Modal from 'react-modal';

import './home.css'; // Import your home styles
import Carousel from './Carousel';

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setShowLogin(false);
  };

  const toggleLogin = () => {
    setShowPopup(!showPopup);
    setShowLogin(true);
  };

  return (
    <div className='scroll-container'>
      <Navbar />
      <Modal
        isOpen={showPopup}
        onRequestClose={togglePopup}
        contentLabel={showLogin ? 'Login Modal' : 'Signup Modal'}
        className='popup'
        overlayClassName='overlay'
      >
        <Signup />
      </Modal>

      <div className='line1'>
        <img src={Line} alt='line1' />
      </div>
      <div className='hero'>
        <p className='l1'>Your hassle-free solution for creating</p>
        <p className='l2'>
          ORGANIZED <span className='sche'>SCHEDULES</span>
        </p>
        <button className='getstart' onClick={togglePopup}>
          Get Started
        </button>
      </div>
      <div className='line2'>
        <img src={Line2} alt='Line2' />
      </div>
      <div className='meet'>
        <p style={{ margin: "0", padding: "0" }}> LET'S MEET OUR FACULTY</p>
      </div>
      <div className='fac-des' style={{marginTop:"-40px"}}>
        <img src={fac} alt='fac' />
      </div>
      <div style={{marginTop: "-250px"}}>
        <Carousel />
      </div>
      <br/>
      <div className='meet' style={{marginLeft: "600px"}}>
        <p style={{ margin: "0", padding: "0" }}> HOW IT WORKS?  </p>
      </div>
      <div className='fac-des' style={{marginLeft:"50px"}}>
        <img src={how} alt='fac' />
      </div>
      <div className='vid'>
        <img src={video} />
      </div>
      <div className='meet'>
        <p style={{ margin: "0", padding: "0" }}> DEVELOPER SECTION </p>
      </div>
      <div className='fac-des'>
        <img src={developer} alt='fac' />
      </div>
      <div className='developer-section'>
        <div className='d'>
        <div className='profile'></div>
        <p className='dev-name'>SANJAY V</p>
        <p className='dev-role'>UI/UX DESIGNER</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  </p>

        </div>
        <div className='d'>
        <div className='profile'></div>
        <p className='dev-name'>LALITHA MANGALAM M</p>
        <p className='dev-role'>FULL STACK DEVELOPER</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>

        </div>
      </div>
    </div>
  );
}
