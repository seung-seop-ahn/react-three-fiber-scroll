import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { IsEnteredAtom } from "../stores";
import Dancer from "./Dancer";
import Loader from "./Loader";
import MovingDOM from "./dom/MovingDOM";

export default function MainCanvas() {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true, }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new THREE.Color(0x000000) }}
    >
      <ScrollControls
        pages={isEntered ? 8 : 0}
        damping={0.25}
      >
        <Suspense fallback={<Loader isCompleted={false} />}>
          <MovingDOM />
          <Dancer />
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
}