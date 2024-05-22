import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";

import './backButton.css';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <TiArrowBackOutline 
      onClick={handleBack}
      className='btn-back'
    />
  );
};

export default BackButton;