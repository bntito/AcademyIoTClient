import React from 'react';

import { IoMenu } from "react-icons/io5";

import './header.css';

function Header({ menuview }) {

  return (
    <>
    <header className='header-header'>
      <div className='logo'>
        <h2 className='h2-header'>Academia <b className='iot'>IoT</b></h2>
      </div>
      <div className='subtitle-menu-icon-container'>
        <div className='menu-icon-container'>
          <IoMenu
            onClick={menuview}
            onMouseEnter={menuview}
            className='menu-icon'
          />
        </div>
        <div className='watchword'>
          <h3 className='h3-header'><b>Estudiá</b> con nosotros en <b>Academia IoT</b></h3>
        </div>
      </div>
    </header>
    </>
  );
}

export default Header;