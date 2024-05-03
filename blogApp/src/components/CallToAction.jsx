import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className=" flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 flex gap-2 justify-center flex-col">
        <h2 className="text-2xl">Want to learn more about javaScript ?</h2>
        <p className="text-gray-500">Checkout these resourses with 100 java script projects</p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a href="fsvadsv" target="_blank" rel="noopener noreferrer">
            100 javascript projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://think360studio-media.s3.ap-south-1.amazonaws.com/photo/plugin/article/2022/Java-script-11102022.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
