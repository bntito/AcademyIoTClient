import MainSection from './MainSection';
import CardCourse from './CardCourse';
import Carousel from '../carouse/Carousel';
import LoginUser from '../../_commons-components/loginUser/LoginUser';
import AddContact from '../../_specifics-compoents/contacts/AddContact';
import { Link } from 'react-router-dom';

import './home.css';

const Home = () => {
  return (
    <>
    <div>
      <div className='carousel-container'>
      <Carousel />
      </div>
      <LoginUser />
      <MainSection />
      <CardCourse />
      <h2 className='mt-5 title-b2'>Enlístate con nosotros</h2>
      <hr />
      <p className='p-home'>
        Envíanos un mensaje y te atenderemos a la brevedad. Registrate
        en el siguiente <Link to={'/addUser'} className='link-home'>Link</Link> y forma parte de
        nuestro selecto grupo de estudiantes.
      </p>
      <h6 className='text-center'>Formulario de contacto</h6>
      <AddContact />
    </div>
    </>
  );
}

export default Home;