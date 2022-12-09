import {
  Center,
  Float,
  Text3D,
  useMatcapTexture,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// should be put elsewhere :)
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export const MerryChristmasText = (props) => {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const ref = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(ref.current.position, { duration: 1, x: -2, y: 4, z: -1 }, 0);
    tl.current.to(
      ref.current.scale,
      { duration: 1, x: 0.5, y: 0.5, z: 0.5 },
      0
    );
  }, []);

  return (
    <group {...props}>
      <Center>
        <Float>
          <Text3D
            ref={ref}
            font={"/fonts/Mountains of Christmas_Bold.json"}
            size={(dimensions.width * 1.75) / 1600}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            Merry Christmas
            <meshMatcapMaterial matcap={matcapTexture} />
          </Text3D>
        </Float>
      </Center>
    </group>
  );
};
