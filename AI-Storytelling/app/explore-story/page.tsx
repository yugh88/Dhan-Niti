"use client";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import React, { useEffect, useState } from "react";
import { desc } from "drizzle-orm";
import { StoryItem } from "../dashboard/_components/UserStories";
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@nextui-org/button";

const Explore = () => {
  const [offset, setOffset] = useState(0);
  const [storyList, setStoryList] = useState<StoryItem[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetAllStories(0);
  }, []);

  const GetAllStories = async (newOffset: number) => {
    if (loading) return; // Prevent multiple requests
    setLoading(true); // Set loading to true to avoid multiple requests

    try {
      const result: any = await db
        .select()
        .from(StoryData)
        .orderBy(desc(StoryData.id ?? ""))
        .limit(8)
        .offset(newOffset); // Use newOffset directly

      // Append new stories only if they are not already in the storyList
      setStoryList((prev) => {
        const updatedList = [...prev, ...result].reduce((acc, story) => {
          if (!acc.some((s: any) => s.id === story.id)) {
            acc.push(story); // Ensure uniqueness based on 'id'
          }
          return acc;
        }, [] as StoryItem[]);

        return updatedList;
      });

      setOffset(newOffset + 8); // Update offset correctly
    } catch (error) {
      console.error("Error fetching stories:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="font-bold text-4xl text-primary text-center">
        Explore more stories
      </h2>
      {storyList && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
          {storyList.map((item: StoryItem) => (
            <div key={item.id}>
              {" "}
              {/* Use item.id as key */}
              <StoryItemCard allStories={item} />
            </div>
          ))}
        </div>
      )}
      {storyList.length >= offset && (
        <div className="text-center mt-10">
          <Button
            color="primary"
            isDisabled={loading} // Disable button when loading
            onClick={() => GetAllStories(offset)}
          >
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explore;
