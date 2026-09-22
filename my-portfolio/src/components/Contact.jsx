import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="row">
          {/* Left Column - Slides in from the left */}
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="sub-title">Contact Me</h2>
            <p>
              <i className="fa-solid fa-envelope" aria-hidden="true"></i>{" "}
              <a href="mailto:steveotieno2012005@gmail.com">
                steveotieno2012005@gmail.com
              </a>
            </p>
            <p>
              <i className="fa-solid fa-phone" aria-hidden="true"></i>{" "}
              <a href="tel:+254769493697">+254 769 493 697</a>
            </p>
            <p>
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>{" "}
              <a
                href="https://wa.me/254750779480"
                target="_blank"
                rel="noopener noreferrer"
              >
                +254 750 779 480
              </a>
            </p>
            <p>
              <i className="fa-solid fa-location-dot" aria-hidden="true"></i>{" "}
              Nairobi, Kenya
            </p>

            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/stephen-oduor-8817992b9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
              </a>
              <a
                href="https://github.com/Pinyotimo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github" aria-hidden="true"></i>
              </a>
              <a
                href="https://twitter.com/Pinyotimoburu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
              >
                <i className="fa-brands fa-twitter" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.facebook.com/Steve%20Otieno"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.instagram.com/steveotieno858/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.tiktok.com/@otieno_oduor1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.reddit.com/user/Pinyotimoburu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reddit"
              >
                <i className="fa-brands fa-reddit" aria-hidden="true"></i>
              </a>
            </div>

            <a
              href="/Images/Stephen-Oduor-CV.pdf"
              download
              className="btn btn2"
            >
              <i className="fa-solid fa-download" aria-hidden="true"></i>{" "}
              Download CV
            </a>
          </motion.div>

          {/* Right Column - Slides in from the right */}
          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <form
              action="https://formsubmit.co/steveotieno2012005@gmail.com"
              method="POST"
            >
              <input
                type="hidden"
                name="_subject"
                value="Portfolio Website Message"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://stephen-oduor-portfolio-website.vercel.app/thanks"
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                required
              ></textarea>
              <button type="submit" className="btn btn2">
                <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>{" "}
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
