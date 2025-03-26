import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import Loader from "./Loader";

export default function Dancer() {
  const dancerRef = useRef();
  const isEntered = useRecoilValue(IsEnteredAtom);

  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();

  useFrame(() => {
    console.log(scroll.offset);
  });

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"].play();
  }, [actions, isEntered]);

  if (!isEntered) return <Loader isCompleted={true} />;

  return (
    <>
      <ambientLight intensity={2} />
      <primitive
        ref={dancerRef}
        object={scene}
        scale={0.05}
      />
    </>
  );
}