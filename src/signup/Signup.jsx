import React, { useState, useEffect } from 'react';
import "./signup.css";
import hi from "./hi.svg";
import eye from "./eyeopen.svg";
import eyeclose from "./eyeclose.svg";
import warn from '../warn';
import { useDepartmentContext } from '../DepartmentContext';
import { useNavigate } from 'react-router-dom';
import { getUserName, getUserRole } from '../auth';
import { FaCode } from 'react-icons/fa';

export default function Signup() {
  const [showSignupContent, setShowSignupContent] = useState(true);
  const [showClass, setShowClass] = useState(false)
  const [image, setImage] = useState()
  const [conPass, setConPass] = useState('')
  const [secretCode, setSecretCode] = useState('')
  const departments = useDepartmentContext();
  const secretkey = process.env.REACT_APP_SECRET_KEY

  const navigate = useNavigate()


  const switchToLogin = () => {
    setShowSignupContent(!showSignupContent);
  };
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    designation: '',
    base64: ''

  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = () => {
      const imageDataUrl = reader.result;
      console.log(imageDataUrl);

      setImage(imageDataUrl);

      setFormData({
        ...formData,
        base64: imageDataUrl, // Use the image URL directly
      });
    };

    reader.readAsDataURL(file);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const allowedDomain = '@sece.ac.in';
  
    if (!formData.email || !emailRegex.test(formData.email)) {
      warn('Enter a valid Email');
      setFormData({
        ...formData,
        email: '', // Reset only the email field
      });
      return false;
    }
  
    // Check if the email has the correct domain
    if (!formData.email.endsWith(allowedDomain)) {
      warn(`Only emails with the domain ${allowedDomain} are allowed.`);
      setFormData({
        ...formData,
        email: '', // Reset only the email field
      });
      return false;
    }
  
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (!formData.password || formData.password.length < 8) {
      warn("Password must be of alteast 8 characters")
      setFormData(initialFormData);
    }
    setPasswordError('');
    return true;
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      warn("Enter valid Phone number");
      setFormData(initialFormData);
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail()
    validatePassword()
    validatePhone()
    if ((formData.role === 'Admin' && secretCode === 'D<%0') || ((formData.role === 'Advisor' || formData.role === 'Tutor' || formData.role === 'Faculty')) && secretCode === '7@ *') {
      try {
        console.log(formData)
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Form submitted successfully!');
          setShowSignupContent();
        }
        else {
          const errorResponse = await response.json();
          console.log(errorResponse.error)// Parse the error response as JSON
          warn(`${errorResponse.error}`);
          setFormData(initialFormData)
        }
      } catch (error) {
        console.error('Error occurred during form submission:', error);
        // Handle error, show an error message, etc.
      }
    }else{
      warn('check your role or code for signup!')
      setSecretCode('')
    }
  }


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === '' || formData.password === '') {
      warn("Enter all fields 😕");
    }
    else {
      try {

        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        if (response.ok) {
          const data = await response.json();
          // Store the token in local storage
          localStorage.setItem('token', data.token)
          console.log(data.token)
          const token = data.token
          const role = getUserRole(token)
          const names = getUserName(token)

          // console.log(navigate)
          console.log(names)
          if (role === "Admin") {
            console.log("inside if")
            navigate(`/profile/${names}`)
          }
          else {
            navigate(`/profile/${names}`)
          }

        }
        else {
          warn("Invalid Login Credentials!");
        }
      }
      catch (error) {
        warn(error);
      }
    }
  }
  const checkPassword = () => {
    if (formData.password !== conPass) {
      warn('Password and confirm Password mismatch. Please try again!!');
      setConPass('')
    }
  }
  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    if (formData.role === 'Advisor') {
      setShowClass(true);
    }
    else if (formData.role === 'Tutor') {
      setShowClass(true);
    }
    else {
      setShowClass(false)
    }
  }, [formData.role]);
  // useEffect(() => {
  //   const fetchDepartmentsData = async () => {
  //     try {
  //       const departmentOptions = await fetchDepartments();
  //       setDepartments(departmentOptions);
  //     } catch (error) {
  //       console.error('Error fetching departments:', error);
  //     }
  //   };

  //   fetchDepartmentsData();
  // }, []);
  return (
    <>
      {showSignupContent ?
        <div className='form1'>
          <p className='heading'>
            <span className='hii'>
              <img src={hi} alt="Hi" />
            </span>
            <span className='text'>WELCOME TO</span>
            <span className='fit'>tablefit</span>
          </p>
          <form onSubmit={handleSubmit} className='form-content'>
            <div style={{ display: "flex", gap: '10px' }}>
              <div>
                <label htmlFor="name">Name</label><br />
                <input
                  className='input'
                  type="text"
                  id="name"
                  name="name"
                  placeholder='type your name'
                  value={formData.name}
                  onChange={handleInputChange}
                /></div>
              <div>
                <label htmlFor="email">Email</label><br />
                <input
                  className='input'
                  type="email"
                  id="email"
                  name="email"
                  placeholder='type your email'
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={validateEmail}
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "20px" }} >
              <div className='pass'>
                <div>
                  <label htmlFor="password">Password</label><br />
                  <input
                    className='input'
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder='type your password'
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={validatePassword}
                  />
                </div>
                <img src={showPassword ? eye : eyeclose} alt="eye" onClick={togglePassword} className='toggle' />
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
              <div className='conpass'>
                <div>
                  <label htmlFor="conpassword">Confirm Password</label><br />
                  <input
                    className='input'
                    type={showPassword ? 'text' : 'password'}
                    id="conpassword"
                    name="conpassword"
                    placeholder='Re-type your password'
                    value={conPass}
                    onChange={(e) => setConPass(e.target.value)}
                    onBlur={checkPassword}
                  />
                </div>
                <img src={showPassword ? eye : eyeclose} alt="eye" onClick={togglePassword} className='toggle' />
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <label htmlFor="phone">Phone Number</label><br />
                <input
                  className='input'
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder='type your phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={validatePhone}
                />
                {phoneError && <p className="error-message">{phoneError}</p>}
              </div>
              <div>
                <label htmlFor="department">Department</label><br />
                <select
                  className='input'
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">--select--</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <label htmlFor="designation">Designation</label><br />
                <select
                  className='input'
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                >
                  <option value="Head of the Department1">--select--</option>
                  <option value="Head of the Department">Head of the Department</option>
                  <option value="Professor (Institute Level Responsibility)">Professor (Institute Level Responsibility)</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor (Institute Level Responsibility)">Associate Professor (Institute Level Responsibility)</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor (Institute Level Responsibility)">Assistant Professor (Institute Level Responsibility)</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Research Faculty(CFRD Responsibilities)">Research Faculty(CFRD Responsibilities)</option>
                </select>
              </div>
              <div>
                <label htmlFor="code">Secret Code</label><br />
                <input
                  className='input'
                  type="text"
                  id="code"
                  name="code"
                  placeholder='Secret Code'
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                /></div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div>
                <label htmlFor="role">Role</label><br />
                <select
                  className='input'
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleRoleChange}
                >
                  <option value="">--select--</option>
                  <option value="Admin">Admin</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Tutor">Tutor</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
              {
                showClass && (
                  <div>
                    <label htmlFor="classname">Class Name eg. I-CSE-B</label><br />
                    <input
                      className='input'
                      type="text"
                      id="classname"
                      name="classname"
                      placeholder='year - dept - section'
                      value={formData.classname}
                      onChange={handleInputChange}
                    />
                  </div>
                )
              }
            </div>

            <br />

            <label>
              Profile Picture:
              <input type="file"
                accept='image/*'
                name="base64"
                onChange={handleFileChange} />

            </label>
            <p className='already'>
              Already have an account?
              <span className='log' onClick={switchToLogin}>
                Login
              </span>
            </p>        <button type="submit" className='signupButton'>Signup</button>
          </form>
        </div>
        :
        <div className='form' style={{ height: '400px' }}>
          <p className='heading'>
            <span className='hii'>
              <img src={hi} alt="Hi" />
            </span>
            <span className='text'>WELCOME TO</span>
            <span className='fit'>tablefit</span>
          </p>
          <form onSubmit={handleLoginSubmit} className='form-content'>

            <div>
              <br />
              <label htmlFor="email">Email</label><br />
              <input
                className='input'
                type="email"
                id="email"
                name="email"
                placeholder='type your email'
                value={formData.email}
                onChange={handleInputChange}
              // onBlur={validateEmail}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <br />

            <div className='pass'>
              <div>
                <label htmlFor="password">Password</label><br />
                <input
                  className='input'
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder='type your password'
                  value={formData.password}
                  onChange={handleInputChange}
                // onBlur={validatePassword}
                />
              </div>
              <img src={showPassword ? eye : eyeclose} alt="eye" onClick={togglePassword} className='toggle' />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <br />
            <p className='already'>Don't have an account? <span className='log' style={{ marginRight: '40px' }} onClick={setShowSignupContent}><u>signup</u></span><span>Forgot password?</span></p>
            <button type="submit" className='signupButton' onClick={handleLoginSubmit}>Login</button>
          </form>
        </div>
      }

    </>
  );
}
