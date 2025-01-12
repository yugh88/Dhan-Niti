import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-primary text-[30px] px-2 font-extrabold">
            Creating Financial Stories , powered by AI and the latest information ,    By Dhan-Niti
          </h2>
          <p className="text-2xl text-primary-100 font-light my-4 p-4">
            Finance Teller allows to generate their own stories,
            complete with beautiful and captivating images that bring their
            imagination to life. Women can become authors and illustrators of
            their own digital storybook, exploring endless possibilities in the
            world of finance.
          </p>

          <Link href={"/create-story"}>
            <Button size="lg" color="primary" className="mt-5">
              Generate Story
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/front1.jpg"} alt="hero" height={200} width={600} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
