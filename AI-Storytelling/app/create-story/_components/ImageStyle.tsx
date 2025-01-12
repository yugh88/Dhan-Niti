"use client";
import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

const ImageStyle = ({ userSelection }: any) => {
  const OptionList = [
    {
      label: "3D",
      imageUrl: "/3D.jpg",
      isFree: true,
    },
    {
      label: "Paper cut",
      imageUrl: "/paper-cut.jpg",
      isFree: true,
    },
    {
      label: "Water Color",
      imageUrl: "/water-color.jpg",
      isFree: true,
    },
    {
      label: "Pixel Color",
      imageUrl: "/pixel.webp",
      isFree: true,
    },
  ];
  const [selectOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "imageStyle",
    });
  };

  return (
    <div>
      <label className="font-bold text-4xl text-primary ">3. Image Style</label>
      <div className="grid grid-cols-3 gap-5 mt-3">
        {OptionList.map((item, index) => (
          <div
            className={`relative grayscale hover:grayscale-0 cursor-pointer padding-1 ${
              selectOption == item.label
                ? "grayscale-0 border-2 rounded-3xl border-primary"
                : "grayscale"
            }`}
            onClick={() => onUserSelect(item)}
          >
            <h2 className="absolute text-2xl bottom-5 text-white text-center w-full ">
              {item.label}
            </h2>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={250}
              height={100}
              className="object-cover h-[150px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageStyle;
