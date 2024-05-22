import React from 'react';

import { IoMenu } from "react-icons/io5";

import './header.css';

function Header({ menuview }) {

  return (
    <>
    <header>
      <div className='title-container'>
      <h2 className='h2-header'>Academia <b className='iot'>IoT</b></h2>
      </div>
      <div className='subtitle-menu-icon-container'>
      <div className='menu-icon-container'>
        <IoMenu 
          onMouseEnter={menuview}
          className='menu-icon'
        />
      </div>
      <h3 className='h3-header'><b>Estudiá</b> con nosotros en <b>Academia IoT</b></h3>
      </div>
    </header>
    </>
  );
}

export default Header;