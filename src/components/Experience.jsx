import { ScrollControls, Stars } from "@react-three/drei";
import { useMemo } from "react";
import { randFloat } from "three/src/math/MathUtils";
import { ChristmasTree } from "./ChristmasTree";
import { Gift } from "./Gift";
import { MerryChristmasText } from "./MerryChristmasText";
import { Santa } from "./Santa";
import { Stage } from "./Stage";

const GIFTS_NBR = 120;
const GIFTS_DISPERSION = 16;
const GIFTS_DEPTH = 2;

const Gifts = (props) => {
  const randomGifts = useMemo(() => {
    const gifts = [];
    for (let i = 0; i < GIFTS_NBR; i++) {
      const scale = randFloat(0.4, 1.2);
      gifts.push({
        scale: [scale, scale, scale],
        position: [
          randFloat(-GIFTS_DISPERSION, GIFTS_DISPERSION),
          randFloat(-GIFTS_DISPERSION, GIFTS_DISPERSION),
          randFloat(-GIFTS_DISPERSION - GIFTS_DEPTH, -GIFTS_DEPTH),
        ],
        rotation: [
          randFloat(-Math.PI, Math.PI),
          randFloat(-Math.PI, Math.PI),
          randFloat(-Math.PI, Math.PI),
        ],
      });
    }
    return (
      <>
        {gifts.map((gift, index) => (
          <Gift
            key={index}
            position={gift.position}
            scale={gift.scale}
            rotation={gift.rotation}
          />
        ))}
      </>
    );
  }, []);

  return <group {...props}>{randomGifts}</group>;
};

export const Experience = () => {
  return (
    <>
      {/* <OrbitControls
        enableZoom={false}
        autoRotateSpeed={-0.1}
        zoomSpeed={0.25}
        minZoom={40}
        maxZoom={140}
        enablePan={false}
        dampingFactor={0.05}
      /> */}
      <ambientLight intensity={0.1} />
      <directionalLight intensity={1.4} position={[5, 4, 3]} />
      <directionalLight
        intensity={1.2}
        color={"#bd8adf"}
        position={[-5, 3, 3]}
      />
      <directionalLight
        intensity={0.8}
        color={"#FF0000"}
        position={[-5, 3, -5]}
      />
      <ScrollControls pages={2}>
        <MerryChristmasText />
        <ChristmasTree position={[0, -3, 0]} />
        <group position={[0, -3, 0]}>
          <Gifts />
        </group>
        <Santa animationIndex={0} position={[-2, -3, 3]} scale={[2, 2, 2]} />
        <Santa animationIndex={1} position={[2, -3, 3]} scale={[2, 2, 2]} />
        <Stage position={[0, 0, -20]} rotation={[Math.PI / 2, 0, 0]} />
      </ScrollControls>
      <Stars />
      {/* <Cloud
        opacity={0.2}
        speed={0.3} // Rotation speed
        width={14} // Width of the full cloud
        depth={1.5} // Z-dir depth
        segments={20} // Number of particles
        color={"#679652"}
      /> */}
      {/* <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#151515"
            metalness={0.6}
            roughness={1}
          />
        </mesh> */}
    </>
  );
};
