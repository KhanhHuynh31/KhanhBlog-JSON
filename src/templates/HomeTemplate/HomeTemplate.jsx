import React, { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Layout/Footer/Footer'
import Header from './Layout/Header/Header'
import BackToTopButton from '../../components/BackToTopButton/BackToTopButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../redux/actions/PostAction'
import "./HomeTemplate.css"
import LoadingPage from '../../components/LoadingPage/LoadingPage'
export default function HomeTemplate() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.PostReducer.loading);
  const { theme } = useSelector((state) => state.WebReducer);
  const [openLoading, setOpenLoading] = useState(false);
  useEffect(() => {
    if (loading) {
      setOpenLoading(true)
    }
    else {
      setOpenLoading(false)
    }
  }, [loading]);
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
            {loading ? <LoadingPage /> : <Outlet />}
            <BackToTopButton />
            <Footer />
          </div>
        </div>
      </div>
    </Fragment >
  );
}
