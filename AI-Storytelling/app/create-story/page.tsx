"use client";
import React, { useState, useEffect, useContext } from "react";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/button";
import { chatSession } from "@/config/gemini";
import { db } from "@/config/db";
import { StoryData, Users } from "@/config/schema";
// @ts-expect-error
import uuid4 from "uuid4";
import CustomLoader from "./_components/CustomLoader";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "../_context/UserDetailContext";
import { eq } from "drizzle-orm";

export interface fieldData {
  fieldName: string;
  fieldValue: string;
}
export interface formDataType {
  storySubject: string;
  storyType: string;
  imageStyle: string;
  ageGroup: string;
}

const CREATE_AI_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

function CreateStory() {
  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false); // New state to check if mounted
  const router = useRouter();
  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);
  const { user } = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  useEffect(() => {
    setIsMounted(true); // Mark component as mounted
  }, []);

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prev: any) => ({
      ...prev,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const generateStory = async () => {
    setLoading(true);

    // Check if user credits are enought to GS.
    if (userDetail.credit <= 0) {
      notifyError("You dont have enought credits to generate story");
      setLoading(false);
      return;
    }

    const FINAL_PROMPT = CREATE_AI_STORY_PROMPT?.replace(
      "{ageGroup}",
      formData?.ageGroup ?? ""
    )
      .replace("{storyType}", formData?.storyType ?? "")
      .replace("{storySubject}", formData?.storySubject ?? "")
      .replace("{imageStyle}", formData?.imageStyle ?? "");

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text());
      const imageResponse = await axios.post("/api/generate-image", {
        prompt:
          "Add text with title: " +
          story.story_title +
          " in bold text for book cover, " +
          story?.cover_image?.description,
      });

      const ai_generate_image = imageResponse?.data?.imageUrl;
      const saveImageUrl = await axios.post("/api/save-image", {
        url: ai_generate_image,
      });
      const firebase_downloaded_url = saveImageUrl?.data?.imageUrl;

      // Save to DB and pass the storyId for redirection
      const savedRecord = await saveInDB(
        result?.response.text(),
        firebase_downloaded_url
      );
      notify("Successfully created the story!");
      await UpdateUserCredit();
      setLoading(false);

      // Ensure router.push only happens after component is mounted
      if (savedRecord && isMounted) {
        router.push("/view-story/" + savedRecord.storyId); // Safely use router here
      }
    } catch (error) {
      console.error(error);
      notifyError("An error occurred while generating the story.");
      setLoading(false);
    }
  };

  const saveInDB = async (output: string, imageUrl: string) => {
    const recordId = uuid4();
    setLoading(true);
    try {
      const results = await db
        .insert(StoryData)
        .values({
          storyId: recordId ?? "",
          storySubject: formData?.storySubject ?? "",
          storyType: formData?.storyType ?? "",
          ageGroup: formData?.ageGroup ?? "",
          imageStyle: formData?.imageStyle ?? "",
          output: JSON.parse(output),
          coverImage: imageUrl,
          userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
          userName: user?.fullName ?? "",
          userImage: user?.imageUrl ?? "",
        })
        .returning({ storyId: StoryData?.storyId }); // returning the storyId

      setLoading(false);
      return results[0]; // return the first record
    } catch (error) {
      console.error("Error saving in DB: ", error);
      setLoading(false);
      return null;
    }
  };

  const UpdateUserCredit = async () => {
    const resultUser = await db
      .update(Users)
      .set({
        credit: Number(userDetail?.credit - 1),
      })
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ""))
      .returning({ id: Users.id });
  };
  return (
    <div className="mx-10 mb-0 md:px-20 lg:px-40 py-[100px]">
      <h1 className="text-center font-extrabold text-[70px] text-primary">
        Create your own Stories
      </h1>
      <p className="text-2xl text-primary text-center">
        Unlock your creativity using AI
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <StorySubjectInput userSelection={onHandleUserSelection} />
        <StoryType userSelection={onHandleUserSelection} />
        <AgeGroup userSelection={onHandleUserSelection} />
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>

      <div className="flex justify-end relative top-10">
        <Button
          color="success"
          className="text-2xl p-5"
          onClick={generateStory}
          variant="bordered"
          disabled={loading}
        >
          Generate
        </Button>
        <span className="mx-5 relative top-2 font-bold">
          {userDetail?.credit} Credit left
        </span>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  );
}

export default CreateStory;
