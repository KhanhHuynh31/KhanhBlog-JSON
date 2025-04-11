import React, { Fragment, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../redux/actions/PostAction'
import "./HomeTemplate.css"
export default function HomeTemplate() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.WebReducer);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Fragment>
      <div
        className={theme === "dark" ? "home__dark" : "home__light"}
      >
        <div className="container" >
          <Header />
          <div className='background'>
            <Outlet />
            <BackToTopButton />
            <Footer />
          </div>
        </div>
      </div>
    </Fragment >
  );
}
