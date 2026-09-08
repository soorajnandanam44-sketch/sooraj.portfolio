import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdPlayArrow, MdClose, MdOpenInNew } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  fullVideo?: string;
  link?: string;
  name?: string;
  category?: string;
  videoBadge?: string;
}

const WorkImage = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Lazy-load video using IntersectionObserver so offscreen videos don't download on initial load
  useEffect(() => {
    if (!props.video || !containerRef.current) return;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.disconnect();
              break;
            }
          }
        },
        { rootMargin: "400px" }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, [props.video]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (props.video && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (props.video && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (props.video) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <>
      <div className="work-image" ref={containerRef}>
        <a
          className={`work-image-in ${props.video ? "has-video" : ""}`}
          href={props.link || "#"}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          target={props.link ? "_blank" : undefined}
          rel={props.link ? "noopener noreferrer" : undefined}
          data-cursor={"disable"}
        >
          {props.link && !props.video && (
            <div className="work-link">
              <MdArrowOutward />
            </div>
          )}

          {props.video && (
            <div className="work-video-badge">
              <span className="work-video-dot"></span>
              <span>{props.videoBadge || "Video Preview"}</span>
            </div>
          )}

          <img
            src={props.image}
            alt={props.alt}
            loading="lazy"
            decoding="async"
          />

          {props.video && (
            <>
              <video
                ref={videoRef}
                src={isInView ? props.video : undefined}
                poster={props.image}
                muted
                playsInline
                loop
                preload="none"
                className={`work-card-video ${isHovered ? "is-active" : ""}`}
              />
              <div className={`work-play-overlay ${isHovered ? "is-hidden" : ""}`}>
                <div className="work-play-icon">
                  <MdPlayArrow />
                </div>
                <span className="work-play-text">Click to Play Video</span>
              </div>
            </>
          )}
        </a>
      </div>

      {/* Full Video Modal via Portal to document.body */}
      {isModalOpen &&
        props.video &&
        createPortal(
          <div
            className="work-modal-backdrop"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="work-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="work-modal-header">
                <div className="work-modal-title">
                  <h4>{props.name || "Project"} — {props.category || "Video Showcase"}</h4>
                  <p>{props.alt || ""}</p>
                </div>
                <button
                  className="work-modal-close"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <MdClose />
                </button>
              </div>

              <div className="work-modal-video-wrapper">
                <video
                  ref={modalVideoRef}
                  src={props.fullVideo || props.video}
                  controls
                  autoPlay
                  playsInline
                  className="work-modal-player"
                />
              </div>

              <div className="work-modal-footer">
                <span className="work-modal-tag">
                  ✦ {props.videoBadge === "3D Blender Animation"
                    ? "3D Modeling, Studio Lighting & Animation in Blender • Directed by Sooraj Somarajan"
                    : "AI-Generated Commercial Film • Directed by Sooraj Somarajan"}
                </span>
                {props.link && (
                  <a
                    href={props.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-modal-btn"
                  >
                    <MdOpenInNew />
                    <span>View on Playbook</span>
                  </a>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default WorkImage;
