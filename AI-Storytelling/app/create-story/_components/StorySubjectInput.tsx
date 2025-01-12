import React from "react";
import { Textarea } from "@nextui-org/input";

function StorySubjectInput({ userSelection }: any) {
  return (
    <div>
      <label className="font-bold text-4xl text-primary">
        1. Story Subject Input
      </label>

      <Textarea
        label="Description"
        placeholder="Enter your description"
        size="lg"
        classNames={{ input: "resize-y min-h-10 text-2xl py-5" }}
        className="mt-3 max-w-lg text-black"
        onChange={(e) =>
          userSelection({
            fieldValue: e.target.value,
            fieldName: "storySubject",
          })
        }
      />
    </div>
  );
}

export default StorySubjectInput;
