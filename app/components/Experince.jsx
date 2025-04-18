// "use client";
import React, { useState } from "react";
import { OrbitControls, Environment, Sky } from "@react-three/drei";
import Water from "./Water";
import { Perf } from "r3f-perf";
import Cubes from "./SandCube";
import Plane from "./Plane";
import Trees from "./Trees";
import Chairs from "./Chair";
import Houses from "./House";
import Umbrellas from "./Umbrella";
const Experince = ({ selectedItem }) => {
  const [cubes, setCubes] = useState([]);
  const [trees, setTrees] = useState([]);
  const [chairs, setTChairs] = useState([]);
  const [houses, setHouses] = useState([]);
  const [umbrellas, setUmbrellas] = useState([]);

  const addCube = (cube) => {
    setCubes([...cubes, cube]);
  };

  const removeCube = (id) => {
    setCubes(cubes.filter((cube) => cube.id !== id));
  };

  const addTree = (tree) => {
    setTrees([...trees, tree]);
  };

  const removeTree = (id) => {
    setTrees(trees.filter((tree) => tree.id !== id));
  };
  const addChair = (chair) => {
    setTChairs([...chairs, chair]);
  };

  const removeChair = (id) => {
    setTChairs(chairs.filter((chair) => chair.id !== id));
  };

  const addHouse = (house) => {
    setHouses([...houses, house]);
  };

  const removeHouse = (id) => {
    setHouses(houses.filter((house) => house.id !== id));
  };

  const addUmbrella = (umbrella) => {
    setUmbrellas([...umbrellas, umbrella]);
  };

  const removeUmbrella = (id) => {
    setUmbrellas(umbrellas.filter((umbrella) => umbrella.id !== id));
  };

  return (
    <>
      <Perf position="top-left" />
      <Environment preset="city" />
      <OrbitControls
        makeDefault
        // maxAzimuthAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.4}
        minPolarAngle={Math.PI / 5}
        // minAzimuthAngle={Math.PI /2}
      />
      <Cubes
        cubes={cubes}
        removeCube={removeCube}
        addTree={addTree}
        addChair={addChair}
        addHouse={addHouse}
        addUmbrella={addUmbrella}
        selectedItem={selectedItem}
      />
      <Plane addCube={addCube} />
      <Trees trees={trees} removeTree={removeTree} />
      <Chairs chairs={chairs} removeChair={removeChair} />
      <Houses houses={houses} removeHouse={removeHouse} />
      <Umbrellas umbrellas={umbrellas} removeUmbrella={removeUmbrella} />
      <Water />
      <Sky />
    </>
  );
};

export default Experince;
