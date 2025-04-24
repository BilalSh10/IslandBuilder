import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const FogMaterial = shaderMaterial(
  {
    uFogColor: new THREE.Color("#2a2a2a"),
    uFogNear: 2,
    uFogFar: 10,
  },
  // Vertex shader
  `
  varying vec3 vPosition;

  void main() {
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment shader
  `
  varying vec3 vPosition;

  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;

  void main() {
    float depth = length(vPosition);
    float fogFactor = smoothstep(uFogNear, uFogFar, depth);
    vec3 color = mix(vec3(1.0, 0.7, 0.2), uFogColor, fogFactor); // example color blend
    gl_FragColor = vec4(color, 1.0);
  }
  `
);

extend({ FogMaterial });

export default function FoggyBox() {
  const ref = useRef();

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <fogMaterial attach="material" />
    </mesh>
  );
}