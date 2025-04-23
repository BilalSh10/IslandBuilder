// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import planePositions from "../constents/planePositions";

// export default function Plane({ addCube, isInteracting }) {
//   if (!planePositions || planePositions.length === 0) return null;

//   const groundRef = useRef();
//   const count = planePositions?.length;

//   useEffect(() => {
//     if (groundRef.current) {
//       for (let i = 0; i < count; i++) {
//         const matrix = new THREE.Matrix4();

//         matrix.compose(
//           new THREE.Vector3(
//             planePositions[i][0],
//             planePositions[i][1],
//             planePositions[i][2]
//           ),
//           new THREE.Quaternion().setFromAxisAngle(
//             new THREE.Vector3(1, 0, 0),
//             Math.PI / 2
//           ), // 90° around Z
//           new THREE.Vector3(1, 1, 1)
//         );
//         groundRef.current.setMatrixAt(i, matrix);
//       }
//       // Important: Update the instance matrix
//       groundRef.current.instanceMatrix.needsUpdate = true;
//       groundRef.current.computeBoundingSphere();
//     }
//   }, [count]);

//   return (
//     <instancedMesh
//       args={[null, null, count]}
//       ref={groundRef}
//       rotation={[0, 0, 0]}
//       onClick={(e) => {
//         e.stopPropagation();
//         if (!groundRef.current) return;
//         // Get the instance ID that was clicked
//         const instanceId = e.instanceId;
//         // Create a dummy matrix to extract the position
//         const dummy = new THREE.Matrix4();
//         groundRef.current.getMatrixAt(instanceId, dummy);

//         // Extract position from the matrix
//         const position = new THREE.Vector3();
//         position.setFromMatrixPosition(dummy);

//         // Place cube exactly above the plane (1 unit higher)
//         const cubePosition = new THREE.Vector3(
//           position.x,
//           position.y + 0.5, // Adjust this value as needed
//           position.z
//         );

//         addCube({
//           position: cubePosition,
//           id: Date.now(),
//         });
//       }}
//     >
//       <boxGeometry args={[2, 2]} />
//       <meshStandardMaterial color="#222" side={THREE.DoubleSide} />
//     </instancedMesh>
//   );
// }

import { useEffect, useRef } from "react";
import * as THREE from "three";
import planePositions from "../constents/planePositions";

export default function Plane({ addCube, isInteracting }) {
  if (!planePositions || planePositions.length === 0) return null;

  const groundRef = useRef();
  const mouseDownPosition = useRef(null);
  const count = planePositions?.length;

  useEffect(() => {
    if (groundRef.current) {
      for (let i = 0; i < count; i++) {
        const matrix = new THREE.Matrix4();

        matrix.compose(
          new THREE.Vector3(
            planePositions[i][0],
            planePositions[i][1],
            planePositions[i][2]
          ),
          new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(1, 0, 0),
            Math.PI / 2
          ),
          new THREE.Vector3(1, 1, 1)
        );
        groundRef.current.setMatrixAt(i, matrix);
      }
      groundRef.current.instanceMatrix.needsUpdate = true;
      groundRef.current.computeBoundingSphere();
    }
  }, [count]);

  const handlePointerDown = (e) => {
    mouseDownPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleClick = (e) => {
    if (!mouseDownPosition.current) return;

    const dx = e.clientX - mouseDownPosition.current.x;
    const dy = e.clientY - mouseDownPosition.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Reset after use
    mouseDownPosition.current = null;

    // Ignore if the distance indicates a drag
    if (distance > 5) return;

    e.stopPropagation();
    if (!groundRef.current) return;

    const instanceId = e.instanceId;
    const dummy = new THREE.Matrix4();
    groundRef.current.getMatrixAt(instanceId, dummy);

    const position = new THREE.Vector3();
    position.setFromMatrixPosition(dummy);

    const cubePosition = new THREE.Vector3(
      position.x,
      position.y + 0.5,
      position.z
    );

    addCube({
      position: cubePosition,
      id: Date.now(),
    });
  };

  return (
    <instancedMesh
      args={[null, null, count]}
      ref={groundRef}
      rotation={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <boxGeometry args={[2, 2]} />
      <meshStandardMaterial color="#222" side={THREE.DoubleSide} />
    </instancedMesh>
  );
}
