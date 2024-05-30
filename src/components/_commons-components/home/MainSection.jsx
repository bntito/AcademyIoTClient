import img from '../../../assets/main/market.webp';

function MainSection() {

  return (
    <>
    <div className='mt-4'>
      <h1 className='text-center title-h1'>Bienvenido a <b>IoT <i>Academy</i></b></h1>
      <hr />
      <section className='section-container'>
        <aside className='section-aside'>
          <p>
            Nos complace ofrecer una amplia gama de <b>Cursos de informática</b> diseñados para satisfacer sus necesidades de aprendizaje,
            sin importar su nivel de experiencia.
          </p>
          <p>
            En nuestro instituto, encontrará un equipo dedicado de intructores expertos apasionados por la enseñanza.
          </p>
          <p>
            Nuestra misión es brindar las habilidades y conocimientos que necesita para tener éxito en la era digital actual.
          </p>
          <p>
            <b>Únase al mejor instituto de IT</b> y emprenda un viaje de crecimiento
          </p>
          <h1 className='title-b2 text-center mt-5'><i>Formando Grandes Profesionales</i></h1>
        </aside>
        <aside className='aside-img'>
          <img 
            src={img}
            alt="Imágen principal"
            className='img-mainsection'
          />
        </aside>
      </section>
    </div>
    </>
  );
};

export default MainSection;