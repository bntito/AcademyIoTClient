import React from 'react';

import { PiMapPinLine } from 'react-icons/pi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

import { TfiEmail } from 'react-icons/tfi';
import { SlSocialInstagram } from 'react-icons/sl';
import { ImWhatsapp } from 'react-icons/im';

import './footer.css';

function Footer() {
  const googleMapsUrl = 'https://www.google.com/maps/search/shop+cerca+de+Punta+Carretas,+Montevideo+Departamento+de+Montevideo/@-34.9214426,-56.160433,17z?entry=ttu';
  const emailAddress = 'iot_academy@correos.com';
  const whatsappNum = '+59899951021';
  const instagramUrl = 'https://www.instagram.com/brunotito11';

  return (
    <>
      <footer>
        <section className='footer-container'>
          <div className='div-footer'>
            <h3 className='title-footer'>Puntos de contacto</h3>
            <hr className='line'/>
            <p>
              <a href={googleMapsUrl} target='_blank' rel='noopener noreferrer' className='a-link'>
                <PiMapPinLine className='icon-color' /> {''}
                Shopping Punta Carretas - Piso 1 - Local 11
              </a>
            </p>
            <p>
              <a href={`https://wa.me/${whatsappNum}`} target='_blank' rel='noopener noreferrer' className='a-link'>
                <BsTelephone className='icon-color' /> {''}
                ¡Conéctate con nosotros en nuestras redes sociales o envíanos un correo electrónico!
              </a>
            </p>
            <p>
              <a href={`mailto:${emailAddress}`} className='a-link'>
                <MdOutlineMarkEmailRead className='icon-color' /> {''}
                academia_iot@correos.com
              </a>
            </p>
          </div>
          <div className='div-footer footer2'>
            <h3 className='title-footer'>Acerca de</h3>
            <hr className='line'/>
            <p>
              Tu opinión es importante para nosotros.
              Descubre más sobre nuestra misión, visión y valores. Conoce quiénes somos, qué hacemos y por qué lo hacemos.
            </p>
            <p>
              ¡Explora nuestra historia y conéctate con nuestra pasión por lo que hacemos!
            </p>
          </div>
          <div className='div-footer'>
            <h3 className='title-footer'>Puedes ubicarnos</h3>
            <hr className='line'/>
            <div className='icons-container'>
              <h6>
                <a href={`https://wa.me/${whatsappNum}`} target='_blank' rel='noopener noreferrer' className='a-link'>
                  <ImWhatsapp className='icon-color'  /> Whtasapp
                </a>
              </h6>
              <br />
              <h6>
                <a href={instagramUrl} target='_blank' rel='noopener noreferrer' className='a-link'>
                  <SlSocialInstagram className='icon-color'  /> Instagram
                </a>
              </h6>
              <br />
              <h6>
                <a href={`mailto:${emailAddress}`} className='a-link'>
                  <TfiEmail className='icon-color'  /> Correo electrónico
                </a>
              </h6>
            </div>
          </div>
        </section>
        <section className='copyright'>
          <p>&copy; Copyright 2024 - IoT Academy - Todos los derechos reservados</p>
        </section>
      </footer>
    </>
  );
};

export default Footer;