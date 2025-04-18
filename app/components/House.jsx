import { useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";

function HouseModel({ position, onClick }) {
  const { nodes } = useGLTF("./models/beachHouse.glb");
  const [rotation, setRotation] = useState(0); // State to track rotation

  const treeTexture = useTexture("./textures/bakedHouseTexture.png");
  treeTexture.flipY = false;

  const handleClick = (e) => {
    e.stopPropagation();
    // Rotate by 90 degrees (in radians) each click
    setRotation((prev) => prev + Math.PI / 2);
    if (onClick) onClick(e);
  };

  return (
    <group>
      {nodes.beachHouse.children.map((item, index) => (
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
          scale={1}
        >
          <meshBasicMaterial map={treeTexture} />
        </mesh>
      ))}
    </group>
  );
}

export default function Houses({ houses, removeHouse }) {
  return houses.map(({ position, id }) => (
    <HouseModel
      key={id}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey) {
          removeHouse(id);
        }
      }}
    />
  ));
}
