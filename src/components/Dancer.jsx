import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import Loader from "./Loader";

let timeline;
export default function Dancer() {
  const three = useThree();
  const dancerRef = useRef();
  const isEntered = useRecoilValue(IsEnteredAtom);

  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();

  useFrame(() => {
    console.log(scroll.offset);

    if (!isEntered) return;
    timeline.seek(scroll.offset * timeline.duration());
  });

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"].play();
  }, [actions, isEntered]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    gsap.fromTo(three.camera.position, {
      x: -5,
      y: 5,
      z: 5,
    }, {
      duration: 2.5,
      x: 0,
      y: 6,
      z: 12
    })
    gsap.fromTo(three.camera.rotation, {
      z: Math.PI
    }, {
      duration: 2.5,
      z: 0,
    })
  }, [isEntered, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    timeline = gsap.timeline();
    timeline.from(dancerRef.current.rotation, {
      duration: 4,
      y: -4 * Math.PI,
    },
      0.5
    );
  }, [isEntered]);

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