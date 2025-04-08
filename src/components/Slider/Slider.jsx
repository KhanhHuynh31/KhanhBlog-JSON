import React from 'react'
import "./Slider.css"
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export default function Slider({ numberItem = 4 }) {
  const { t } = useTranslation();

  const postListData = useSelector((state) => state.PostReducer.posts);
  const renderSlider = () => {
    return postListData.slice(0, numberItem).map((item, index) => {
      return (
        <div className="slider__item" key={index}>
          <Link to={"/detail/" + item.postId}>
            <div className="item__picture">
              <img src={item.postImage} alt="khanh's blog"></img>
            </div>
            <div className="item__text" onClick={() => {}}>
              <h2>{item.postTitle}</h2>
              <p>{item.postDescription}</p>
            </div>
          </Link>
        </div>
      );
    });
  };
  return (
    <div className="slider__content">
      {renderSlider()}
      <div className="slider__title">{t("featured")}</div>
      <div className="slider__more">
        <Link to={"/category"}>{t("read more") + " ->"}</Link>
      </div>
    </div>
  );
}
