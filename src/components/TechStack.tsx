import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const toolList = [
  { name: "Figma", badge: "Fg", bg: "#1E1E1E", color: "#F24E1E" },
  { name: "Webflow", badge: "Wf", bg: "#146EF5", color: "#FFFFFF" },
  { name: "Blender 3D", badge: "3D", bg: "#EA7600", color: "#FFFFFF" },
  { name: "After Effects", badge: "Ae", bg: "#00005B", color: "#9999FF" },
  { name: "Premiere Pro", badge: "Pr", bg: "#00005B", color: "#EA77FF" },
  { name: "DaVinci", badge: "DR", bg: "#1A1A24", color: "#FF4500" },
  { name: "Photoshop", badge: "Ps", bg: "#001E36", color: "#31A8FF" },
  { name: "Illustrator", badge: "Ai", bg: "#330000", color: "#FF9A00" },
  { name: "Google Veo", badge: "Veo", bg: "#1F1B2E", color: "#A142F4" },
  { name: "Kling AI", badge: "Kling", bg: "#0B192C", color: "#00FFCC" },
  { name: "Meta Ads", badge: "Meta", bg: "#0064E0", color: "#FFFFFF" },
  { name: "HubSpot", badge: "HubSpot", bg: "#FF7A59", color: "#FFFFFF" },
];

function createToolTexture(tool: {
  name: string;
  badge: string;
  bg: string;
  color: string;
}): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 320);
  grad.addColorStop(0, tool.bg);
  grad.addColorStop(1, "#07070d");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 14;
  ctx.strokeRect(16, 16, 480, 480);

  ctx.fillStyle = tool.color;
  ctx.font =
    "bold 110px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(tool.badge, 256, 210);

  ctx.fillStyle = "#ffffff";
  ctx.font =
    "600 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  ctx.fillText(tool.name, 256, 350);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elem = document.querySelector(".techstack");
      if (elem) {
        const rect = elem.getBoundingClientRect();
        setIsActive(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Refresh ScrollTrigger and ScrollSmoother when 3D component is mounted to prevent layout desync
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
      import("gsap-trial/ScrollSmoother").then(({ ScrollSmoother }) => {
        ScrollSmoother.get()?.refresh();
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    if (typeof document === "undefined") return [];
    const generatedTextures = toolList.map(createToolTexture);
    return generatedTextures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.2,
          metalness: 0.5,
          roughness: 0.8,
          clearcoat: 0.2,
        })
    );
  }, []);

  const defaultMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#7f40ff" }),
    []
  );

  return (
    <div className="techstack" id="techstack">
      <h2> Tools &amp; Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={
                materials.length > 0
                  ? materials[Math.floor(Math.random() * materials.length)]
                  : defaultMaterial
              }
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
