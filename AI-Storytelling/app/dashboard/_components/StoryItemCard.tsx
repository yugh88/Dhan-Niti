import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const StoryItemCard = (allStories: any) => {
  let { storyId, coverImage, output } = allStories.allStories;

  return (
    <>
      <Link href={"/view-story/" + storyId}>
        <Card
          isFooterBlurred
          className="col-span-12 sm:col-span-4 h-[300px] hover:scale-105 transition-all cursor-pointer"
        >
          <Image
            alt="Card background"
            className="z-0 object-cover w-full h-full"
            src={coverImage}
            width={200}
            height={200}
          />

          <CardFooter className="absolute  bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-white font-bold text-1xl">
                {output.story_title}
              </p>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
};

export default StoryItemCard;
