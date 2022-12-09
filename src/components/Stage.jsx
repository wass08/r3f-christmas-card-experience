import {
  MeshReflectorMaterial,
  RoundedBox,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export const Stage = (props) => {
  const ref = useRef();
  const scroll = useScroll();
  const tl = useRef();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(ref.current.position, { duration: 3, x: 0, y: -10, z: 0 }, 0);
    tl.current.to(ref.current.rotation, { duration: 4, x: 0, y: 0, z: 0 }, 0);
    tl.current.to(
      ref.current.position,
      { duration: 1, x: 0, y: -3.5, z: 2 },
      3
    );
  }, []);

  return (
    <group {...props} ref={ref}>
      <RoundedBox smoothness={10} radius={0.03} scale={[14, 1, 8]}>
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </RoundedBox>
    </group>
  );
};
