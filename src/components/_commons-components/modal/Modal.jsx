import { useRef, useState, useEffect } from 'react';

import { AppContextProvider } from '../../../hooks/AppContext';

import { IoClose } from "react-icons/io5";
import './modal.css';

function Modal({ children, title, size, bgChange }) {
  const [viewClass, setViewClass] = useState('');
  let bgColor = false;
  const ref = useRef(null);

  function handleClose() {
    ref.current.classList.add('fadeOut');
    ref.current.addEventListener('animationend', (e) => {
      const div_root = document.getElementById('modal');
      div_root.remove();
    });
  };

  useEffect(() => {
    if (bgChange) {
      bgColor = true;
    }
  }, [bgChange]);

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