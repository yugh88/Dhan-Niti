import React from "react";
import Image from "next/image";

const Bookcover = ({ imageUrl }: any) => {
  return (
    <>
      <Image
        alt="Book Cover"
        width={500}
        height={500}
        src={imageUrl as string}
        className="object-contain rounded-lg"
      />
    </>
  );
};

export default Bookcover;
