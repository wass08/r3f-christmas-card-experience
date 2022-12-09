import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import "./App.css";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";

function App() {
  const { focusDistance, focalLength, bokehScale } = useControls(
    {
      focusDistance: {
        min: 0,
        max: 0.2,
        value: 0.02,
      },
      focalLength: {
        min: 0,
        max: 1,
        value: 0.06,
      },
      bokehScale: {
        min: 0,
        max: 10,
        value: 2,
      },
    },
    {}
  );
  return (
    <>
      <Cursor />
      <Interface />
      <Canvas
        shadows
        camera={{ position: [0, 2, 20], fov: 42 }}
        gl={{ alpha: false }}
      >
        <fog attach="fog" args={["#679652", 30, 50]} />
        <color attach="background" args={["#222222"]} />
        <Experience />
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur luminanceThreshold={1} />
          <DepthOfField
            focusDistance={focusDistance}
            focalLength={focalLength}
            bokehScale={bokehScale}
            height={480}
          />
          <Vignette opacity={0.3} />
        </EffectComposer>
      </Canvas>
      <Leva collapsed hidden />
    </>
  );
}

export default App;
