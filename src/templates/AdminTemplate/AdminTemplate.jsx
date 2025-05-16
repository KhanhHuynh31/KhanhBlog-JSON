import React, { Fragment, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminMenu from './Layout/AdminMenu/AdminMenu'
import AdminHeader from './Layout/AdminHeader/AdminHeader'
import "./AdminTemplate.css"
import { useSelector } from 'react-redux'
import LoadingPage from '../../components/LoadingPage/LoadingPage'

export default function AdminTemplate() {
    const navigate = useNavigate();
    const loading = useSelector(state => state.PostReducer.loading);
    const { theme } = useSelector((state) => state.WebReducer);
    useEffect(() => {
        const loginStatus = localStorage.getItem('LOGIN_SUCCESS');
        if (!loginStatus) {
            alert("Vui lòng đăng nhập để có thể đăng bài !");
            navigate('/home');
        }
    }, [navigate]);
    const [openMenu, setOpenMenu] = useState(false);
    const handleChildData = (data) => {
        setOpenMenu(data);
    };

    return (
        <Fragment>
            <div
                className={`admin__main ${openMenu === true ? "active__menu" : ""}  ${theme === "dark" ? "theme__dark" : "theme__light"
                    }`}
            >
                <AdminMenu />
                <div className="admin__content">
                    <div
                        className="menu__close"
                        onClick={() => setOpenMenu(false)}
                        style={{ display: openMenu === true ? "block" : "none" }}
                    ></div>
                    <AdminHeader onSendData={handleChildData} />
                    {loading ? <LoadingPage /> : <Outlet />}
                </div>
            </div>
        </Fragment>
    );
}
