import React from 'react'
import "./AdminHome.css";
import Slider from '../../components/Slider/Slider';

export default function AdminHome() {
  return (
    <div className="admin__home">
      <div className="home__header">
        <div className="links__container">
          <div className="link__item">
            <p>Home Page</p>
          </div>
          <div className="link__item">
            <p>Posting</p>
          </div>
          <div className="link__item">
            <p>List Post</p>
          </div>
          <div className="link__item home__note__container">
            <span className='home__note__title'>Ghi chú</span>
            <div className="home__note__list">
              <p>1. To do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do do  A...</p>
              <span>June 5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="home__content">
        <Slider />
      </div>
    </div>
  );
}
