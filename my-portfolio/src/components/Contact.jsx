import { useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { CONTACT_DETAILS, SOCIAL_LINKS } from '../data/portfolio';
import './Contact.css';

const MESSAGE_LIMIT = 1200;

export default function Contact() {
  const [focusedField, setFocusedField] = useState(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  return (
    <motion.section
      id="contact"
      className="section section--soft"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">Get in touch</span>
            <h2 className="section-head__title">Let’s talk</h2>
          </div>
          <p className="section-head__lede">
            Whether it’s an internship, a freelance build, or a question about
            something I’ve shipped — I read everything, and I reply fast.
          </p>
        </div>

        <div className="contact__grid">
          <motion.div
            className="contact__aside panel"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ul className="contact__details">
              {CONTACT_DETAILS.map((detail) => {
                const body = (
                  <>
                    <span className="contact__detail-icon" aria-hidden="true">
                      <i className={detail.icon} />
                    </span>
                    <span className="contact__detail-text">
                      <span className="contact__detail-label">{detail.label}</span>
                      <span className="contact__detail-value">{detail.value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.external ? '_blank' : undefined}
                        rel={detail.external ? 'noopener noreferrer' : undefined}
                        className="contact__detail"
                      >
                        {body}
                      </a>
                    ) : (
                      <span className="contact__detail">{body}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <h3 className="contact__subhead">Elsewhere</h3>
            <ul className="contact__socials">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social"
                    aria-label={`${social.label} (opens in a new tab)`}
                  >
                    <i className={social.icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="contact__actions">
              <a
                href="/Images/Stephen-Oduor-CV.pdf"
                download
                className="btn btn--accent"
              >
                <i className="fa-solid fa-download" aria-hidden="true" />
                Download CV
              </a>
              <a href="mailto:steveotieno2012005@gmail.com" className="btn btn--ghost">
                Email me
              </a>
            </div>
          </motion.div>

          <motion.div
            className="contact__form-wrap panel"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <form
              action="https://formsubmit.co/steveotieno2012005@gmail.com"
              method="POST"
              className="contact__form"
              onSubmit={() => setIsSending(true)}
            >
              <input type="hidden" name="_subject" value="Portfolio Website Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://stephenoduor-software-developer-por.vercel.app/#contact"
              />

              <div className="contact__row">
                <div className="field">
                  <label className="field__label" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Steve Oduor"
                    required
                    autoComplete="name"
                    className={`field__input${focusedField === 'name' ? ' is-focused' : ''}`}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="email">
                    Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className={`field__input${focusedField === 'email' ? ' is-focused' : ''}`}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="message">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="What are you working on?"
                  rows="6"
                  required
                  maxLength={MESSAGE_LIMIT}
                  className={`field__input field__textarea${
                    focusedField === 'message' ? ' is-focused' : ''
                  }`}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <span className="field__count">
                  {message.length} / {MESSAGE_LIMIT}
                </span>
              </div>

              <button type="submit" className="btn btn--accent" disabled={isSending}>
                <i
                  className={isSending ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-paper-plane'}
                  aria-hidden="true"
                />
                {isSending ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
