import { useState, useRef, useEffect } from "react";
import { useProgress, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function LoadingScreen({ started, onStarted }) {
  const { progress } = useProgress();
  const { gl } = useThree();
  const [helpVisible, setHelpVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const startButtonRef = useRef();

  useEffect(() => {
    if (started) {
      setFadeOut(true);
      setTimeout(() => {
        gl.domElement.style.pointerEvents = "auto";
      }, 1000);
    } else {
      gl.domElement.style.pointerEvents = "none";
    }
  }, [started, gl]);

  const handleStart = () => {
    onStarted();
  };

  const toggleHelp = () => {
    setHelpVisible(!helpVisible);
  };

  return (
    <Html
      fullscreen
      wrapperClass="loading-screen"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 1s ease-in-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 via-sky-300 to-blue-500 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-lg">
          🏝️ Island Builder
        </h1>

        <div className="w-[80%] max-w-lg bg-white/30 rounded-full h-4 shadow-inner mb-4">
          <div
            className="bg-white h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-white/90 text-sm mb-8">{Math.round(progress)}% loaded</p>

        {progress >= 100 && (
          <div className="flex flex-col items-center gap-4">
            <button
              ref={startButtonRef}
              onClick={handleStart}
              className="px-8 py-3 bg-white text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors font-bold text-lg rounded-xl shadow-md"
            >
              🏗️ Start Building
            </button>

            <button
              onClick={toggleHelp}
              className="text-sm underline hover:text-yellow-200"
            >
              {helpVisible ? "Hide Help" : "How to Play"}
            </button>

            {helpVisible && (
              <div className="bg-white/20 backdrop-blur-sm mt-4 p-4 rounded-lg text-sm w-full max-w-sm text-left ">
                <h3 className="font-semibold mb-2 drop-shadow-lg">🕹️ Controls</h3>
                <ul className="list-disc list-inside space-y-1 drop-shadow-lg">
                  <li>🖱️ Look around with mouse</li>
                  <li>Click on the water to build sands</li>
                  <li>Press sheft Key to delete objects</li>
                  <li>Select an object to build</li>
                  <li>Click on the object that u have built to rotate it</li>
                  <li>For small devices u can use the eraser in the object selection to delete the objects</li>
                  <li>🏝️ Build your island!</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Html>
  );
}
