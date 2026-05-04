import React, {useContext, useState} from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import {contactInfo} from "../../portfolio";
import {Fade} from "../../components/motion/Fade";
import StyleContext from "../../contexts/StyleContext";
import LanguageContext from "../../contexts/LanguageContext";
import {getText} from "../../utils/i18n";
import DonatePanel from "../../components/donatePanel/DonatePanel";
import {contactPageCopy} from "../../config/pages/contactPage";
import {getPageHeroVisual} from "../../config/pages/pageHeroVisuals";
import {submitContactMessage} from "../../services/communityApi";

const normalizePhoneHref = phoneNumber =>
  `tel:+${phoneNumber.replace(/[^\d]/g, "")}`;

export default function Contact() {
  const {isDark} = useContext(StyleContext);
  const {language} = useContext(LanguageContext);
  const [copyStatus, setCopyStatus] = useState("idle");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageStatus, setMessageStatus] = useState("idle");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: ""
  });
  const emailAddress = contactInfo.email_address;
  const contactHeroVisual = getPageHeroVisual("contact");

  const copyEmailAddress = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus("failed");
      return;
    }

    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch (error) {
      setCopyStatus("failed");
    }
  };

  const updateContactForm = event => {
    const {name, value} = event.target;
    setContactForm(current => ({
      ...current,
      [name]: value
    }));
    if (messageStatus !== "idle") setMessageStatus("idle");
  };

  const submitMessage = async event => {
    event.preventDefault();
    setMessageStatus("submitting");

    try {
      await submitContactMessage({
        ...contactForm,
        locale: language,
        pagePath: window.location.pathname
      });
      setMessageStatus("success");
      setContactForm({
        name: "",
        email: "",
        topic: "",
        message: ""
      });
    } catch (error) {
      setMessageStatus(
        error.message === "community_api_not_configured"
          ? "missing-api"
          : "error"
      );
    }
  };

  const closeMessageDialog = () => {
    setIsMessageOpen(false);
    setMessageStatus("idle");
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div
        className={
          isDark
            ? "contact-page contact-surface contact-surface--dark"
            : "contact-page contact-surface contact-surface--light"
        }
        id="contact"
      >
        <section className="contact-hero">
          <div className="contact-hero__copy">
            <p className="contact-eyebrow">Contact / Support</p>
            <h1 className="contact-title">
              {getText(contactInfo.title, language)}
            </h1>
            <p className="contact-subtitle">
              {getText(contactInfo.subtitle, language)}
            </p>
          </div>

          <div className="contact-social-strip" aria-label="Social links">
            <SocialMedia />
          </div>

          {contactHeroVisual && (
            <figure className="contact-hero__visual">
              <img
                src={contactHeroVisual.src}
                alt={getText(contactHeroVisual.alt, language)}
                width="1672"
                height="941"
                decoding="async"
              />
              <figcaption>
                <span>{getText(contactHeroVisual.label, language)}</span>
                {getText(contactHeroVisual.caption, language)}
              </figcaption>
            </figure>
          )}
        </section>

        <section className="contact-method-grid" aria-label="Contact methods">
          <article className="contact-method-card contact-method-card--primary">
            <p className="contact-method-card__label">Email</p>
            <a
              className="contact-method-card__value"
              href={`mailto:${emailAddress}`}
            >
              {emailAddress}
            </a>
            <div className="contact-email-actions">
              <button
                className="contact-email-button"
                type="button"
                onClick={() => setIsMessageOpen(true)}
              >
                {getText(contactPageCopy.emailAction, language)}
              </button>
              <a
                className="contact-email-button contact-email-button--secondary"
                href={`mailto:${emailAddress}`}
              >
                {getText(contactPageCopy.mailAppAction, language)}
              </a>
              <button
                className="contact-email-button contact-email-button--ghost"
                type="button"
                onClick={copyEmailAddress}
              >
                {getText(
                  copyStatus === "copied"
                    ? contactPageCopy.copiedEmail
                    : copyStatus === "failed"
                    ? contactPageCopy.copyEmailFailed
                    : contactPageCopy.copyEmail,
                  language
                )}
              </button>
            </div>
          </article>

          {contactInfo.number && (
            <article className="contact-method-card">
              <p className="contact-method-card__label">Phone</p>
              <a
                className="contact-method-card__value"
                href={normalizePhoneHref(contactInfo.number)}
              >
                {contactInfo.number}
              </a>
              <p className="contact-method-card__note">
                {language === "zh"
                  ? "适合较直接的合作、研究支持或项目沟通。"
                  : "For direct collaboration, research support, or project conversations."}
              </p>
            </article>
          )}

          <article className="contact-method-card contact-method-card--qr">
            <div>
              <p className="contact-method-card__label">
                {getText(contactPageCopy.qrTitle, language)}
              </p>
              <p className="contact-method-card__note">
                {getText(contactPageCopy.qrSubtitle, language)}
              </p>
            </div>
            <img src="/wechat_qrcode_echo.jpg" alt="WeChat QR Code" />
          </article>
        </section>

        <DonatePanel />

        {isMessageOpen && (
          <div
            className="contact-dialog"
            aria-modal="true"
            role="dialog"
            aria-labelledby="contact-dialog-title"
          >
            <button
              className="contact-dialog__backdrop"
              type="button"
              aria-label={getText(contactPageCopy.closeDialog, language)}
              onClick={closeMessageDialog}
            />
            <form className="contact-dialog__panel" onSubmit={submitMessage}>
              <div className="contact-dialog__header">
                <div>
                  <p className="contact-eyebrow">
                    {getText(contactPageCopy.emailAction, language)}
                  </p>
                  <h2 id="contact-dialog-title">
                    {getText(contactPageCopy.contactFormTitle, language)}
                  </h2>
                </div>
                <button
                  className="contact-dialog__close"
                  type="button"
                  onClick={closeMessageDialog}
                >
                  {getText(contactPageCopy.closeDialog, language)}
                </button>
              </div>
              <p className="contact-dialog__intro">
                {getText(contactPageCopy.contactFormIntro, language)}
              </p>
              <div className="contact-form-grid">
                <label className="contact-form-field">
                  <span>
                    {getText(contactPageCopy.contactNameLabel, language)}
                  </span>
                  <input
                    name="name"
                    type="text"
                    value={contactForm.name}
                    onChange={updateContactForm}
                    placeholder={getText(
                      contactPageCopy.contactNamePlaceholder,
                      language
                    )}
                    maxLength={120}
                    required
                  />
                </label>
                <label className="contact-form-field">
                  <span>
                    {getText(contactPageCopy.contactEmailLabel, language)}
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={updateContactForm}
                    placeholder={getText(
                      contactPageCopy.contactEmailPlaceholder,
                      language
                    )}
                    maxLength={160}
                    required
                  />
                </label>
              </div>
              <label className="contact-form-field">
                <span>
                  {getText(contactPageCopy.contactTopicLabel, language)}
                </span>
                <input
                  name="topic"
                  type="text"
                  value={contactForm.topic}
                  onChange={updateContactForm}
                  placeholder={getText(
                    contactPageCopy.contactTopicPlaceholder,
                    language
                  )}
                  maxLength={160}
                  required
                />
              </label>
              <label className="contact-form-field">
                <span>
                  {getText(contactPageCopy.contactMessageLabel, language)}
                </span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={updateContactForm}
                  placeholder={getText(
                    contactPageCopy.contactMessagePlaceholder,
                    language
                  )}
                  maxLength={1600}
                  rows={7}
                  required
                />
              </label>
              <div className="contact-dialog__footer">
                <button
                  className="contact-email-button"
                  type="submit"
                  disabled={messageStatus === "submitting"}
                >
                  {getText(
                    messageStatus === "submitting"
                      ? contactPageCopy.contactSubmitting
                      : contactPageCopy.contactSubmitAction,
                    language
                  )}
                </button>
                {messageStatus !== "idle" && (
                  <p
                    className={
                      messageStatus === "success"
                        ? "contact-form-status contact-form-status--success"
                        : "contact-form-status contact-form-status--error"
                    }
                  >
                    {getText(
                      messageStatus === "success"
                        ? contactPageCopy.contactSuccess
                        : messageStatus === "missing-api"
                        ? contactPageCopy.contactApiMissing
                        : contactPageCopy.contactError,
                      language
                    )}
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </Fade>
  );
}
