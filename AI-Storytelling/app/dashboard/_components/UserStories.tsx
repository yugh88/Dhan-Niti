"use client";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { eq, desc } from "drizzle-orm";
import StoryItemCard from "./StoryItemCard";

export type StoryItem = {
  id: number;
  storyType: string;
  storySubject: string;
  ageGroup: string;
  coverImage: string;
  imageStype: string;
  userImage: string;
  userName: string;
  output: [] | any;
  storyId: string;
};
const UserStories = () => {
  const { user }: any = useUser();
  const [storyList, setStoryList] = useState<StoryItem[]>();

  useEffect(() => {
    user && getStories();
  }, [user]);

  const getStories = async () => {
    const results: any = await db
      .select()
      .from(StoryData)
      .where(
        eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress ?? "")
      )
      .orderBy(desc(StoryData.id));

    setStoryList(results);
  };
  console.log("storyList", storyList);
  return (
    <div className="m-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        {storyList &&
          storyList.map((item: StoryItem, index: number) => (
            <div key={index}>
              <StoryItemCard allStories={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserStories;
