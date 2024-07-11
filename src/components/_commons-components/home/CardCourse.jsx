// import { useEffect, useState } from 'react';
// import { useFetch } from '../../../hooks/useFetch';
// import { Link } from 'react-router-dom';

// import './cards.css';

// function CardCourses() {
//   // Host del servidor desde las variables de entorno y contexto de usuario
//   const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
//   const api = `${hostServer}/api/courses`;

//   // Estados locales
//   const [cards, setCards] = useState([]);
//   const [startIndex, setStartIndex] = useState(0);

//   // Hook de fetch personalizado
//   let {
//     dataServer,
//     isLoading = false,
//     getData
//   } = useFetch(`${api}`);

//   // Obtener cursos desde el servidor
//   const getCourses = async () => {
//     await getData(api);
//   };

//   // Obtener lista de cursos al montar el componente
//   useEffect(() => {
//     getCourses();
//   }, []);

//   // Actualiza las tarjetas destacadas en función de los datos del servidor
//   useEffect(() => {
//     if (dataServer && dataServer.dataServerResult) {
//       const allCards = dataServer.dataServerResult.dataApi
//       const prominentCards = allCards.filter(card => card.prominent === true);
//       setCards(prominentCards);
//     }
//   }, [dataServer]);

//   // Temporizador para cambiar las tarjetas cada 3 segundos
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setStartIndex((prevIndex) => (prevIndex + 4) % cards.length);
//     }, 3000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, [cards]);

//   return (
//     <>
//       <h1 className='title-b2'>Cursos <b>Destacados</b></h1>
//       <hr />
//       {
//         isLoading ? (
//           <h3>Cargando...</h3>
//         ) : (
//           <div className='row'>
//             <div className='cards cards-home'>
//               {
//                 cards.slice(startIndex, startIndex + 4).map((card) => (
//                   <Link
//                     key={card.id}
//                     to={`/courseView/${card.id}`}
//                     className='card card-home h-100 card'
//                   >
//                     <img
//                       src={`${hostServer}${card.urlImg}`}
//                       alt={card.description}
//                       className='card-img-top'
//                     />
//                     <div className='card-body'>
//                       <h5 className='card-title'>{card.name}</h5>
//                       <p className='card-text'>{card.description}</p>
//                     </div>
//                     <div className='card-footer'>
//                       <div className='grup-footer'>
//                         <small className='text-muted'>{`Duración de los cursos ${card.duration}`}</small>
//                         <div>
//                           <span>{`Clasificación de ${card.qualification} Estrellas`}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))
//               }
//             </div>
//           </div>
//         )
//       }
//     </>
//   );
// }

// export default CardCourses;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import java from '../../../assets/java.webp';
import javascript from '../../../assets/javascript.jpg';
import MongoDB from '../../../assets/MongoDB.jpg';
import mysql from '../../../assets/mysql.png';
import php from '../../../assets/php.webp';
import python from '../../../assets/python.webp';
import react from '../../../assets/react.png';
import vue from '../../../assets/vue.jpg';

import './cards.css';

function CardCourses() {
  // Estados locales
  const [cards, setCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Inicializar las tarjetas con imágenes importadas
  useEffect(() => {
    setCards([
      { id: 1, urlImg: java, name: 'Java', description: 'Curso de Java', duration: '3 meses', qualification: '4.5' },
      { id: 2, urlImg: javascript, name: 'JavaScript', description: 'Curso de JavaScript', duration: '2 meses', qualification: '4.0' },
      { id: 3, urlImg: MongoDB, name: 'MongoDB', description: 'Curso de MongoDB', duration: '4 meses', qualification: '5.0' },
      { id: 4, urlImg: mysql, name: 'MySQL', description: 'Curso de MySQL', duration: '1 mes', qualification: '3.5' },
      { id: 5, urlImg: php, name: 'PHP', description: 'Curso de PHP', duration: '3 meses', qualification: '4.2' },
      { id: 6, urlImg: python, name: 'Python', description: 'Curso de Python', duration: '2 meses', qualification: '4.8' },
      { id: 7, urlImg: react, name: 'React', description: 'Curso de React', duration: '3 meses', qualification: '4.7' },
      { id: 8, urlImg: vue, name: 'Vue', description: 'Curso de Vue', duration: '2 meses', qualification: '4.4' },
    ]);
  }, []);

  // Temporizador para cambiar las tarjetas cada 3 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 4) % cards.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [cards]);

  return (
    <>
      <h1 className='title-b2'>Cursos <b>Destacados</b></h1>
      <hr />
      <div className='row'>
        <div className='cards cards-home'>
          {
            cards.slice(startIndex, startIndex + 4).map((card) => (
              <Link
                key={card.id}
                to={`/courseView/${card.id}`}
                className='card card-home h-100 card'
              >
                <img
                  src={card.urlImg}
                  alt={card.description}
                  className='card-img-top'
                />
                <div className='card-body'>
                  <h5 className='card-title'>{card.name}</h5>
                  <p className='card-text'>{card.description}</p>
                </div>
                <div className='card-footer'>
                  <div className='grup-footer'>
                    <small className='text-muted'>{`Duración de los cursos ${card.duration}`}</small>
                    <div>
                      <span>{`Clasificación de ${card.qualification} Estrellas`}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default CardCourses;
