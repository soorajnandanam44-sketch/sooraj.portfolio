import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let isHovered = false;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        if (isHovered) {
          requestAnimationFrame(updatePosition);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      const onMouseEnter = () => {
        isHovered = true;
        requestAnimationFrame(updatePosition);
      };

      const onMouseLeave = () => {
        isHovered = false;
        mouseX = rect.width / 2;
        mouseY = rect.height / 2;
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseenter", onMouseEnter);
      elem.addEventListener("mouseleave", onMouseLeave);

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseenter", onMouseEnter);
        elem.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="mailto:soorajnandanam44@gmail.com"
            title="Email Sooraj"
            target="_blank"
          >
            <FaEnvelope />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com"
            title="LinkedIn Profile"
            target="_blank"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://github.com"
            title="GitHub"
            target="_blank"
          >
            <FaGithub />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
