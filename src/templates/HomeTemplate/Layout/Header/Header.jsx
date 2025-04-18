import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { LOGOUT_SUCCESS, LOGIN_SUCCESS } from '../../../../redux/actions/UserActions'
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "../../../../components/SearchModal/SearchModal";
import AutoSearch from "../../../../components/AutoSearch/AutoSearch";
import { changeThemeAction } from "../../../../redux/actions/WebAction";
import { LuSun, LuMoon } from "react-icons/lu";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [scroll, setScroll] = useState(0);
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);
  const { theme } = useSelector((state) => state.WebReducer);
  const themeChange = () => {
    dispatch(changeThemeAction(theme));
  }

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const navigate = useNavigate();
  const userLoginData = useSelector(state => state.UserReducer.user);

  const [login, setLogin] = useState();
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    if (!localStorage.getItem(LOGIN_SUCCESS)) {
      setLogin(false);
    } else {
      setLogin(true);
      if (!userLoginData && localStorage.getItem(LOGIN_SUCCESS)) {
        try {
          const userData = JSON.parse(localStorage.getItem(LOGIN_SUCCESS));
          dispatch({ type: LOGIN_SUCCESS, payload: userData });
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }
  }, [userLoginData, dispatch]);
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    if (searchText === undefined || searchText === "") {
      alert("You must enter a keyword")
    }
    else {
      navigate('/search/' + searchText)
    }
  }
  const getSearchText = (event) => {
    const value = event.target.value;
    setSearchText(value.trim());
  }

  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScroll(scroll);
    };
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  });

  return (
    <div id="home" className="header">
      <SearchModal
        onSendData={openSearch}
        onClose={() => setOpenSearch(false)}
      />
      <div id="progressBar" style={{ transform: `scale(${scroll}, 1)` }} />
      <div className="header__left">
        <ul className="header__menu">
          <li className="menu__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "menu__link" + (isActive ? " home__active" : "")
              }
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/category"
              className={({ isActive }) =>
                "menu__link" + (isActive ? " home__active" : "")
              }
            >
              {t("category")}
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/admin/posts"
              className={({ isActive }) =>
                "menu__link" + (isActive ? " home__active" : "")
              }
            >
              {t("posting")}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="header__logo">
        <h3>Khanh's Blog</h3>
      </div>
      <div className="header__right">
        <span className="home__search">
          <form onSubmit={handleSubmitLogin}>
            <input
              type="text"
              className="search__input"
              onChange={getSearchText}
            />
            <div className="search__auto"
              style={{ visibility: searchText !== "" ? "visible" : "hidden" }}>
              {AutoSearch(searchText)}
            </div>
            <button type="submit" className="search__button">
              {t("search")}
            </button>
          </form>
        </span>
        <div className="user__box">
          {login && (
            <>
              <span className="user__icon">👤</span>
              <span className="user__name">{userLoginData?.user_name}</span>
              <div className="user__dropdown">
                <button
                  className="menu__link button__modal"
                  onClick={() => {
                    const action = { type: LOGOUT_SUCCESS };
                    dispatch(action);
                  }}
                >
                  {t("log out")}
                </button>
              </div>
            </>
          )}
          {!login && (
            <span className="user__name">
              <NavLink to="/login" className="menu__link">
                {t("login")}
              </NavLink>
            </span>
          )}
        </div>

        <div className="language__content">
          <a
            className={i18n.language === "vn" ? "language__active" : null}
            onClick={() => handleChange("vn")}
          >
            VN
          </a>
          <label> / </label>
          <a
            className={i18n.language === "en" ? "language__active" : null}
            onClick={() => handleChange("en")}
          >
            EN
          </a>

        </div>
        <div onClick={() => themeChange()}>
          {theme === "light" ? (
            <LuSun className="langquage__icon light__mode" />
          ) : (
            <LuMoon className="langquage__icon dark__mode" />
          )}
        </div>
      </div>
      <div className="dropdown">
        <div className="dropdown__icon">&#9776;</div>
        <div className="dropdown-content">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "menu__link" + (isActive ? " language__active" : "")
            }
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/category"
            className={({ isActive }) =>
              "menu__link" + (isActive ? " language__active" : "")
            }
          >
            {t("category")}
          </NavLink>
          <NavLink
            to="/admin/posts"
            className={({ isActive }) =>
              "menu__link" + (isActive ? " language__active" : "")
            }
          >
            {t("posting")}
          </NavLink>
          <a className="menu__link" onClick={() => setOpenSearch(true)}>
            {t("search")}
          </a>
          <a
            className={i18n.language === "vn" ? "language__active" : "menu__link"}
            onClick={() => handleChange("vn")}
          >
            Tiếng Việt
          </a>
          <a
            className={i18n.language === "en" ? "language__active" : "menu__link"}
            onClick={() => handleChange("en")}
          >
            English
          </a>
        </div>
      </div>
    </div>
  );
}
