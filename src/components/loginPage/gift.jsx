import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Gift = (props) => {
  const giftRef = useRef();
  let rotationSpeed = 0.015;
  const { onHover } = props;
  const { nodes, materials } = useGLTF("/gift.glb");

  useFrame(() => {
    if (giftRef.current) {
      if (props.isHovered) {
        rotationSpeed = Math.max(rotationSpeed - 0.001, 0.0015);
      } else {
        rotationSpeed = Math.min(rotationSpeed + 0.001, 0.015);
      }
      giftRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group
      ref={giftRef}
      {...props}
      dispose={null}
      scale={10}
      rotation={[0, 0, 0]}
      onPointerOver={() => onHover(true)}
      onPointerOut={() => onHover(false)}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.xmas_red}
        position={[-0.049, -0.811, 0]}
        scale={0.344}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials["Material.027"]}
        position={[-0.049, -0.811, 0]}
        scale={0.356}
      />
    </group>
  );
};

useGLTF.preload("/gift.glb");

export default Gift;
