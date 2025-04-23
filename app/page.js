"use client";
import { Canvas } from "@react-three/fiber";
import Experince from "./components/Experince";
import ObjectSelectionNav from "./components/ObjectSelectionNav";
import { Suspense, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import AudioPlayer from "./components/AudioPlayer"; // import here

export default function IslandBuilder() {
  const [selectedItem, setSelectedItem] = useState("none");
  const [started, setStarted] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas flat camera={{ position: [5, 20, 20], fov: 45 }}>
        <Suspense>
          {!started ? (
            <LoadingScreen
              started={started}
              onStarted={() => setStarted(true)}
            />
          ) : (
            <Experince selectedItem={selectedItem} />
          )}
        </Suspense>
      </Canvas>

      <AudioPlayer started={started} />

      {started && (
        <ObjectSelectionNav
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
}
