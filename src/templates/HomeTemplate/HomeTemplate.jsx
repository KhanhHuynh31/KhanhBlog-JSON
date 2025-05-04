import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton'
import { useSelector } from 'react-redux'
import "./HomeTemplate.css"
import LoadingPage from '../../components/LoadingPage/LoadingPage'
export default function HomeTemplate() {
  const loading = useSelector(state => state.PostReducer.loading);
  const { theme } = useSelector((state) => state.WebReducer);
  return (
    <Fragment>
      <div
        className={theme === "dark" ? "home__dark" : "home__light"}
      >
        <div className="container" >
          <Header />
          <div className='background'>
            {loading ? <LoadingPage /> : <Outlet />}
            <BackToTopButton />
            <Footer />
          </div>
        </div>
      </div>
    </Fragment >
  );
}
