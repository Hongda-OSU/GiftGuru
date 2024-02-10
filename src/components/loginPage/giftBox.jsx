import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Model(props) {
  const boxRef = useRef();
  const { nodes, materials } = useGLTF("/giftbox.glb");

  useFrame(() => {
    boxRef.current.rotation.y += 0.001;
  });
  
  return (
    <group ref={boxRef} {...props} dispose={null}>
      <group position={[0, 0, 0]} scale={3} rotation={[0, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.xmas_red}
          position={[0.016, -2.885, 0]}
          scale={1.026}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.xmas_red}
          position={[0.016, -1.956, 0]}
          scale={[1.09, 0.268, 1.09]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials["Material.027"]}
          position={[0.016, -2.885, 0]}
          scale={1.06}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials["Material.027"]}
          position={[0.016, -1.956, 0]}
          scale={[1.131, 0.278, 1.131]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.NurbsCurve.geometry}
          material={materials["Material.027"]}
          position={[-0.008, -2.732, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.885}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/giftbox.glb");
