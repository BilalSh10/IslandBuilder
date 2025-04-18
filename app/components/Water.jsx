import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Water() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime() * 2
    }
  })

  const shaderArgs = {
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.y += sin(pos.x * 3.0 + time) * 0.1;
        pos.y += sin(pos.z * 2.0 + time * 1.5) * 0.1;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      
      void main() {
        vec3 waterColor = vec3(0.1, 0.3, 0.5);
        float foam = sin(vUv.x * 20.0 + vUv.y * 20.0) * 0.5 + 0.5;
        gl_FragColor = vec4(mix(waterColor, vec3(1.0), foam * 0.1), 0.7);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  }

  return (
    <mesh raycast={false} ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 128, 128]} />
      <shaderMaterial {...shaderArgs} />
    </mesh>
  )
}