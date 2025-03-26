import { Box, Circle, Points, useAnimations, useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, Suspense } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { IsEnteredAtom } from "../stores";
import Loader from "./Loader";

let timeline;

const ParticlePoints = ({ positions, texture }) => {
  if (!texture) return null;
  
  const totalPoints = positions.length / 3;
  const segmentSize = Math.floor(totalPoints / 3);
  
  const segment1 = positions.slice(0, segmentSize * 3);
  const segment2 = positions.slice(segmentSize * 3, segmentSize * 6);
  const segment3 = positions.slice(segmentSize * 6);
  
  return (
    <>
      <Points
        positions={segment1}
        size={0.5}
        color={new THREE.Color("#DC4F00")}
        sizeAttenuation
        depthWrite={false}
        alphaMap={texture}
        alphaTest={0.5}
        transparent
        opacity={1}
        material={
          new THREE.PointsMaterial({
            size: 0.5,
            color: "#DC4F00",
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: texture,
            alphaTest: 0.5,
            transparent: true,
            opacity: 1,
          })
        }
      />
      <Points
        positions={segment2}
        size={0.5}
        color={new THREE.Color("#DC4F00")}
        sizeAttenuation
        depthWrite={false}
        alphaMap={texture}
        alphaTest={0.5}
        transparent
        opacity={1}
        material={
          new THREE.PointsMaterial({
            size: 0.5,
            color: "#DC4F00",
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: texture,
            alphaTest: 0.5,
            transparent: true,
            opacity: 1,
          })
        }
      />
      <Points
        positions={segment3}
        size={0.5}
        color={new THREE.Color("#DC4F00")}
        sizeAttenuation
        depthWrite={false}
        alphaMap={texture}
        alphaTest={0.5}
        transparent
        opacity={1}
        material={
          new THREE.PointsMaterial({
            size: 0.5,
            color: "#DC4F00",
            sizeAttenuation: true,
            depthWrite: false,
            alphaMap: texture,
            alphaTest: 0.5,
            transparent: true,
            opacity: 1,
          })
        }
      />
    </>
  );
};

const Scene = () => {
  const three = useThree();
  const dancerRef = useRef();
  const isEntered = useRecoilValue(IsEnteredAtom);
  
  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);
  
  const texture = useTexture("/texture/5.png", (texture) => {
    texture.needsUpdate = true;
  });
  const { positions } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25; // z
    }

    for (let i = 0; i < positions.length; i++) {
      if (isNaN(positions[i])) {
        positions[i] = 0;
      }
    }
    
    return { positions };
  }, []);
  
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
  }, [isEntered, dancerRef, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    timeline = gsap.timeline();
    timeline.from(dancerRef.current.rotation, {
      duration: 4,
      y: -4 * Math.PI,
    },
      0.5
    ).from(dancerRef.current.position, {
      duration: 4,
      x: 3,
    },
      "<"
    ).to(three.camera.position, {
      duration: 10,
      x: 2,
      z: 8,
    },
      "<"
    ).to(three.camera.position, {
      duration: 10,
      x: 0,
      z: 6,
    }
    ).to(three.camera.position, {
      duration: 10,
      x: 0,
      z: 16,
    }
    );
  }, [isEntered, dancerRef, three.camera.position, three.camera.rotation]);

  return (
    <>
      <primitive
        ref={dancerRef}
        object={scene}
        scale={0.05}
      />
      <ambientLight intensity={1} />
      <rectAreaLight
        intensity={1}
        position={[0, 10, 0]}
      />
      <pointLight
        intensity={2}
        position={[0, 5, 0]}
        castShadow
        receiveShadow
      />
      <hemisphereLight
        intensity={0}
        position={[0, 5, 0]}
        groundColor="lime"
        color="blue"
      />
      <Box
        position={[0, 0, 0]}
        args={[100, 100, 100]}
      >
        <meshStandardMaterial
          color={"#DC4F00"}
          side={THREE.DoubleSide}
        />
      </Box>
      <Circle
        position={[0, -4.4, 0]}
        args={[8, 64]}
        rotation-x={-Math.PI / 2}
      >
        <meshStandardMaterial
          color={"#0C4F00"}
          side={THREE.DoubleSide}
        />
      </Circle>
      <Suspense fallback={null}>
        <ParticlePoints positions={positions} texture={texture} />
      </Suspense>
    </>
  );
};

export default function Dancer() {
  const isEntered = useRecoilValue(IsEnteredAtom);

  if (!isEntered) return <Loader isCompleted={true} />;

  return (
    <Suspense fallback={null}>
      <Scene />
    </Suspense>
  );
}