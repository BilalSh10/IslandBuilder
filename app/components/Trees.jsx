import { useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";

function TreesModel({ position, onClick, nodes }) {
  const [rotation, setRotation] = useState(0); // State to track rotation

  const treeTexture = useTexture("./textures/bakedTreeTexture.png");
  treeTexture.flipY = false;

  const handleClick = (e) => {
    e.stopPropagation();
    // Rotate by 90 degrees (in radians) each click
    setRotation((prev) => prev + Math.PI / 2);
    if (onClick) onClick(e);
  };

  return (
    <group>
      {nodes.beachTree.children.map((item, index) => (
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
          scale={[0.5, 1, 0.5]}
        >
          <meshBasicMaterial map={treeTexture} />
        </mesh>
      ))}
    </group>
  );
}

export default function Trees({ trees, removeTree, selectedItem }) {
  const { nodes } = useGLTF("./models/tree.glb");

  return trees.map(({ position, id }) => (
    <TreesModel
      key={id}
      nodes={nodes}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey) {
          removeTree(id);
        } else if (selectedItem == "eraser") {
          removeTree(id);
        }
      }}
    />
  ));
}

useGLTF.preload("./models/tree.glb");
useTexture.preload("./textures/bakedTreeTexture.png");
