import { useRef, useState, useEffect } from 'react';

import { AppContextProvider } from '../../../hooks/AppContext';

import { IoClose } from "react-icons/io5";
import './modal.css';

function Modal({ children, title, size, bgChange }) {
  // Estado local para controlar las clases de vista del modal
  const [viewClass, setViewClass] = useState('');

  // Referencia al contenedor del modal
  const ref = useRef(null);

  // Variable para controlar el cambio de color de fondo del modal
  let bgColor = false;

  // Función para manejar el cierre del modal
  function handleClose() {
    // Añadir clase de animación para desvanecer el modal
    ref.current.classList.add('fadeOut');
    // Escuchar el evento de finalización de la animación para eliminar el modal del DOM
    ref.current.addEventListener('animationend', (e) => {
      const div_root = document.getElementById('modal');
      div_root.remove();
    });
  };

  // Efecto para actualizar el estado de la variable bgColor cuando cambia bgChange
  useEffect(() => {
    if (bgChange) {
      bgColor = true;
    }
  }, [bgChange]);

  // Efecto para actualizar las clases de vista del modal según el tamaño especificado
  useEffect(() => {
    switch (size) {
      case 'small':
        setViewClass('modalView modalViewSmall');
        break;
      case 'medium':
        setViewClass(`modalView modalViewMedium ${bgColor ? 'modalBodyGrey' : 'modalBodyWhite'}`);
        break;
      case 'big':
        setViewClass('modalView modalViewBig');
        break;
      default:
        setViewClass('modalView');
        break;
    }
  }, [size]);

  return (
    <AppContextProvider>
      <div className="modalContainer" ref={ref}>
        <div className={viewClass}>
          <div className="modalHeader">
            <div className="title">{title}</div>
            <div>
              {
                <IoClose
                  onClick={handleClose}
                  className="closeButton" 
                />
              }
            </div>
          </div>
          <div className="modalContent">{children}</div>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default Modal;