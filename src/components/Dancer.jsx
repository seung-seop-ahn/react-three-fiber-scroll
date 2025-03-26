import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Dancer() {
  const dancerRef = useRef();

  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();

  useFrame(() => {
    console.log(scroll.offset);
  });

  useEffect(() => {
    actions["wave"].play();
  }, [actions]);

  return (
    <>
      <ambientLight
        intensity={2}
      />
      <primitive
        ref={dancerRef}
        object={scene}
        scale={0.05}
      />
    </>
  );
}