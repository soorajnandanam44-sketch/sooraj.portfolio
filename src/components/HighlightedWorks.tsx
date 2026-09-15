import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MdPlayArrow,
  MdClose,
  MdOpenInNew,
  MdFilterList,
  MdAccessTime,
} from "react-icons/md";
import {
  highlightedWorks,
  HighlightedWork,
} from "../data/highlightedWorksData";
import "./styles/HighlightedWorks.css";

type FilterType = "all" | "3d" | "2d" | "commercial";

const HighlightedWorks = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeModalWork, setActiveModalWork] = useState<HighlightedWork | null>(
    null
  );

  const filteredWorks = highlightedWorks.filter((work) => {
    if (activeFilter === "all") return true;
    return work.type === activeFilter;
  });

  const filterCounts = {
    all: highlightedWorks.length,
    "3d": highlightedWorks.filter((w) => w.type === "3d").length,
    "2d": highlightedWorks.filter((w) => w.type === "2d").length,
    commercial: highlightedWorks.filter((w) => w.type === "commercial").length,
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalWork(null);
      }
    };
    if (activeModalWork) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeModalWork]);

  return (
    <section className="hw-section" id="highlighted-works">
      <div className="hw-container section-container">
        {/* Section Header */}
        <div className="hw-header">
          <div className="hw-badge-top">
            <span className="hw-dot"></span>
            <span>2D &amp; 3D Video Showcase</span>
          </div>
          <h2>
            Highlighted <span>Works</span>
          </h2>
          <p className="hw-subtitle">
            Curated commercial motion graphics, 3D hard-surface product animations,
            infographic presentations, and brand explainers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="hw-filter-bar">
          <div className="hw-filter-icon">
            <MdFilterList />
          </div>
          <button
            className={`hw-filter-pill ${activeFilter === "all" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Works <span className="hw-pill-count">{filterCounts.all}</span>
          </button>
          <button
            className={`hw-filter-pill ${activeFilter === "3d" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("3d")}
          >
            3D &amp; Product <span className="hw-pill-count">{filterCounts["3d"]}</span>
          </button>
          <button
            className={`hw-filter-pill ${activeFilter === "2d" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("2d")}
          >
            2D &amp; Motion <span className="hw-pill-count">{filterCounts["2d"]}</span>
          </button>
          <button
            className={`hw-filter-pill ${activeFilter === "commercial" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("commercial")}
          >
            Brand &amp; Commercial{" "}
            <span className="hw-pill-count">{filterCounts.commercial}</span>
          </button>
        </div>

        {/* Works Grid */}
        <div className="hw-grid">
          {filteredWorks.map((work, idx) => (
            <WorkCard
              key={work.id}
              work={work}
              index={idx + 1}
              onOpenModal={() => setActiveModalWork(work)}
            />
          ))}
        </div>
      </div>

      {/* Cinema Lightbox Modal */}
      {activeModalWork &&
        createPortal(
          <div
            className="hw-modal-backdrop"
            onClick={() => setActiveModalWork(null)}
          >
            <div
              className="hw-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="hw-modal-header">
                <div className="hw-modal-title">
                  <div className="hw-modal-meta">
                    <span className="hw-modal-badge">{activeModalWork.badge}</span>
                    <span className="hw-modal-duration">
                      <MdAccessTime /> {activeModalWork.duration}
                    </span>
                  </div>
                  <h3>{activeModalWork.title}</h3>
                  <p>{activeModalWork.category}</p>
                </div>
                <button
                  className="hw-modal-close"
                  onClick={() => setActiveModalWork(null)}
                  aria-label="Close modal"
                >
                  <MdClose />
                </button>
              </div>

              {/* Video Player */}
              <div className="hw-modal-player-wrapper">
                <video
                  src={activeModalWork.videoUrl}
                  poster={activeModalWork.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  className="hw-modal-video"
                />
              </div>

              {/* Modal Details Footer */}
              <div className="hw-modal-body">
                <div className="hw-modal-desc-block">
                  <h4>About This Project</h4>
                  <p>{activeModalWork.description}</p>
                </div>
                <div className="hw-modal-tools-block">
                  <h4>Tools &amp; Techniques</h4>
                  <p>{activeModalWork.tools}</p>
                </div>
                <div className="hw-modal-actions">
                  <a
                    href={activeModalWork.playbookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hw-modal-playbook-btn"
                  >
                    <MdOpenInNew />
                    <span>View Asset on Playbook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

interface WorkCardProps {
  work: HighlightedWork;
  index: number;
  onOpenModal: () => void;
}

const WorkCard = ({ work, index, onOpenModal }: WorkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lazy-load video stream via IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;
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
        { rootMargin: "300px" }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      setIsInView(true);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      ref={containerRef}
      className="hw-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenModal}
      data-cursor="disable"
    >
      {/* Media Box */}
      <div className="hw-card-media">
        <img
          src={work.thumbnailUrl}
          alt={work.title}
          loading="lazy"
          decoding="async"
          className="hw-card-poster"
        />

        <video
          ref={videoRef}
          src={isInView ? work.videoUrl : undefined}
          poster={work.thumbnailUrl}
          muted
          playsInline
          loop
          preload="none"
          className={`hw-card-video ${isHovered ? "is-playing" : ""}`}
        />

        {/* Floating Badges */}
        <div className="hw-card-badges">
          <span className="hw-card-type-badge">{work.badge}</span>
          <span className="hw-card-time-badge">
            <MdAccessTime /> {work.duration}
          </span>
        </div>

        {/* Play Overlay */}
        <div className={`hw-card-play-overlay ${isHovered ? "is-hovered" : ""}`}>
          <div className="hw-card-play-btn">
            <MdPlayArrow />
          </div>
          <span className="hw-card-play-text">Play Video</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="hw-card-info">
        <div className="hw-card-header-row">
          <span className="hw-card-index">0{index}</span>
          <div className="hw-card-titles">
            <h3>{work.title}</h3>
            <p className="hw-card-category">{work.category}</p>
          </div>
        </div>

        <p className="hw-card-desc">{work.description}</p>

        <div className="hw-card-footer">
          <div className="hw-card-tools">
            <span className="hw-tools-label">Tools:</span>
            <span className="hw-tools-text">{work.tools}</span>
          </div>
          <button
            className="hw-card-watch-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            aria-label={`Watch ${work.title}`}
          >
            <span>Watch</span>
            <MdPlayArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightedWorks;
