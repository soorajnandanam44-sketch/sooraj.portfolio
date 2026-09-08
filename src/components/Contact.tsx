import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:soorajnandanam44@gmail.com" data-cursor="disable">
                soorajnandanam44@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href="tel:+14379897592" data-cursor="disable">
                (437) 989-7592
              </a>
            </p>
            <h4>Location</h4>
            <p>Toronto, Ontario, Canada</p>
          </div>
          <div className="contact-box">
            <h4>Connect</h4>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Resume <MdArrowOutward />
            </a>
            <a
              href="mailto:soorajnandanam44@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Senior Marketing Designer <br /> <span>Sooraj Somarajan</span>
            </h2>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
