import React, { Fragment, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../redux/actions/PostAction'

export default function HomeTemplate() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="container" >
        <Header />
        <div className='background'>
          <Outlet />
          <BackToTopButton />
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
