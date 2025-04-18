import { useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";

function ChairModel({ position, onClick, nodes }) {
  const [rotation, setRotation] = useState(0); // State to track rotation

  const chairTexture = useTexture("./textures/bakedChairTexture.png");
  chairTexture.flipY = false;

  const handleClick = (e) => {
    e.stopPropagation();
    // Rotate by 90 degrees (in radians) each click
    setRotation((prev) => prev + Math.PI / 2);
    if (onClick) onClick(e);
  };

  return (
    <group>
      {nodes.BeachChair.children.map((item, index) => (
        <mesh
          key={index}
          position={position}
          onClick={handleClick}
          geometry={item.geometry}
          rotation={[
            item.rotation.x,
            item.rotation.y + rotation,
            item.rotation.z,
          ]}
          scale={0.5}
          castShadow
        >
          <meshBasicMaterial map={chairTexture} />
        </mesh>
      ))}
    </group>
  );
}

export default function Chairs({ chairs, removeChair, selectedItem }) {
  const { nodes } = useGLTF("./models/beachChair.glb");

  return chairs.map(({ position, id }) => (
    <ChairModel
      key={id}
      nodes={nodes}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey) {
          removeChair(id);
        } else if (selectedItem == "eraser") {
          removeChair(id);
        }
      }}
    />
  ));
}

useGLTF.preload("./models/beachChair.glb");
useTexture.preload("./textures/bakedChairTexture.png");