import React from 'react'
import landingImg from '../../../assets/images/landing-img.svg';
import checkImg from "../../../assets/images/check-img.svg";

import "./About.css";
import Slider from '../../../components/Slider/Slider';
export default function About() {
    return (
      <div className="about__container">
        <div className="about__header">
          <div className="header__title">
            <h1>Landing Page Website FREE</h1>
          </div>
        </div>
        <h2>About me</h2>
        <hr></hr>

        <div className="about__me">
          <div>
            <h3>Use Notion Website Templates for Your Landing Pages</h3>
            <p>
              Need a quick solution for creating a landing page website? This
              Notion Landing Page Template is easy to setup. It has Notion AI
              blocks to nudge you for the best website copy. Customise it for
              your perfect website.
            </p>
            <div className="footer__socials">
              <a
                href="https://www.facebook.com/huynhkhanh2k/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="footer__facebook">f</p>
              </a>
              <a
                href="https://github.com/quoc-khanh-31"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="footer__github">G</p>
              </a>
            </div>
          </div>
          <img src={landingImg} alt="Landing illustration" />
        </div>
        <h2>Key Benefits</h2>
        <div className="about__key">
          <div className="key__item">
            <img src={checkImg} alt="React logo" />
            <p>
              Write four H3 sentences that describe the key benefits of this
              template. Such as ease of use, customizable, streamlined
              productivity and mobile friendly.
            </p>
          </div>
          <div className="key__item">
            <img src={checkImg} alt="React logo" />
            <p>
              Write four H3 sentences that describe the key benefits of this
              template. Such as ease of use, customizable, streamlined
              productivity and mobile friendly.
            </p>
          </div>
          <div className="key__item">
            <img src={checkImg} alt="React logo" />
            <p>
              Write four H3 sentences that describe the key benefits of this
              template. Such as ease of use, customizable, streamlined
              productivity and mobile friendly.
            </p>
          </div>
          <div className="key__item">
            <img src={checkImg} alt="React logo" />
            <p>
              Write four H3 sentences that describe the key benefits of this
              template. Such as ease of use, customizable, streamlined
              productivity and mobile friendly.
            </p>
          </div>
        </div>
        <div className="about__posts">
          <h1>Don’t miss out on our latest templates</h1>
          <Slider numberItem={4} />
        </div>
      </div>
    );
}
