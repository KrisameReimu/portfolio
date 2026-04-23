import React, {useContext, useState} from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import {illustration, contactInfo} from "../../portfolio";
import {Fade} from "../../components/motion/Fade";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import DonatePanel from "../../components/donatePanel/DonatePanel";
import {contactPageCopy} from "../../config/pages/contactPage";

const buildMailtoLink = (emailAddress, subject, body) => {
  const params = new URLSearchParams({
    subject,
    body
  });
  return `mailto:${emailAddress}?${params.toString()}`;
};

export default function Contact() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const emailAddress = contactInfo.email_address;
  const mailtoLink = buildMailtoLink(
    emailAddress,
    getText(contactPageCopy.emailSubject, language),
    getText(contactPageCopy.emailBody, language)
  );

  const copyEmailAddress = async () => {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(emailAddress);
    setHasCopiedEmail(true);
    window.setTimeout(() => setHasCopiedEmail(false), 1800);
  };

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
              <div className="contact-email-panel">
                <a className="contact-detail-email" href={mailtoLink}>
                  {emailAddress}
                </a>
                <div className="contact-email-actions">
                  <a className="contact-email-button" href={mailtoLink}>
                    {getText(contactPageCopy.emailAction, language)}
                  </a>
                  <button
                    className="contact-email-button contact-email-button--ghost"
                    type="button"
                    onClick={copyEmailAddress}
                  >
                    {getText(
                      hasCopiedEmail
                        ? contactPageCopy.copiedEmail
                        : contactPageCopy.copyEmail,
                      language
                    )}
                  </button>
                </div>
              </div>
              <br />
              <br />
              <SocialMedia />
              <div className="contact-qr">
                <h3>{getText(contactPageCopy.qrTitle, language)}</h3>
                <p className="contact-qr-subtitle">
                  {getText(contactPageCopy.qrSubtitle, language)}
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
