import React from "react";
import Image from "next/image";

const ObjectSelectionNav = ({ selectedItem, setSelectedItem }) => {
  const SelectionHandle = (name) => {
    setSelectedItem(name);
  };

  return (
    <div className="rounded-2xl absolute  bottom-6 left-0 right-0 mx-auto w-max max-w-[90%] p-4 overflow-x-auto bg-black/20 backdrop-blur ">
      <div className="flex flex-row gap-8 items-center">
        <Image
          src="/images/treePicture.png"
          alt="tree"
          width={80}
          height={80}
          className={`${
            selectedItem == "tree" ? "border-green-300" : "border-red-300"
          } object-contain border-3 cursor-pointer rounded-lg flex-shrink-0`}
          onClick={() => SelectionHandle("tree")}
        />
        <Image
          src="/images/housePicture.png"
          alt="house"
          width={80}
          height={80}
          className={`${
            selectedItem == "house" ? "border-green-300" : "border-red-300"
          } object-contain border-3 cursor-pointer rounded-lg flex-shrink-0`}
          onClick={() => SelectionHandle("house")}
        />
        <Image
          src="/images/chairPicture.png"
          alt="chair"
          width={80}
          height={80}
          className={`${
            selectedItem == "chair" ? "border-green-300" : "border-red-300"
          } object-contain border-3 cursor-pointer rounded-lg flex-shrink-0`}
          onClick={() => SelectionHandle("chair")}
        />
        <Image
          src="/images/umbrellaImage.png"
          alt="umbrella"
          width={80}
          height={80}
          className={`${
            selectedItem == "umbrella" ? "border-green-300" : "border-red-300"
          } object-contain border-3 cursor-pointer rounded-lg flex-shrink-0`}
          onClick={() => SelectionHandle("umbrella")}
        />
        <Image
          src="/images/eraser.jpg"
          alt="eraser"
          width={80}
          height={80}
          className={`${
            selectedItem == "eraser" ? "border-green-300" : "border-red-300"
          } object-contain border-3 cursor-pointer rounded-lg flex-shrink-0 md:hidden`}
          onClick={() => SelectionHandle("eraser")}
        />
      </div>
    </div>
  );
};

export default ObjectSelectionNav;