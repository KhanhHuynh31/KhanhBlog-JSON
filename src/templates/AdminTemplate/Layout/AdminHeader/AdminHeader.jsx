import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom'
import "./AdminHeader.css";
import vnIcon from '../../../../assets/images/vietnam.png'
import enIcon from '../../../../assets/images/united-kingdom.png'
import { LuSun, LuMoon } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { changeThemeAction } from '../../../../redux/actions/WebAction';
import { FcManager } from 'react-icons/fc';
import { FaBars } from "react-icons/fa6";

export default function AdminHeader({ onSendData }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.WebReducer);

  const handleDivClick = (value) => {
    onSendData(value); // Send boolean value to parent
  };
  const themeChange = () => {
    dispatch(changeThemeAction(theme));
  }
  const langquageChange = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("vn");

    }
    else {
      i18n.changeLanguage("en");
    }
  }
  return (
    <div className="admin__header">
      <div className="admin__left">
        <FaBars className='header__link header_bars' onClick={() => handleDivClick(true)} />
        <NavLink
          to="home"
          className={({ isActive }) =>
            "header__link" + (isActive ? " admin__active" : "")

          }
        >
          <span className="link__text"> {t("home")}</span>{" "}
        </NavLink>
        <NavLink
          to="posts"
          className={({ isActive }) =>
            "header__link" + (isActive ? " admin__active" : "")

          }
        >
          <span className="link__text"> {t("posting")}</span>{" "}
        </NavLink>
        <NavLink
          to="list"
          className={({ isActive }) =>
            "header__link" + (isActive ? " admin__active" : "")
          }
        >
          <span className="link__text"> {t("list post")}</span>{" "}
        </NavLink>
      </div>
      <div className="admin__right">
        <div onClick={() => themeChange()}>
          {theme === "light" ? (
            <LuSun className="langquage__icon light__mode" />
          ) : (
            <LuMoon className="langquage__icon dark__mode" />
          )}
        </div>
        <img
          className="langquage__icon"
          onClick={() => langquageChange()}
          src={i18n.language === "vn" ? vnIcon : enIcon}
          alt="langquage icon"
        />
        <FcManager className="langquage__icon" />

      </div>
    </div>
  );
}
