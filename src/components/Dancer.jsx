import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Dancer() {
  const dancerRef = useRef();

  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);

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