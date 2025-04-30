const size = 200; // 200x200 grid
const spacing = 2; // Space between cubes (assuming each cube is 1 unit)
const planePositions = [];

for (let x = 0; x < size; x++) {
  for (let z = 0; z < size; z++) {
    // Calculate position with center at (0, -1, 0)
    const posX = (x - size/2) * spacing;
    const posZ = (z - size/2) * spacing;
    planePositions.push([posX, -1, posZ]);
  }
}

export default planePositions;
