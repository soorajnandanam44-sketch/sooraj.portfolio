import { useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import ZebraScrollCard from "./ZebraScrollCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    name: "Zebra Technologies",
    category: "Industrial Hardware & Webflow Launch",
    tools: "Dark-Mode Design System, Webflow, Scanning UI Motifs, Paid Ads",
    image: "/images/project-zebra.jpg",
    alt: "Zebra Technologies Campaign by Sooraj Somarajan",
  },
  {
    name: "Honeywell",
    category: "Print Without Limits Campaign & Webflow Launch",
    tools: "Webflow Landing Page, Campaign Creative, Hardware Mockups, Digital Ads",
    image: "/images/project-honeywell.png",
    alt: "Honeywell Print Without Limits Campaign by Sooraj Somarajan",
  },
  {
    name: "Epson",
    category: "AI-Generated Fashion Film Commercial",
    tools: "Google Veo, Kling AI, Commercial Film Direction, Premiere Pro, Motion Graphics",
    image: "/images/project-epson.jpg",
    alt: "Epson AI-Generated Fashion Film Commercial by Sooraj Somarajan",
    video: "/epson-ai-video-web.mp4",
    fullVideo: "/epson-ai-video-web.mp4",
    videoBadge: "AI Film Preview",
    link: "https://www.playbook.com/s/macstorage/657UoymoNFL7LEkmJpWojWC1?assetToken=RjVYxKqek9Anv3CW6pkyuT6G",
  },
  {
    name: "Epson C8000",
    category: "3D Modeling & Animation in Blender",
    tools: "Blender 3D, Hard-Surface Modeling, Studio Lighting, Product Animation, Texturing",
    image: "/images/project-blender-c8000.png",
    alt: "3D Modeling and Animation in Blender — Epson C8000 by Sooraj Somarajan",
    video: "/c8000u-web.mp4",
    fullVideo: "/c8000u-web.mp4",
    videoBadge: "3D Blender Animation",
    link: "https://www.playbook.com/s/macstorage/AAKgAAByJUrAN91dNWTw7aJH?assetToken=fEAqdcVwg8hMYYG3RWyR8bin",
  },
];

const Work = () => {
  const [containerAnim, setContainerAnim] = useState<
    gsap.core.Animation | undefined
  >();

  useGSAP(() => {
    if (window.innerWidth <= 1024) return;

    const workSection = document.querySelector(".work-section") as HTMLElement;
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    if (!workSection || !workFlex) return;

    function getScrollAmount() {
      const boxes = document.querySelectorAll<HTMLElement>(".work-box");
      if (!boxes.length) return 0;
      const totalWidth = Array.from(boxes).reduce(
        (acc, el) => acc + el.offsetWidth,
        0
      );
      const containerLeft =
        document.querySelector(".work-container")?.getBoundingClientRect().left ||
        0;
      return Math.max(0, totalWidth - (window.innerWidth - containerLeft) + 160);
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    // Capture the horizontal tween instance for containerAnimation
    const tween = timeline.getChildren()[0] || timeline;
    setContainerAnim(tween as gsap.core.Animation);

    const handleImgLoad = () => {
      ScrollTrigger.refresh();
      import("gsap-trial/ScrollSmoother").then(({ ScrollSmoother }) => {
        ScrollSmoother.get()?.refresh();
      });
    };

    const imgs = workSection.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", handleImgLoad, { once: true });
      }
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
      imgs.forEach((img) => img.removeEventListener("load", handleImgLoad));
      setContainerAnim(undefined);
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Campaigns</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              {index === 0 ? (
                <ZebraScrollCard containerAnim={containerAnim} />
              ) : (
                <WorkImage
                  image={project.image}
                  alt={project.alt}
                  video={project.video}
                  fullVideo={project.fullVideo}
                  videoBadge={project.videoBadge}
                  link={project.link}
                  name={project.name}
                  category={project.category}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
