import React from "react";

const ContactUs = () => {
  return (
    <div className="flex justify-center m-10 p-10 min-h-screen">
      <div className="grid grid-cols-2">
        <h1 className="text-4xl">Introduction</h1>
        <p>
          Feel free to contact me at "
          <a
            className="text-red-600 text-2xl font-bold"
            href="mailto:francisnabeel0921@gmail.com"
          >
            francisnabeel0921@gmail.com
          </a>
          " if you have any questions or need assistance with your storytelling
          project. Also you can look at my portfolio website at{" "}
          <a
            className="text-red-300 text-xl "
            href="https://3d-website-portfolio.vercel.app/"
            target="_blank"
          >
            website
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
