import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";

function StoryPages({ storyChapter }: any) {
  const playSpeech = (text: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary">
        {storyChapter?.chapter_title}
      </h2>
      <span
        className="text-3xl cursor-pointer text-primary absolute right-0 mr-9"
        onClick={() => playSpeech(storyChapter?.text)}
      >
        <MdPlayCircleFilled />
      </span>
      <p className="text-xl mt-3 p-10 rounded-lg text-black bg-primary-50">
        {storyChapter?.text}
      </p>
    </div>
  );
}

export default StoryPages;
