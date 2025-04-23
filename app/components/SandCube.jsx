import { useGLTF, useTexture } from "@react-three/drei";
import { Vector3 } from "three";

// Sand Cube Component
function SandCubeModel({ position, onClick, nodes }) {
  const sandCubeTexture = useTexture("./textures/sandTextureBaking.png");
  sandCubeTexture.flipY = false;

  const adjustedPosition = [
    Math.round(position.x * 10) / 10,
    Math.round(position.y * 10) / 10,
    Math.round(position.z * 10) / 10,
  ];

  return (
    <mesh
      position={adjustedPosition}
      onClick={onClick}
      geometry={nodes.sandCube.geometry}
      rotation={nodes.sandCube.rotation}
      scale={[1, 1, 1]}
    >
      <meshBasicMaterial map={sandCubeTexture} />
    </mesh>
  );
}

export default function Cubes({
  cubes,
  removeCube,
  addTree,
  selectedItem,
  addChair,
  addHouse,
  addUmbrella,
}) {
  const handleAddingItems = (e, position, id) => {
    if (selectedItem == "tree") {
      const treePosition = new Vector3(position.x, position.y + 4, position.z);
      addTree({
        position: treePosition,
        id: Date.now(),
      });
    } else if (selectedItem == "chair") {
      const chairPosition = new Vector3(
        position.x,
        position.y + 2.65,
        position.z
      );
      addChair({
        position: chairPosition,
        id: Date.now(),
      });
    } else if (selectedItem == "house") {
      const housePosition = new Vector3(
        position.x,
        position.y + 1.9,
        position.z
      );
      addHouse({
        position: housePosition,
        id: Date.now(),
      });
    } else if (selectedItem == "umbrella") {
      const umbrellaPosition = new Vector3(
        position.x,
        position.y + 1.9,
        position.z
      );
      addUmbrella({
        position: umbrellaPosition,
        id: Date.now(),
      });
    }
  };

  const { nodes } = useGLTF("./models/sandCube.glb");

  return cubes.map(({ position, id }) => (
    <SandCubeModel
      key={id}
      nodes={nodes}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        if (e.shiftKey) {
          removeCube(id);
        } else if (selectedItem == "eraser") {
          removeCube(id);
        } else {
          handleAddingItems(e, position, id);
        }
      }}
    />
  ));
}


useGLTF.preload("./models/sandCube.glb");
useTexture.preload("./textures/sandTextureBaking.png");