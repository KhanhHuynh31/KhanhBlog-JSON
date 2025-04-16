import React, { useEffect, useState } from 'react'
import "./AdminMenu.css";
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaKorvue } from "react-icons/fa";
import { RiHome5Line } from "react-icons/ri";
import { MdBackupTable } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoIosPower } from "react-icons/io";
import { ImBlog } from "react-icons/im";
import { CiViewList } from "react-icons/ci";
import { FcManager } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS } from '../../../../redux/actions/UserActions';
import { CiStickyNote } from "react-icons/ci";
export default function AdminMenu() {
  const { t, i18n } = useTranslation();
  const [dropdown, setDropdown] = useState(true);
  const userLoginData = useSelector(state => state.UserReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoginData == null) {
      navigate('/login');
    };
  }, [userLoginData, navigate]);
  return (
    <div className="admin__menu">
      <div className="menu__list">
        <div className="menu__logo">
          <Link to="home" className="logo__link">
            <FaKorvue className="menu__icon" />
            <h2 className="logo__title">Khanh's Blog</h2>
          </Link>
        </div>

        <ul className="list__items">
          <li className="label__menu">
            <span>{t("home")}</span>
          </li>
          <li>
            <NavLink to="note" className={({ isActive }) =>
              `admin__link list__item${isActive ? ' active__admin' : ''}`
            }    >
              <div className="admin__icon">
                <CiStickyNote className="logo__icon" />
                <span>Ghi chú</span>
              </div>
            </NavLink>
          </li>
          <li className="list__item ">
            <div
              className={"admin__link"}
              onClick={() => setDropdown(!dropdown)}
            >
              <div className="admin__icon">
                <MdBackupTable className="logo__icon" />
                <span> Frontend pages</span>
              </div>
              {dropdown ? (
                <IoIosArrowUp className="logo__icon" />
              ) : (
                <IoIosArrowDown className="logo__icon" />
              )}
            </div>
          </li>
          <li
            className={`list__item option__list ${dropdown ? "" : "open__list"
              }`}
          >
            {" "}
            <NavLink to="/home" className={"admin__link"}>
              <div className="admin__icon">
                <span className="logo__icon">o</span>
                <span>Homepage</span>
              </div>
            </NavLink>
          </li>
          <li
            className={`list__item option__list ${dropdown ? "" : "open__list"
              }`}
          >
            <NavLink to="/about" className={"admin__link"}>
              <div className="admin__icon">
                <span className="logo__icon">o</span>
                <span>About us</span>
              </div>
            </NavLink>
          </li>
          <li
            className={`list__item option__list ${dropdown ? "" : "open__list"
              }`}
          >
            <NavLink to="/category" className={"admin__link"}>
              <div className="admin__icon">
                <span className="logo__icon">o</span>
                <span>Category</span>
              </div>
            </NavLink>
          </li>
          <li className="label__menu">
            <span>{t("manage")}</span>
          </li>


          <li>
            <NavLink to="posts" className={({ isActive }) =>
              `admin__link list__item${isActive ? ' active__admin' : ''}`
            }    >
              <div className="admin__icon">
                <ImBlog className="logo__icon" />
                <span> {t("posting")}</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="list" className={({ isActive }) =>
              `admin__link list__item${isActive ? ' active__admin' : ''}`
            }    >
              <div className="admin__icon">
                <CiViewList className="logo__icon" />
                <span> {t("list post")}</span>
              </div>
            </NavLink>
          </li> 
        </ul>
      </div>
      <div className="account__menu">
        <div className="account__content">
          <FcManager className="logo__icon" />
          <div>
            <p>{userLoginData?.user_name}</p>
            <span>Manager</span>
          </div>
        </div>

        <div className="logout__menu"
          onClick={() => {
            const action = { type: LOGOUT_SUCCESS }
            dispatch(action);
          }}>
          <IoIosPower className="logout__icon" />
          <div className="overlay__text">Log out</div>
        </div>
      </div>
    </div>
  );
}
