import React from 'react';

import { PiMapPinLine } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMarkEmailRead } from "react-icons/md";

import { TfiEmail } from 'react-icons/tfi';
import { SlSocialInstagram } from 'react-icons/sl';
import { ImWhatsapp } from 'react-icons/im';

import './footer.css'

function Footer() {
  return (
    <>
      <footer>
        <section className='footer-container'>
          <div className='div-footer'>
            <h3 className='title-footer'>Puntos de contacto</h3>
            <h5 className='line'>____________________</h5>
            <p>
              <PiMapPinLine className="icon-color" /> {''}
              Shopping Punta Carretas - Piso 1 - Local 11
            </p>
            <p>
              <BsTelephone className="icon-color" /> {''}
              ¡Conéctate con nosotros en nuestras redes sociales o envíanos un correo electrónico!
            </p>
            <p>
              <MdOutlineMarkEmailRead className="icon-color" /> {''}
              academia_iot@correos.com
            </p>
          </div>
          <div className='div-footer footer2'>
            <h3 className='title-footer'>Acerca de</h3>
            <h5 className='line'>____________________</h5>
            <p>
              Tu opinión es importante para nosotros.
              Descubre más sobre nuestra misión, visión y valores. Conoce quiénes somos, qué hacemos y por qué lo hacemos.
            </p>
            <br />
            <p>
              ¡Explora nuestra historia y conéctate con nuestra pasión por lo que hacemos!
            </p>
          </div>
          <div className='div-footer'>
            <h3 className='title-footer'>Puedes ubicarnos</h3>
            <h5 className='line'>____________________</h5>
            <h6><ImWhatsapp className="icon-color"  /> Whtasapp</h6>
            <br />
            <h6><SlSocialInstagram className="icon-color"  /> Instagram</h6>
            <br />
            <h6><TfiEmail className="icon-color"  /> Correo electrónico</h6>
          </div>
        </section>
        <section className='copyright'>
          <p>&copy; Copyright 2024 - IoT Academy - Todos los derechos reservados</p>
        </section>
      </footer>
    </>
  );
}

export default Footer;