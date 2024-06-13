import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import { Link } from 'react-router-dom';

import './carousel.css';

function Carousel() {
  const hostServer = import.meta.env.VITE_REACT_APP_SERVER_HOST;
  const api = `${hostServer}/api/courses`;
  const [cards, setCards] = useState([]);

  let {
    dataServer,
    getData
  } = useFetch(`${api}`);

  const getCourses = async () => {
    await getData(api);
  };

  useEffect(() => {
    getCourses();
    const carouselElement = document.querySelector('#carouselExampleDark');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3500,
        ride: 'carousel'
      });
    }
  }, []);

  useEffect(() => {
    if (dataServer && dataServer.dataServerResult) {
      const allCards = dataServer.dataServerResult.dataApi;
      setCards(allCards);
    }
  }, [dataServer]);

  return (
    <div className='container-carousel'>
      <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {
            cards.map((card, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              >
              </button>
            ))
          }
        </div>
        <div className="carousel-inner">
          {
            cards.map((card, index) => (
              <div 
                key={card.id}
                className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="3500"
              >
                <Link to={`/courseView/${card.id}`}>
                  <img 
                    src={`${hostServer}${card.urlImg}`}
                    alt={`Banner ${index + 1}`} 
                    className="d-block w-100"
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className='title-caption'>{card.name}</h5>
                    <p className='sub-title-caption'>{card.description}</p>
                  </div>
                </Link>
              </div>
            ))
          }
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
  );
}

export default Carousel;