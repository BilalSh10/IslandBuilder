// components/LoadingScreen.tsx
'use client'

import { Html, useProgress } from '@react-three/drei'

export default function LoadingModels() {
  const { progress } = useProgress()
  
  return (
    <Html center>
      <div className="bg-black/80 p-8 rounded-xl text-center backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white mb-4">Loading...</h1>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto my-4">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-lg font-mono">{Math.round(progress)}%</p>
      </div>
    </Html>
  )
}