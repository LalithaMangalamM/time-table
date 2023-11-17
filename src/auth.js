import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export const getUserRole = () => {
  const token = localStorage.getItem('token');
  
  // Decode the token and extract the role
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
  } catch (error) {
    // Handle decoding error, e.g., token is invalid
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserName = () => {
  const token = localStorage.getItem('token');
  
  // Decode the token and extract the role
  try {
    const decodedToken = jwtDecode(token);
    console.log('inside decoded')
    console.log(`decode ${decodedToken.name}`)
    return decodedToken.name;
  } catch (error) {
    // Handle decoding error, e.g., token is invalid
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const { exp } = jwtDecode(token);

  if (exp * 1000 > Date.now()) {
    const userProfile = getUserProfile(token)
    return userProfile;
  }

  return null;
};
export const getUserProfile = (token) => {
  const name = getUserName(token);

  return fetch(`http://localhost:5000/profiles/${name}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching user profile:', error);
      return null;
    });
};