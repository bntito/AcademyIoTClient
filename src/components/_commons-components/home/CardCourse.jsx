import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';

import './cards.css';

function CardCourses() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/courses`;
  const [cards, setCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  
  let {
    dataServer,
    isLoading = false,
    getData,
    deleteData,
    updateData
  } = useFetch(`${api}`);
  
  const getCourses = async () => {
    await getData(api);
  };

  useEffect(() => {
    getCourses();
  }, []);
  
  useEffect(() => {
    if (dataServer && dataServer.dataServerResult) {
      const allCards = dataServer.dataServerResult.dataApi
      const prominentCards = allCards.filter(card => card.prominent === true);
      setCards(prominentCards);
    }
  }, [dataServer]);

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
      {
        isLoading ? (
          <h3>Cargando...</h3>
        ) : (
          <div className='row'>
            <div className='cards cards-home'>
              {cards.slice(startIndex, startIndex + 4).map((card) => (
                <div
                  key={card.id}
                  className='card card-home h-100 card'
                >
                  <img
                    src={`${hostServer}/${card.urlImg}`}
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
                </div>
              ))}
            </div>
          </div>
        )
      }
    </>
  );
}

export default CardCourses;
