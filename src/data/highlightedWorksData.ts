export interface HighlightedWork {
  id: string;
  title: string;
  client: string;
  category: string;
  type: "3d" | "2d" | "commercial";
  typeLabel: string;
  duration: string;
  tools: string;
  description: string;
  playbookUrl: string;
  thumbnailUrl: string;
  videoUrl: string;
  badge: string;
  aspectRatio?: string;
}

export const highlightedWorks: HighlightedWork[] = [
  {
    id: "reel-3d-product",
    title: "3D Product Animation Showreel",
    client: "Creative Showreel",
    category: "3D Motion Design & Commercial Product Reel",
    type: "3d",
    typeLabel: "3D & Product",
    duration: "1:15",
    tools: "Blender 3D, Cinema 4D, Cycles / Octane, Hard-Surface Modeling, Studio Lighting, After Effects",
    description:
      "A comprehensive combined reel showcasing high-end 3D product animations, dynamic studio lighting, hard-surface industrial modeling, and commercial product demos with photorealistic shading.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/v5o557yrHNYKFSbEcqKWSXV1?assetToken=Z9pDifP7BXiA4rvQ6qeyTCEm",
    thumbnailUrl: "/images/project-reel-3d.jpg",
    videoUrl: "/videos/reel-3d-product.mp4",
    badge: "3D Product Showreel",
    aspectRatio: "16 / 9",
  },
  {
    id: "tavus-ai-avatars",
    title: "Tavus AI Avatars",
    client: "Tavus",
    category: "3D Animation & Generative AI Commercial",
    type: "3d",
    typeLabel: "3D & Product",
    duration: "1:33",
    tools: "Blender 3D, Generative AI Video, Commercial Direction, Premiere Pro, Motion Graphics",
    description:
      "High-concept 3D technology demo and promotional commercial showcasing Tavus's AI avatar replication engine, digital human simulation, and interactive video generation.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/txK4VhLMX7g5B7CpM1uK3V9c?assetToken=6J2JMJn6KVU1FDs9wWxPxmuP",
    thumbnailUrl: "/images/project-tavus-ai.jpg",
    videoUrl: "/videos/tavus-ai-avatars.mp4",
    badge: "3D AI Commercial",
    aspectRatio: "16 / 9",
  },
  {
    id: "nestle-motion",
    title: "Nestle Commercial Motion",
    client: "Nestle",
    category: "Fast-Paced Commercial Motion & Sound Design",
    type: "commercial",
    typeLabel: "Brand & Commercial",
    duration: "0:16",
    tools: "Motion Design, Fast-Paced Editing, Sound Design, Premiere Pro, After Effects",
    description:
      "Focused on high-energy visuals and rhythmic music, designed specifically to capture the audience's attention in brief, high-impact moments as a core element for the Nestle digital campaign.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/xWwoCnQA7PLfvsk6nceexhqP?assetToken=cucgyqr7SMfYf4mxAZEetDzR",
    thumbnailUrl: "/images/project-nestle.jpg",
    videoUrl: "/videos/nestle-motion.mp4",
    badge: "Commercial Teaser",
    aspectRatio: "16 / 9",
  },
  {
    id: "subify-explainer",
    title: "Subify App Explainer",
    client: "Subify (Sabi)",
    category: "Hybrid 3D / 2D Brand & Product Explainer",
    type: "2d",
    typeLabel: "2D & Motion Graphics",
    duration: "1:25",
    tools: "3D Animation, 2D Motion Graphics, Frame-by-Frame, Figma, After Effects, Sound Design",
    description:
      "A content-driven and explanatory initiative developed to help users clearly understand application features and operational workflow. Built through simplicity, form, and bold color to reinforce brand recognition.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/R1CDtjFBi7EbCHPJXsduirhx?assetToken=UhzFTS63qnWGaCk9WDoe1Rmg",
    thumbnailUrl: "/images/project-subify.jpg",
    videoUrl: "/videos/subify-explainer.mp4",
    badge: "Hybrid 2D/3D Explainer",
    aspectRatio: "16 / 9",
  },
  {
    id: "pixel-network",
    title: "Pixel Network Campaign",
    client: "Pixel Network",
    category: "Multi-Video Social Campaign & Motion Design",
    type: "2d",
    typeLabel: "2D & Motion Graphics",
    duration: "0:19",
    tools: "After Effects, Vector Motion Graphics, Instagram Video Systems, Kinetic Typography",
    description:
      "Part of a multi-video Instagram campaign engineered to quickly and memorably convey brand identity to target audiences through repeated, engaging social exposure.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/nNaouTCFLEnKxkHvocNfR3A1?assetToken=Q3hydrZgSK8FouiTb5JkaydJ",
    thumbnailUrl: "/images/project-pixel-network.jpg",
    videoUrl: "/videos/pixel-network.mp4",
    badge: "Social Motion Campaign",
    aspectRatio: "16 / 9",
  },
  {
    id: "us-steel-infographic",
    title: "US Steel Infographic Presentation",
    client: "US Steel",
    category: "Infographic & Corporate Motion Graphics",
    type: "2d",
    typeLabel: "2D & Motion Graphics",
    duration: "0:51",
    tools: "After Effects, Data Visualization, Infographic Motion Design, Illustrator",
    description:
      "An infographic-based motion graphic presentation designed to communicate key organizational capabilities, strategic data points, and operational insights during executive meetings.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/HkeKLZKaeShKk2AYbHe3hVwB?assetToken=inzrNavbkGrTb4PAMPvkq2U2",
    thumbnailUrl: "/images/project-us-steel.jpg",
    videoUrl: "/videos/us-steel-infographic.mp4",
    badge: "Infographic Motion",
    aspectRatio: "16 / 9",
  },
  {
    id: "folad-lifecycle",
    title: "Folad Circular Lifecycle",
    client: "Folad",
    category: "Industrial Lifecycle & Continuous Motion Graphic",
    type: "2d",
    typeLabel: "2D & Motion Graphics",
    duration: "0:50",
    tools: "2D Motion Graphics, Storyboarding, Vector Illustration, After Effects",
    description:
      "Visualizes the industrial product life cycle as a continuous, looping journey from consumption to production and recycling, crafted in a fluid motion graphic narrative.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/LVTT4ubcoJXgo8QavvWvFhGL?assetToken=7q8iMjutFBM7yu6NDsNf1b99",
    thumbnailUrl: "/images/project-folad.jpg",
    videoUrl: "/videos/folad-lifecycle.mp4",
    badge: "Industrial Motion Graphic",
    aspectRatio: "16 / 9",
  },
  {
    id: "bauer-vapor-skate",
    title: "Bauer Vapor Inline Skate",
    client: "Bauer",
    category: "3D Hard-Surface Modeling & Product Animation",
    type: "3d",
    typeLabel: "3D & Product",
    duration: "0:30",
    tools: "Blender 3D, Hard-Surface Modeling, Studio Arena Lighting, Product Animation, Shading",
    description:
      "Complete photorealistic 3D hard-surface modeling, multi-layer shading, and dynamic product animation of the Bauer Vapor roller skate rendered in an authentic indoor arena atmosphere.",
    playbookUrl:
      "https://www.playbook.com/s/macstorage/vZhygRYsf2ip8xfv5QnpKUKp?assetToken=PQL7EUXa3esyMCS7GdASv924",
    thumbnailUrl: "/images/project-bauer-skate.png",
    videoUrl: "/skate-3d-animation-web.mp4",
    badge: "3D Blender Animation",
    aspectRatio: "16 / 9",
  },
];
