import React, {useContext} from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import {illustration, contactInfo} from "../../portfolio";
import {Fade} from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import DonatePanel from "../../components/donatePanel/DonatePanel";

export default function Contact() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">
              {getText(contactInfo.title, language)}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "subTitle contact-subtitle"
              }
            >
              {getText(contactInfo.subtitle, language)}
            </p>
            <div
              className={
                isDark ? "dark-mode contact-text-div" : "contact-text-div"
              }
            >
              {contactInfo.number && (
                <>
                  <a
                    className="contact-detail"
                    href={"tel:" + contactInfo.number}
                  >
                    {contactInfo.number}
                  </a>
                  <br />
                  <br />
                </>
              )}
              <a
                className="contact-detail-email"
                href={"mailto:" + contactInfo.email_address}
              >
                {contactInfo.email_address}
              </a>
              <br />
              <br />
              <SocialMedia />
              <div className="contact-qr">
                <h3>
                  {language === "zh" ? "微信公众号" : "WeChat Official Account"}
                </h3>
                <p className="contact-qr-subtitle">
                  {language === "zh"
                    ? "扫码关注，获取最新文章与作品更新"
                    : "Scan to follow and get the latest updates"}
                </p>
                <img src="/wechat_qrcode_echo.jpg" alt="WeChat QR Code" />
              </div>
              <DonatePanel />
            </div>
          </div>
          <div className="contact-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={email} />
            ) : (
              <img
                alt="Man working"
                src={require("../../assets/images/contactMailDark.svg")}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
