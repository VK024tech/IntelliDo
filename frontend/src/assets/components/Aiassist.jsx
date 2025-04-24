import React from "react";

import { WiStars } from "react-icons/wi";
import { LuRefreshCw } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";

function Aiassist() {
  const iconColor = "#aeabb6";

  function Suggestions() {
    return (
      <div className="flex bg-white p-2 py-4 rounded-xl border-1 border-gray-300">
        <FaWandMagicSparkles
          style={{ color: "#00BBA7" }}
          size={24}
          className="m-1"
        />
        <div className="ml-4">
          Break down 'Complete project proporsal' into smaller tasks.
          <div className="flex justify-start gap-4 mt-2">
            <div className="flex  flex-row cursor-pointer transition-colors  hover:shadow-md/30  shadow-teal-200 border-1 rounded-md w-max p-1 px-3 justify-center border-teal-500 text-teal-600 ">
              <IoIosAddCircleOutline
                className="mr-2"
                style={{ color: "#00BBA7" }}
                size={24}
              />
              Add
            </div>
            <div className="flex mr-4 flex-row cursor-pointer transition-colors hover:shadow-md/30  shadow-red-200 hover:text-red-400 hover:border-red-400 border-1 rounded-md w-max p-1 px-3 justify-center border-gray-500 text-gray-500">
              Dismiss
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 max-w-[24rem] overflow-y-auto h-dvh px-5 ml-auto  border-l-1 border-gray-300">
      <div className="font-semibold py-4 flex  items-center ">
        IntelliDo Suggestions
        <WiStars style={{ color: "#00BBA7" }} size={34} className="ml-1 " />
      </div>
      <div className="flex flex-col gap-5">
        {Suggestions()}
        {Suggestions()}
        {Suggestions()}
        {Suggestions()}
        {Suggestions()}
        {Suggestions()}
        <div className="mb-24">
        {Suggestions()}
        </div>
        <div className="fixed bottom-0 bg-gray-100 px-16.5 py-4 ">
          <div className="flex justify-center font-md text-gray-600 mb-2  items-center bg-white p-2 cursor-pointer transition-colors  hover:text-teal-700  hover:border-teal-300 hover:border-t-2 rounded-xl border-t-1 border-gray-300">
            <LuRefreshCw
              style={{ color: "#00BBA7" }}
              size={22}
              className="mr-3 "
            />
            Refresh Suggestions
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aiassist;
