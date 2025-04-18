import React from "react";
import Image from "next/image";
const ObjectSelectionNav = ({ selectedItem, setSelectedItem }) => {
  const SelectionHandle = (name) => {
    setSelectedItem(name);
  };

  return (
    <div className="rounded-2xl absolute bg-white bottom-6 left-1/2 transform -translate-x-1/2 p-4">
      <div className=" flex flex-row justify-center gap-8 items-center">
        <Image
          src="/images/treePicture.png"
          alt="tree"
          width={80}
          height={80}
          className={`${
            selectedItem == "tree" ? "border-green-300" : "border-red-300"
          } object-contain border-6 cursor-pointer rounded-lg`}
          onClick={() => SelectionHandle("tree")}
        />
        <Image
          src="/images/housePicture.png"
          alt="house"
          width={80}
          height={80}
          className={`${
            selectedItem == "house" ? "border-green-300" : "border-red-300"
          } object-contain border-6 cursor-pointer rounded-lg`}
          onClick={() => SelectionHandle("house")}
        />
        <Image
          src="/images/chairPicture.png"
          alt="chair"
          width={80}
          height={80}
          className={`${
            selectedItem == "chair" ? "border-green-300" : "border-red-300"
          } object-contain border-6 cursor-pointer rounded-lg`}
          onClick={() => SelectionHandle("chair")}
        />
         <Image
          src="/images/umbrellaImage.png"
          alt="umbrella"
          width={80}
          height={80}
          className={`${
            selectedItem == "umbrella" ? "border-green-300" : "border-red-300"
          } object-contain border-6 cursor-pointer rounded-lg`}
          onClick={() => SelectionHandle("umbrella")}
        />
      </div>
    </div>
  );
};

export default ObjectSelectionNav;
