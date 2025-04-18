import { useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";

function UmbrellaModel({ position, onClick }) {
  const { nodes } = useGLTF("./models/umbrella.glb");
  const [rotation, setRotation] = useState(0); // State to track rotation

  const chairTexture = useTexture("./textures/bakedUmbrellaTexture.png");
  chairTexture.flipY = false;

  const handleClick = (e) => {
    e.stopPropagation();
    // Rotate by 90 degrees (in radians) each click
    setRotation((prev) => prev + Math.PI / 2);
    if (onClick) onClick(e);
  };

  return (
    <group>
      {nodes.umbrella.children.map((item, index) => (
        <mesh
          key={index}
          position={position}
          onClick={handleClick}
          geometry={item.geometry}
          rotation={[
            item.rotation.x,
            item.rotation.y + rotation,
            item.rotation.z + 0.4,
          ]}
          scale={1}
          castShadow
        >
          <meshBasicMaterial map={chairTexture} />
        </mesh>
      ))}
    </group>
  );
}

export default function Umbrellas({ umbrellas, removeUmbrella }) {
  return umbrellas.map(({ position, id }) => (
    <UmbrellaModel
      key={id}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey) {
            removeUmbrella(id);
        }
      }}
    />
  ));
}
