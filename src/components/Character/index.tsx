import { useState, useEffect } from "react";
import Scene from "./Scene";

const CharacterModel = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Lazy-load Three.js scene & encrypted 3D model only when landing section is approaching/in viewport
    const landing = document.getElementById("landingDiv");
    if (!landing) {
      setShouldRender(true);
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setShouldRender(true);
              observer.disconnect();
              break;
            }
          }
        },
        { rootMargin: "300px" }
      );
      observer.observe(landing);
      return () => observer.disconnect();
    } else {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;
  return <Scene />;
};

export default CharacterModel;
