import React from 'react';
import banner1 from '../../../assets/main/banner1.jpg';
import banner2 from '../../../assets/main/banner2.jpg';
import banner3 from '../../../assets/main/banner3.jpg';

import './carousel.css';

function Carouse() {
  return (
    <>
    <div className='container-carousel'>
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3500">
            <img src={banner1} className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
              <h5 className='title-caption'>Estudia Códigos!</h5>
              <p className='sub-title-caption'>Todo en sistemas para dispositivos con códigos</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3500">
            <img src={banner2} className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
              <h5 className='title-caption'>Estudia Desarrollo!</h5>
              <p className='sub-title-caption'>Curso dedicado al manejo de las herramientas de la actualidad</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="3500">
            <img src={banner3} className="d-block w-100" alt="..."/>
            <div className="carousel-caption d-none d-md-block">
              <h5 className='title-caption'>Estudia Diseño del Desarrollo!</h5>
              <p className='sub-title-caption'>Lleva tu imaginación al límite y registralo en la vida real</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    </>
  );
}

export default Carouse;