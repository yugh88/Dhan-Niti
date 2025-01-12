"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface OptionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

const StoryType = ({ userSelection }: any) => {
  const OptionList = [
    {
      label: "Story Book",
      imageUrl: "/story11.JPG",
      isFree: true,
    },
    {
      label: "Stock Market Story",
      imageUrl: "/stock.jpg",
      isFree: true,
    },
    {
      label: "Educational Content",
      imageUrl: "/finance.png",
      isFree: true,
    },
  ];
  const [selectOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item?.label,
      fieldName: "storyType",
    });
  };

  return (
    <div>
      <label className="font-bold text-4xl text-primary ">2. Story Type</label>
      <div className="grid grid-cols-3 gap-5 mt-3">
        {OptionList.map((item, index) => (
          <div
            key={index}
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
              width={300}
              height={100}
              className="object-cover h-[260px] rounded-3xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryType;
