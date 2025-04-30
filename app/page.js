"use client";
import { Canvas } from "@react-three/fiber";
import Experince from "./components/Experince";
import ObjectSelectionNav from "./components/ObjectSelectionNav";
import { Suspense, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import AudioPlayer from "./components/AudioPlayer"; // import here
import { Environment } from "@react-three/drei";

export default function IslandBuilder() {
  const [selectedItem, setSelectedItem] = useState("none");
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas flat camera={{ position: [5, 20, 20], fov: 45 }}>
        <Environment
          background={true}
          files="./industrial_sunset_02_puresky_2k.hdr"
        />
        <Suspense>
          {!isStarted ? (
            <LoadingScreen
              started={isStarted}
              onStarted={() => setIsStarted(true)}
            />
          ) : (
            <>
              <Experince selectedItem={selectedItem} />
            </>
          )}
        </Suspense>
      </Canvas>

      <AudioPlayer started={isStarted} />

      {isStarted && (
        <ObjectSelectionNav
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
}
