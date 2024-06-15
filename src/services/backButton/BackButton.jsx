import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TiArrowBackOutline } from "react-icons/ti";

import './backButton.css';

// Componente funcional para el botón de retroceso
function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Si la ubicación actual es la raíz '/', no mostrar el botón de retroceso
  if (location.pathname === '/') {
    return null;
  }

  // Función para manejar el evento de retroceso
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <TiArrowBackOutline 
      onClick={handleBack}
      className='btn-back'
    />
  );
}

export default BackButton;