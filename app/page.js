"use client";
import { Canvas } from "@react-three/fiber";
import Experince from "./components/Experince";
import ObjectSelectionNav from "./components/ObjectSelectionNav";
import { useState } from "react";

export default function IslandBuilder() {
  const [selectedItem, setSelectedItem] = useState("tree");

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas flat shadows camera={{ position: [5, 20, 20], fov: 45 }}>
        <Experince selectedItem={selectedItem}/>
      </Canvas>
      <ObjectSelectionNav
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}
