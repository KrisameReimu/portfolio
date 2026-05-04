import React, {useContext, useState} from "react";
import LanguageContext from "../../contexts/LanguageContext";
import {supportInfo} from "../../portfolio";
import {contactPageCopy} from "../../config/pages/contactPage";
import {getText} from "../../utils/i18n";
import {subscribeToUpdates} from "../../services/communityApi";
import "./DonatePanel.scss";

export default function DonatePanel() {
  const {language} = useContext(LanguageContext);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("idle");

  if (!supportInfo?.display) return null;

  const submitSubscription = async event => {
    event.preventDefault();
    setSubscribeStatus("submitting");

    try {
      const result = await subscribeToUpdates({
        email: subscribeEmail,
        locale: language,
        source: "support-panel"
      });
      setSubscribeStatus(result.exists ? "exists" : "success");
      if (!result.exists) setSubscribeEmail("");
    } catch (error) {
      setSubscribeStatus(
        error.message === "community_api_not_configured"
          ? "missing-api"
          : "error"
      );
    }
  };

  const supportCards = [
    {
      key: "fps",
      group: getText(contactPageCopy.localSupport, language),
      title: getText(contactPageCopy.fpsLabel, language),
      value: supportInfo.fpsIdentifier,
      qr: supportInfo.fpsQrImage,
      placeholder: getText(contactPageCopy.qrPlaceholder, language),
      isPrimary: true
    },
    {
      key: "payme",
      group: getText(contactPageCopy.localSupport, language),
      title: "PayMe",
      qr: supportInfo.paymeQrImage,
      placeholder: getText(contactPageCopy.paymePlaceholder, language)
    },
    {
      key: "paypal",
      group: getText(contactPageCopy.internationalSupport, language),
      title: "PayPal",
      href: supportInfo.paypalLink,
      qr: supportInfo.paypalQrImage,
      placeholder: getText(contactPageCopy.paypalPlaceholder, language)
    },
    {
      key: "alipay",
      group: getText(contactPageCopy.mainlandSupport, language),
      title: "Alipay",
      qr: supportInfo.alipayQrImage,
      placeholder: getText(contactPageCopy.alipayPlaceholder, language)
    },
    {
      key: "subscribe",
      group: getText(contactPageCopy.roadmapSupport, language),
      title: getText(contactPageCopy.subscribeTitle, language),
      placeholder: getText(contactPageCopy.subscribePlaceholder, language),
      actionLabel: getText(contactPageCopy.subscribeAction, language),
      isSubscribe: true
    }
  ];

  return (
    <section className="donate-panel">
      <div className="donate-panel__intro">
        <p className="donate-panel__eyebrow">Support</p>
        <h2>{getText(contactPageCopy.supportTitle, language)}</h2>
        <p>{getText(contactPageCopy.supportSubtitle, language)}</p>
        <p className="donate-panel__small">
          {getText(contactPageCopy.supportIntro, language)}
        </p>
        <div className="donate-panel__loop">
          <h3>{getText(contactPageCopy.supportLoopTitle, language)}</h3>
          <ul>
            {contactPageCopy.supportLoopItems.map(item => (
              <li key={getText(item, language)}>{getText(item, language)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="donate-panel__grid">
        {supportCards.map(card => {
          const isActiveLink = Boolean(card.href);
          const hasQr = Boolean(card.qr);

          return (
            <article
              className={
                card.isPrimary
                  ? "donate-card donate-card--primary"
                  : card.isSubscribe
                  ? "donate-card donate-card--subscribe"
                  : "donate-card"
              }
              key={card.key}
            >
              <div className="donate-card__meta">
                <span>{card.group}</span>
                {!card.value && !isActiveLink && !card.isSubscribe && (
                  <span>{getText(contactPageCopy.comingSoon, language)}</span>
                )}
              </div>
              <h3>{card.title}</h3>
              {card.value && <p className="donate-card__value">{card.value}</p>}
              {card.isSubscribe ? (
                <form
                  className="donate-card__subscribe-form"
                  onSubmit={submitSubscription}
                >
                  <label>
                    <span>
                      {getText(contactPageCopy.subscribeEmailLabel, language)}
                    </span>
                    <input
                      type="email"
                      value={subscribeEmail}
                      onChange={event => {
                        setSubscribeEmail(event.target.value);
                        if (subscribeStatus !== "idle") {
                          setSubscribeStatus("idle");
                        }
                      }}
                      placeholder={getText(
                        contactPageCopy.subscribeEmailPlaceholder,
                        language
                      )}
                      required
                    />
                  </label>
                  <button
                    className="donate-card__link donate-card__submit"
                    type="submit"
                    disabled={subscribeStatus === "submitting"}
                  >
                    {getText(
                      subscribeStatus === "submitting"
                        ? contactPageCopy.subscribeSubmitting
                        : contactPageCopy.subscribeAction,
                      language
                    )}
                  </button>
                  {subscribeStatus !== "idle" &&
                    subscribeStatus !== "submitting" && (
                      <p
                        className={
                          subscribeStatus === "error"
                            ? "donate-card__status donate-card__status--error"
                            : "donate-card__status donate-card__status--success"
                        }
                      >
                        {getText(
                          subscribeStatus === "success"
                            ? contactPageCopy.subscribeSuccess
                            : subscribeStatus === "exists"
                            ? contactPageCopy.subscribeExists
                            : subscribeStatus === "missing-api"
                            ? contactPageCopy.subscribeApiMissing
                            : contactPageCopy.subscribeError,
                          language
                        )}
                      </p>
                    )}
                </form>
              ) : hasQr ? (
                <img
                  className="donate-card__qr"
                  src={card.qr}
                  alt={`${card.title} QR`}
                />
              ) : (
                <div className="donate-card__placeholder">
                  <span>{card.placeholder}</span>
                </div>
              )}
              {isActiveLink && (
                <a
                  className="donate-card__link"
                  href={card.href}
                  rel="noreferrer"
                  target={card.isSubscribe ? undefined : "_blank"}
                >
                  {card.actionLabel || card.title}
                </a>
              )}
            </article>
          );
        })}
      </div>
      <p className="donate-panel__note">
        {getText(contactPageCopy.supportNote, language)}
      </p>
    </section>
  );
}
